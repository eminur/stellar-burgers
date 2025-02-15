import { rootReducer } from './store';
import {
  authSlice,
  ingredientsSlice,
  burgerConstructorSlice,
  feedsSlice,
  ordersSlice,
  orderInfoSlice
} from '@slices';

describe('Тестирование rootReducer', () => {
  it('не должен изменять состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedState = {
      [authSlice.name]: authSlice.getInitialState(),
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [feedsSlice.name]: feedsSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState(),
      [orderInfoSlice.name]: orderInfoSlice.getInitialState()
    };

    expect(initialState).toEqual(expectedState);
  });
});
