import { toast } from 'react-toastify';
import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConection';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const [ user, setUser ] = useState(null);
    const [ loadingAuth, setLoadingAuth ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);           
        }
        loadStorage();
    }, [])

    async function login(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async(value) => {
            let uid = value.user.uid;
            const userProfile = await firebase.firestore().collection('users').doc(uid).get();
            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem vindo de volta :)')

        }).catch( (error) => {
            toast.error('Ops algo deu errado...');
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function cadastrar(email, password, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async(value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users').doc(uid).set({
                nome: nome,
                avatarUrl: null
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo a plataforma!!!')
            })
        })
        .catch( (error) => {
            toast.error('Ops, algo deu errado!');
            console.log(error);
            setLoadingAuth(false);
        })
    }

    async function logout(){
        toast.info('Logout de usuário!')
        await firebase.auth().signOut();
        localStorage.removeItem("SistemaUser");
        setUser(null);
    }

    function storageUser(data){
        localStorage.setItem("SistemaUser",JSON.stringify(data))
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, setUser, loading, cadastrar, logout, login, loadingAuth, storageUser, setLoading }}>
            { children }
        </AuthContext.Provider>
    );
}
export default AuthProvider;

// !!user -> converte a useState em booleano, se tiver algo é true, senão é false