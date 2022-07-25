import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation, Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { sendRecoverPasswordEmail, clearPwdRecoverErr, resetPasswordRecoverPageToInitial } from '../../services/actions/user';
import Notification from "../../components/notification/notification";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { user, passwordRecoverRequest, passwordRecoverErr, canResetPassword, errMessage } =
    useSelector((store) => store.user);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(sendRecoverPasswordEmail(email));
    },
    [dispatch, email]
  );

  useEffect(() => {
		if (canResetPassword) {
			dispatch(resetPasswordRecoverPageToInitial());
			history.push("/reset-password");
		}
	}, [canResetPassword, dispatch, history]);


  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetError = useCallback(() => {
    dispatch(clearPwdRecoverErr());
  }, [dispatch]);

  if (user) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <main className={styles.wrapper}>
      {!passwordRecoverErr && !passwordRecoverRequest && (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2
              className={`${styles.title} text text_type_main-medium mb-6`}
            >
              Восстановление пароля
            </h2>
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Укажите e-mail"
                onChange={onEmailChange}
                value={email}
                name="e-mail"
                error={false}
                errorText="Ошибка"
                size="default"
              />
            </div>
            <Button disabled={!(email)} type="primary" size="medium">
              Восстановить
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
      {!passwordRecoverRequest && passwordRecoverErr && (
        <Notification
          heading='Произошла ошибка.'
          message={errMessage}
          onClose={resetError}
          backHome
        />
      )}
    </main>
  );
};