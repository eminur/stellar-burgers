import { ordersSlice } from '@slices';
import { fetchOrders } from './ordersActions';
import { TOrder } from '../../../utils/types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = ordersSlice.getInitialState();
const errorMessage = 'Error';

describe('Тестирование получения данных заказа', () => {
  it('не должен изменять состояние при неизвестном экшене', () => {
    expect(ordersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обработать состояние ожидания получения данных заказов', () => {
    const newState = ordersSlice.reducer(initialState, {
      type: fetchOrders.pending.type
    });
    expect(newState).toEqual({ ...initialState, loading: true });
  });

  it('должен обработать состояние получение данных заказов', () => {
    const orders: TOrder[] = [
      {
        _id: '67b05ec9133acd001be50f84',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный минеральный био-марсианский бургер',
        createdAt: '2025-02-15T09:30:49.455Z',
        updatedAt: '2025-02-15T09:30:50.135Z',
        number: 68431
      }
    ];
    const newState = ordersSlice.reducer(initialState, {
      type: fetchOrders.fulfilled.type,
      payload: orders
    });
    expect(newState).toEqual({
      ...initialState,
      orders: orders,
      loading: false
    });
  });

  it('должен обработать состояние ошибки при получении данных заказов', () => {
    const newState = ordersSlice.reducer(initialState, {
      type: fetchOrders.rejected.type,
      error: { message: errorMessage }
    });
    expect(newState).toEqual({
      ...initialState,
      error: errorMessage,
      loading: false
    });
  });
});
