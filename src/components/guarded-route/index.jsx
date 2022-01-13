import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ children, ...rest }) => {
  const userKey = window.document.cookie;
  console.log(userKey);
  if (!userKey) {
    return <Redirect to={{ pathname: '/register' }} />;
  }
  return <Route {...rest}>{children}</Route>;
};

export default GuardedRoute;
