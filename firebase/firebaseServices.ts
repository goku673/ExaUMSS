// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import app from "./firebaseConfig";

// // Inicializa los servicios de Firebase
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// // Función para iniciar sesión
// export const login = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error al iniciar sesión:", error);
//     throw error;
//   }
// };

// // Función para registrar un usuario
// export const register = async (email: string, password: string) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error al registrar usuario:", error);
//     throw error;
//   }
// };