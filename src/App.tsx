import './App.css';

import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProjectSelect } from './components/project-select/ProjectSelect';
import { Auth } from './components/authentication/Auth';
import { AuthContext } from './components/firebase-context/FirebaseContext';

export const App = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="App">
      {user ?
        <ProjectSelect />
        :
        <Auth />
      }
    </div>
  );
}