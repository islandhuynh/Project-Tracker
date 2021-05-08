import './App.css';

import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProjectSelect } from './components/project-select/ProjectSelect';
import { Auth } from './components/authentication/Auth';
import { AuthContext } from './components/firebase-context/FirebaseContext';

export const App = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="App">
      <div>
        {user ?
          <ProjectSelect />
          :
          <Auth />
        }
      </div>
    </div>
  );
}