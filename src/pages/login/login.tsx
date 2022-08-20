import React, { useState, useRef, useEffect, ChangeEvent, FormEvent, FC,  DetailedHTMLProps, HTMLAttributes  } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import { loginUser } from "../../services/actions/user";
import { ILocation } from "../../services/types";
import { useAppDispatch, useAppSelector } from '../../services/store';

interface ILoginPage extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const LoginPage:FC<ILoginPage> = () => {

  const {user} = useAppSelector((store) => store.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<ILocation>();

  useEffect(() => {
    if (user) {
      (location.state && location.state.previousLocation) ? history.push(location.state.previousLocation.pathname) : history.push('/');
    }
  }, [user, history, location]);

  const onEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser(email, password));
  };


  return (
    <main className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={`${styles.title} text text_type_main-medium`}>
          Вход
        </h2>
        <div className="mt-6 mb-6">
          <Input
            type="text"
            placeholder="e-mail"
            onChange={onEmailChange}
            value={email}
            name="e-mail"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={onPasswordChange}
            value={password}
            name="password"
            // @ts-ignore
            placeholder="Пароль"
          />
        </div>
        <Button disabled={!(email && password)} type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вы — новый пользователь? "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        {"Забыли пароль? "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};