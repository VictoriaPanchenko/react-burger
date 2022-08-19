import { FC } from 'react';
import { Redirect, Route,RouteProps, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../services/store";
import Preloader from '../preloader/preloader';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

    const { user, isAuthChecked } = useAppSelector((store) => store.user);
    const location = useLocation();

    !isAuthChecked && <Preloader />;

    if (isAuthChecked && !user) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }
  
    return <Route {...rest}>{children}</Route>;
} 