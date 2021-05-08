import firebase from 'firebase/app';
import { createContext, useState } from 'react';

import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../../config/firebaseconfig';

export const AuthContext = createContext({} as any);

const provider = new firebase.auth.GoogleAuthProvider();

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const FirebaseAuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{} | null>(null);

  const login = async () => {
    await firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      }).catch((error) => {
        console.log(error)
      })
  }

  const logout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  }

  initFirebase();

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout
    }}>
      { children}
    </AuthContext.Provider>
  )
}