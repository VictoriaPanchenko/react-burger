import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {

    const { user } = useSelector((store) => store.user);

    return (
        <Route
            {...rest}
            render={({ location }) =>

                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
} 