import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  FormEvent,
  ChangeEvent
} from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-form.module.css";
import { patchUser } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../services/store";

interface IProfileForm
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export const ProfileForm:FC<IProfileForm> = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ref = useRef(null);
  const { user, patchUserRequest, patchUserFailed, isUserChanged, errMessage } =
  useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = useCallback(
    (e:FormEvent) => {
      e.preventDefault();
      dispatch(patchUser({ name, email, password }));
    },
    [dispatch, name, email, password]
  );

  const handleCancel = useCallback(
    (e:FormEvent) => {
      e.preventDefault();
      if (user != null){
        setEmail(user.email);
        setName(user.name);
      }      
      setPassword("");
      setIsDataChanged(false);
    },
    [user?.name, user?.email]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} name="profile">
      <Input
        ref={ref}
        type="text"
        placeholder="Имя"
        onChange={(evt) => {
          evt.target.value === user?.name
            ? setIsDataChanged(false)
            : setIsDataChanged(true);
          setName(evt.target.value);
        }}
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
        onChange={(evt) => {
          evt.target.value === user?.email
            ? setIsDataChanged(false)
            : setIsDataChanged(true);
          setEmail(evt.target.value);
        }}
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
        onChange={(evt) => {
          evt.target.value === password
            ? setIsDataChanged(false)
            : setIsDataChanged(true);
          setPassword(evt.target.value);
        }}
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
          <Button type="primary" size="medium" htmlType="submit" name="profile">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
