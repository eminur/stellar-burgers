import { ingredientsSlice } from '@slices';
import { fetchIngredients } from './ingredientsActions';
import { TIngredient } from '../../../utils/types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = ingredientsSlice.getInitialState();
const errorMessage = 'Error';

describe('Тестирование получение списка ингредиентов', () => {
  it('не должен изменять состояние при неизвестном экшене', () => {
    expect(
      ingredientsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  it('должен обработать состояние ожидания получения данных ингредиентов', () => {
    const newState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(newState).toEqual({ ...initialState, loading: true });
  });

  it('должен обработать состояние получение данных ингредиентов', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];
    const newState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });
    expect(newState).toEqual({
      ...initialState,
      items: ingredients,
      loading: false
    });
  });

  it('должен обработать состояние ошибки при получении данных ингредиентов', () => {
    const newState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    });
    expect(newState).toEqual({ ...initialState, error: errorMessage });
  });
});
