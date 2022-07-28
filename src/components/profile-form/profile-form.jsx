import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile-form.module.css';
import { getCookie } from "../../services/cookie-setting";
import { patchUser } from "../../services/actions/user";
import { useLocation } from 'react-router-dom';

export const ProfileForm = () => {

  const [isDataChanged, setIsDataChanged] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ref = useRef(null);
  const { user, patchUserRequest, patchUserFailed, isUserChanged, errMessage } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(patchUser({ name, email, password}));
    },
    [dispatch, name, email, password]
  );

  const handleCancel = useCallback(
    (e) => {
      e.preventDefault();
      setEmail(user.email);
      setName(user.name);
      setPassword('');
      setIsDataChanged(false);
    },
    [user.name, user.email]
  );


  return (
    <form className={styles.form} onSubmit={handleSubmit} name='profile'>
      <Input
        ref={ref}
        type="text"
        placeholder="Имя"
        onChange={(evt) => {evt.target.value === user.name ? setIsDataChanged(false) : setIsDataChanged(true); setName(evt.target.value)}}
        icon="EditIcon"
        value={name}
        name="name"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Input
        ref={ref}
        type="email"
        placeholder="Логин"
        onChange={(evt) => {evt.target.value === user.email ? setIsDataChanged(false) : setIsDataChanged(true); setEmail(evt.target.value)}}
        icon="EditIcon"
        value={email}
        name="login"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      <Input
        ref={ref}
        type="password"
        placeholder="Пароль"
        onChange={(evt) => {evt.target.value === password ? setIsDataChanged(false) : setIsDataChanged(true); setPassword(evt.target.value)}}
        icon="EditIcon"
        value={password}
        name="password"
        error={false}
        errorText="Ошибка"
        size="default"
      />
      {isDataChanged && (
      <div className={styles.buttons_container}>
        <Button onClick={handleCancel} type="secondary" size="medium">
          Отмена
        </Button>
        <Button type="primary" size="medium" htmlType="submit"  name='profile'>
          Сохранить
        </Button>
      </div>
        )}
    </form>
  );
};