// // Reader.tsx
// import { useState } from 'react';
// import { Alert, Platform } from 'react-native';
// import { db } from '../firebaseConfig';
// import { collection, addDoc } from 'firebase/firestore';
// import {
//   getAuth, GoogleAuthProvider, signInWithPopup, signInWithCredential, FacebookAuthProvider, createUserWithEmailAndPassword 
// } from 'firebase/auth';

// let GoogleSignin: any, LoginManager: any, AccessToken: any;
// if (Platform.OS !== 'web') {
//   GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
//   const FBSDK = require('react-native-fbsdk-next');
//   LoginManager = FBSDK.LoginManager;
//   AccessToken = FBSDK.AccessToken;
// }

// export const useSignUpViewModel = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleAddUserToFirebase = async (user: any) => {
//     try {
//       await addDoc(collection(db, 'users'), {
//         uid: user.uid,
//         username: user.username || username,
//         email: user.email || email,
//         displayName: user.displayName || '',
//         createdAt: new Date().toISOString(),
//       });
//       Alert.alert('Success', 'User added to Firebase successfully!');
//     } catch (error) {
//       Alert.alert('Error', error instanceof Error ? error.message : 'Failed to add user to Firebase');
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const auth = getAuth();
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await handleAddUserToFirebase({ uid: user.uid, email: user.email });
//     } catch (error) {
//       Alert.alert('Error', error instanceof Error ? error.message : 'Failed to sign up');
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const auth = getAuth();

//       if (Platform.OS === 'web') {
//         const provider = new GoogleAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         await handleAddUserToFirebase(user);
//       } else {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//         const { idToken } = await GoogleSignin.getTokens();
//         const googleCredential = GoogleAuthProvider.credential(idToken);
//         const userCredential = await signInWithCredential(auth, googleCredential);
//         const user = userCredential.user;
//         await handleAddUserToFirebase(user);
//       }
//     } catch (error) {
//       Alert.alert('Error', error instanceof Error ? error.message : 'Google sign-in failed');
//     }
//   };

//   const handleFacebookSignIn = async () => {
//     try {
//       const auth = getAuth();

//       if (Platform.OS === 'web') {
//         const provider = new FacebookAuthProvider();
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         await handleAddUserToFirebase(user);
//       } else {
//         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//         if (result.isCancelled) {
//           throw new Error('User cancelled the login process');
//         }

//         const data = await AccessToken.getCurrentAccessToken();
//         if (!data) throw new Error('Something went wrong obtaining access token');

//         const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
//         const userCredential = await signInWithCredential(auth, facebookCredential);
//         const user = userCredential.user;
//         await handleAddUserToFirebase(user);
//       }
//     } catch (error) {
//       Alert.alert('Error', error instanceof Error ? error.message : 'Facebook sign-in failed');
//     }
//   };

//   return {
//     username,
//     email,
//     password,
//     setUsername,
//     setEmail,
//     setPassword,
//     handleSignUp,
//     handleGoogleSignIn,
//     handleFacebookSignIn,
//   };
// };

