import React from 'react';
import { Route, Switch } from 'react-router';
import UsersList from './pages/users-list';
import UserDetails from './pages/user-details';

export const App = () => (
  <Switch>
    <Route path="/user/:id" component={UserDetails} />
    <Route path="/" component={UsersList} />
  </Switch>
);
