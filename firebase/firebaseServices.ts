import { getAuth,
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword, 
         GoogleAuthProvider, 
         signInWithPopup, 
         sendPasswordResetEmail,
         updatePassword,
         reauthenticateWithCredential,
         EmailAuthProvider,
         updateProfile,
        } from "firebase/auth";
import { getFirestore, doc, updateDoc, collection, addDoc, getDoc, getDocs} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);

/*
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
  */

//un pequeño ajuste
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics no soportado en este entorno.");
    }
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);

interface Material {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  archivoUrl: string;
  fecha: string;
}

interface Facultad {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}


// Función para registrar un usuario
export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Función para iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};


export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Error al enviar correo de restablecimiento:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  uid: string,
  data: { name?: string; gender?: string; age?: string; joinedDate?: string; photoURL?: string }
) => {
  // Actualiza Auth (solo displayName y photoURL)
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: data.photoURL,
    });
  }
  
  const cleanData = Object.fromEntries(
    Object.entries({
      gender: data.gender,
      age: data.age,
      
    }).filter(([_, v]) => v !== undefined)
  );
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, cleanData);
};


export const changeUserPassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("Usuario no autenticado");

  // Reautenticación
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  // Cambia la contraseña
  await updatePassword(user, newPassword);
};


export const createFaculty = async (data: { nombre: string; descripcion: string; imagen: string }) => {
  const facultadesRef = collection(db, "facultades");
  await addDoc(facultadesRef, {
    ...data,
    createdAt: new Date().toISOString(),
  });
};


export const getAllFaculties = async (): Promise<Facultad[]> => {
  const facultadesRef = collection(db, "facultades");
  const snapshot = await getDocs(facultadesRef);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      nombre: data.nombre ?? "",
      descripcion: data.descripcion ?? "",
      imagen: data.imagen ?? "",
    };
  });
};


export const createMaterial = async (
  facultadId: string,
  data: { nombre: string; fecha: string; tipo: string; archivoUrl: string; descripcion: string }
) => {
  const materialesRef = collection(db, "facultades", facultadId, "materiales");
  await addDoc(materialesRef, data);
};

export const getMaterialsByFaculty = async (facultadId: string): Promise<Material[]> => {
  const materialesRef = collection(db, "facultades", facultadId, "materiales");
  const snapshot = await getDocs(materialesRef);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      nombre: data.nombre ?? "",
      descripcion: data.descripcion ?? "",
      tipo: data.tipo ?? "",
      archivoUrl: data.archivoUrl ?? "",
      fecha: data.fecha ?? "",
    };
  });
};


export const getAllMaterials = async (): Promise<(Material & { facultadId: string, facultadNombre: string })[]> => {
  const facultadesRef = collection(db, "facultades");
  const facultadesSnapshot = await getDocs(facultadesRef);

  let allMaterials: (Material & { facultadId: string, facultadNombre: string })[] = [];

  for (const facultadDoc of facultadesSnapshot.docs) {
    const facultadId = facultadDoc.id;
    const facultadNombre = facultadDoc.data().nombre ?? "";
    const materialesRef = collection(db, "facultades", facultadId, "materiales");
    const materialesSnapshot = await getDocs(materialesRef);

    materialesSnapshot.forEach(materialDoc => {
      const data = materialDoc.data();
      allMaterials.push({
        id: materialDoc.id,
        nombre: data.nombre ?? "",
        descripcion: data.descripcion ?? "",
        tipo: data.tipo ?? "",
        archivoUrl: data.archivoUrl ?? "",
        fecha: data.fecha ?? "",
        facultadId,
        facultadNombre,
      });
    });
  }

  return allMaterials;
};
// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return auth.currentUser;
};