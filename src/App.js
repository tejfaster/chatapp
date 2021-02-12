import React from 'react'

import 'rsuite/dist/styles/rsuite-default.css'
import './styles/main.scss'

import { Switch } from 'react-router'
import SignIn from './pages/SignIn'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { ProfileProvider } from './context/profile.context'
import Home from './pages/Home'

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path='/signin'>
          <SignIn />
        </PublicRoute>
        <PrivateRoute path='/'>
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
