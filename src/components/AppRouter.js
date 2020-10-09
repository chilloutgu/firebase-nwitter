import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import ProfilePage from 'pages/ProfilePage';
import ProfileEditPage from 'pages/ProfileEditPage';
import Nav from 'components/Nav';

function AppRouter({ isLoggedIn, user }) {

  return (
    <Router>
      {isLoggedIn && <Nav />}
      <Switch>
        {isLoggedIn &&
          <>
            <Route exact path="/">
              <MainPage user={user} />
            </Route>
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/profile/edit" component={ProfileEditPage} />

          </> ||
          <Route exact path="/" component={LoginPage} />
        }
      </Switch>
    </Router>
  );
}

export default AppRouter;