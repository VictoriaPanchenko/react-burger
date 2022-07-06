import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { resetPassword, clearPwdResetErr } from '../../services/actions/user';
import Notification from "../../components/notification/notification";

export const ResetPasswordPage = () => {

  const { user, errMessage, passwordResetRequest, passwordResetErr, isPasswordReset } = useSelector(
    (store) => store.user
  );

  const [token, setToken] = useState('');
  const [password, setPassword] = useState("");
  
  
  const dispatch = useDispatch();
  const location = useLocation();

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onCodeChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(password, token));
    },
    [dispatch, password, token]
  );

  const resetError = useCallback(() => {
    dispatch(clearPwdResetErr());
  }, [dispatch]);

  if (user) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  if (isPasswordReset) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  return (
    <main className={styles.wrapper}>
       {!passwordResetRequest && !passwordResetErr && (
      <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1
          className={`${styles.title} text text_type_main-medium mb-6`}
        >
          Восстановление пароля
        </h1>
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name="password"
          placeholder="Введите новый пароль"
        />
        <div className="mb-6 mt-6">
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={onCodeChange}
            value={code}
            name="e-mail"
            error={false}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вспомнили пароль? "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
      </>
      )}
      {!passwordResetRequest && passwordResetErr && (
        <Notification
          title='Произошла ошибка.'
          message={errMessage}
          onClose={resetError}
          backHome
        />
      )}
    </main>
  );
};