import React, { useState, useCallback, FC, useRef, useEffect, ChangeEvent, DetailedHTMLProps, HTMLAttributes, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { createNewUser } from "../../services/actions/user";
import { useAppSelector, useAppDispatch } from "../../services/store";


interface IRegisterPage extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const RegisterPage:FC<IRegisterPage> = () => {

  const { user } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onEmailChange = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      return;
    }
    dispatch(createNewUser(userName, email, password));
  };

  useEffect(() => {
    user && history.push('/');
  }, [user, history]);

  return (
    <main className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={`${styles.title} text text_type_main-medium`}>
          Регистрация
        </h1>
        <div className="mt-6 mb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={onNameChange}
            value={userName}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className="mb-6">
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
          />
        </div>
        <Button disabled={!(userName && email && password)} type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Уже зарегистрированы? "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};