import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyCF7x3d9n1LTh7ponc5wkqv20D5_4bUzf4",
  authDomain: "netflix-clone-1bb4b.firebaseapp.com",
  projectId: "netflix-clone-1bb4b",
  storageBucket: "netflix-clone-1bb4b.firebasestorage.app",
  messagingSenderId: "1036343197312",
  appId: "1:1036343197312:web:0932cc95812ed31e597065"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const signUp = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email,
        })

    } catch (error) {
        console.log(error);
        toast.error(error.code)
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
        
    } catch (error) {
        console.log(error)
        toast.error(error.code)
        
    }
}

const logout = async()=>{
    signOut(auth)
}

export {auth,db,login,signUp,logout}