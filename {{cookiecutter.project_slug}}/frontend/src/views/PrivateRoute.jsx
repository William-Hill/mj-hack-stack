import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { isAuthenticated } from '../utils/auth';

export const PrivateRoute = ({
  component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        React.createElement(component, props)
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);
