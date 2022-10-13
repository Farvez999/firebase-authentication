import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth(app)

function App() {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState({})
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error: ', error)
      })

  }

  const handleGoogleSignOut = () => {
    signOut(auth).then(() => {
      setUser({})
      // Sign-out successful.
    }).catch((error) => {
      setUser({})
      // An error happened.
    });
  }

  return (
    <div className="App">
      {user.email ?
        <button onClick={handleGoogleSignOut}>Google Sign Out</button>
        :
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      {user.email && <div>
        <h3>User Name: {user.displayName}</h3>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;
