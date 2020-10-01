import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import EditProfile from '../routes/EditProfile';
import Home from '../routes/Home';
import Profile from '../routes/Profile';

function AppRouter() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
      <Switch>
        {loggedIn &&
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="profile" component={Profile} />
            <Route exact path="profile/edit" component={EditProfile} />

          </> ||
          <Route exact path="/" component={Auth} />
        }
      </Switch>
    </Router>
  );
}

export default AppRouter;