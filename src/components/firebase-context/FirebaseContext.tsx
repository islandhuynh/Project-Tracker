import firebase from 'firebase/app';
import { createContext, useState } from 'react';

import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../../config/firebaseconfig';
import { ProjectDetail } from '../../schemas/projectDetail';

export const AuthContext = createContext({} as any);

const provider = new firebase.auth.GoogleAuthProvider();

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const FirebaseAuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{} | null>(null);
  const [projectList, setProjectList] = useState<ProjectDetail[]>([]);

  const login = async () => {
    await firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
        if (result.user) getUserData(result.user.uid!, result.user.email!);
      }).catch((error) => {
        console.log(error)
      })
  }

  const logout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  }

  const getUserData = async (userId: string, userEmail: string) => {
    let userProfile = {
      email: userEmail,
      projectList: []
    };

    await firebase.database().ref('Users/' + userId).once('value').then(async (snapshot) => {
      // if user does not exist, create new profile
      if (!snapshot.exists()) {
        await firebase.database().ref('Users/' + userId).set(userProfile);
        setProjectList([]);
      } else {
        await firebase.database().ref('Users/' + userId).once('value').then(async (snapshot) => {
          userProfile = snapshot.val();
          if (userProfile.projectList) {
            setProjectList(userProfile.projectList);
          } else {
            setProjectList([]);
          }
        })
      }
    })
  }

  const updateProjectList = async (userId: string, updatedList: ProjectDetail[]) => {
    await firebase.database().ref('Users/' + userId + '/projectList/')
      .set(updatedList)
      .catch(e => console.log(e));
    setProjectList(updatedList);
  }

  const updateProjectTasks = async (userId: string, index: number, updatedProject: ProjectDetail) => {
    await firebase.database().ref(`Users/${userId}/projectList/${index}/`)
      .set(updatedProject)
      .catch(e => console.log(e));
  }

  initFirebase();

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      projectList,
      setProjectList,
      updateProjectList,
      updateProjectTasks,
      getUserData
    }}>
      { children}
    </AuthContext.Provider>
  )
}