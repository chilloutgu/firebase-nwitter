import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import Nav from 'components/Nav';

function AppRouter({ isLoggedIn, user, refreshUser }) {

  return (
    <Router>
      {isLoggedIn && <Nav user={user} />}
      <Switch>
        {isLoggedIn &&
          <>
            <Route exact path="/">
              <MainPage user={user} />
            </Route>
            <Route exact path="/profile">
              <ProfilePage user={user} refreshUser={refreshUser} />
            </Route>

          </> ||
          <Route exact path="/" component={LoginPage} />
        }
      </Switch>
    </Router>
  );
}

export default AppRouter;