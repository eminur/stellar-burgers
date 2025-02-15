import {
  burgerConstructorSlice,
  addBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetOrderModalData
} from './constructorSlice';
import { postOrderBurger } from './constructorActions';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder
} from '../../../utils/types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = burgerConstructorSlice.getInitialState();
const errorMessage = 'Error';

describe('Тестирование работы с конструктором', () => {
  it('не должен изменять состояние при неизвестном экшене', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });

  describe('Проверки добавления,удаления,перемещения ингредиента', () => {
    it('должен добавить ингредиент булка', () => {
      const bun: TIngredient = {
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
      };

      const newState = burgerConstructorSlice.reducer(
        initialState,
        addBun(bun)
      );
      expect(newState.items.bun).toEqual(bun);
    });

    it('должен добавить ингредиент начинка', () => {
      const ingredient: TConstructorIngredient = {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '1'
      };
      const newState = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(ingredient)
      );
      expect(newState.items.ingredients).toHaveLength(1);
    });

    it('должен удалить ингредиент начинку', () => {
      const stateWithIngredient = {
        ...initialState,
        items: {
          ...initialState.items,
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/meat-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-03-large.png',
              id: '1'
            }
          ]
        }
      };
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredient,
        removeIngredient('1')
      );
      expect(newState.items.ingredients).toHaveLength(0);
    });

    it('должен переместить ингредиент начинку вверх', () => {
      const stateWithIngredients = {
        ...initialState,
        items: {
          ...initialState.items,
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/meat-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-03-large.png',
              id: '1'
            },
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/meat-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-03-large.png',
              id: '2'
            }
          ]
        }
      };
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        moveUpIngredient(1)
      );
      expect(newState.items.ingredients[0].id).toBe('2');
    });
    it('должен переместить ингредиент начинку вниз', () => {
      const stateWithIngredients = {
        ...initialState,
        items: {
          ...initialState.items,
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/meat-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-03-large.png',
              id: '1'
            },
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/meat-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-03-large.png',
              id: '2'
            }
          ]
        }
      };
      const newState = burgerConstructorSlice.reducer(
        stateWithIngredients,
        moveDownIngredient(0)
      );
      expect(newState.items.ingredients[1].id).toBe('1');
    });
  });

  describe('Проверка оформления заказа', () => {
    it('должен  сбросить данные заказа OrderModalData в null', () => {
      const stateWithOrder = { ...initialState, orderModalData: {} as TOrder };
      const newState = burgerConstructorSlice.reducer(
        stateWithOrder,
        resetOrderModalData()
      );
      expect(newState.orderModalData).toBeNull();
    });

    it('должен обработать состояния ожидание оформления заказа ', () => {
      const newState = burgerConstructorSlice.reducer(initialState, {
        type: postOrderBurger.pending.type
      });
      expect(newState.orderRequest).toBeTruthy();
    });

    it('должен обработать состояние получение данных оформления заказа', () => {
      const orderData = { order: { number: 1234 } } as unknown as TOrder;
      const newState = burgerConstructorSlice.reducer(initialState, {
        type: postOrderBurger.fulfilled.type,
        payload: orderData
      });
      expect(newState.orderModalData).toEqual(orderData);
      expect(newState.items.bun).toBeNull();
      expect(newState.items.ingredients).toHaveLength(0);
    });

    it('должен обработать состояния ошибки при оформлении заказа', () => {
      const newState = burgerConstructorSlice.reducer(initialState, {
        type: postOrderBurger.rejected.type,
        error: { message: errorMessage }
      });
      expect(newState).toEqual({
        ...initialState,
        error: errorMessage,
        orderRequest: false
      });
    });
  });
});
