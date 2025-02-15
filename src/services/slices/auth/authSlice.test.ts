import { authSlice, setIsAuthChecked } from './authSlice';
import { register, login, logout, fetchUser, updateUser } from './authActions';
import { TUser } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

const initialState = authSlice.getInitialState();
const errorMessage = 'Error';

describe('Тестирование работы с пользователем', () => {
  it('не должен изменять состояние при неизвестном экшене', () => {
    expect(authSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
  describe('Регистрация пользователя', () => {
    it('должен обработать состояние ожидания ответа регистрации', () => {
      const newState = authSlice.reducer(initialState, {
        type: register.pending.type
      });
      expect(newState).toEqual({ ...initialState, loading: true, error: null });
    });

    it('должен обработать состояние получения данных регистрации', () => {
      const user: TUser = {
        name: 'eminur',
        email: 'eminur@mail.ru'
      };
      const newState = authSlice.reducer(initialState, {
        type: register.fulfilled.type,
        payload: user
      });
      expect(newState).toEqual({
        ...initialState,
        user: user,
        isAuthChecked: true,
        loading: false
      });
    });

    it('должен обработать состояние получение ошибки при регистрации', () => {
      const newState = authSlice.reducer(initialState, {
        type: register.rejected.type,
        error: { message: errorMessage }
      });
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
  describe('Логин пользователя', () => {
    it('должен обработать состояние ожидания логина', () => {
      const newState = authSlice.reducer(initialState, {
        type: login.pending.type
      });
      expect(newState).toEqual({ ...initialState, loading: true, error: null });
    });

    it('должен обработать состояние получения данных логина', () => {
      const user: TUser = {
        name: 'eminur',
        email: 'eminur@mail.ru'
      };

      const newState = authSlice.reducer(initialState, {
        type: login.fulfilled.type,
        payload: user
      });
      expect(newState).toEqual({
        ...initialState,
        user: user,
        isAuthChecked: true,
        loading: false
      });
    });

    it('должен обработать состояние ошибки при логине', () => {
      const newState = authSlice.reducer(initialState, {
        type: login.rejected.type,
        error: { message: errorMessage }
      });
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Выход пользователя', () => {
    it('должен обработать состояние ожидания выхода', () => {
      const newState = authSlice.reducer(initialState, {
        type: logout.pending.type
      });
      expect(newState).toEqual({ ...initialState, loading: true });
    });

    it('должен обработать состояние при успешном выходе', () => {
      const loggedInState = {
        ...initialState,
        user: { name: 'eminur', email: 'eminur@mail.ru' }
      };
      const newState = authSlice.reducer(loggedInState, {
        type: logout.fulfilled.type
      });
      expect(newState).toEqual({ ...initialState, user: null, loading: false });
    });

    it('должен обработать состояние ошибки при выходе', () => {
      const newState = authSlice.reducer(initialState, {
        type: logout.rejected.type,
        error: { message: errorMessage }
      });
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Получение данных пользователя', () => {
    it('должен обработать состояние ожидания при получении данных пользователя', () => {
      const newState = authSlice.reducer(initialState, {
        type: fetchUser.pending.type
      });
      expect(newState).toEqual({ ...initialState, loading: true, error: null });
    });

    it('должен обработать состояние успешного получения данных пользователя', () => {
      const user: TUser = {
        name: 'eminur',
        email: 'eminur@mail.ru'
      };
      const newState = authSlice.reducer(initialState, {
        type: fetchUser.fulfilled.type,
        payload: user
      });
      expect(newState).toEqual({ ...initialState, user: user, loading: false });
    });

    it('должен обработать состояние ошибки при получения данных пользователя', () => {
      const newState = authSlice.reducer(initialState, {
        type: fetchUser.rejected.type,
        error: { message: errorMessage }
      });
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
  describe('Обновление профиля', () => {
    it('должен обработать состояние ожидания при обновлении профиля', () => {
      const newState = authSlice.reducer(initialState, {
        type: updateUser.pending.type
      });
      expect(newState).toEqual({ ...initialState, loading: true, error: null });
    });

    it('должен обработать состояние успешного обновления профиля', () => {
      const updatedUser: TUser = {
        name: 'eminur1',
        email: 'eminur@mail.ru'
      };
      const newState = authSlice.reducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      });

      expect(newState).toEqual({
        ...initialState,
        user: updatedUser,
        loading: false
      });
    });
    it('должен обработать состояние ошибки при обновлении профиля', () => {
      const newState = authSlice.reducer(initialState, {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      expect(newState).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
  describe('Проверка авторизации', () => {
    it('проверка состояния авторизации', () => {
      const newState = authSlice.reducer(initialState, setIsAuthChecked(true));
      expect(newState).toEqual({ ...initialState, isAuthChecked: true });
    });
  });
});
