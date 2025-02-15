import { feedsSlice } from '@slices';
import { fetchFeeds } from './feedsAction';
import { TOrdersData } from '../../../utils/types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = feedsSlice.getInitialState();
const errorMessage = 'Error';

describe('Тестирование ленты заказов', () => {
  it('не должен изменять состояние при неизвестном экшене', () => {
    expect(feedsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обработать состояние ожидания получения ленты', () => {
    const newState = feedsSlice.reducer(initialState, {
      type: fetchFeeds.pending.type
    });
    expect(newState).toEqual({ ...initialState, loading: true });
  });

  it('должен обработать состояние получения данных ленты', () => {
    const ordersData: TOrdersData = {
      orders: [
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
      ],
      total: 1,
      totalToday: 1
    };
    const newState = feedsSlice.reducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: ordersData
    });
    expect(newState.ordersData).toEqual(ordersData);
    expect(newState.loading).toBeFalsy();
  });

  it('должен обработать состояние ошибки получения данных ленты', () => {
    const newState = feedsSlice.reducer(initialState, {
      type: fetchFeeds.rejected.type,
      error: { message: errorMessage }
    });
    expect(newState).toEqual({
      ...initialState,
      error: errorMessage,
      loading: false
    });
  });
});
