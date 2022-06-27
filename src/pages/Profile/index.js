import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConection';
import { toast } from 'react-toastify';

export default function Profile(){
    const { user, logout, setUser, storageUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome); //teste para ver se tem algo em user; se tiver coloca o user.nome na useState nome
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [ btnSalvar, setBtnSalvar ] = useState(false);

    function handleFile(e){
        //console.log(e.target.files[0]) // Onde está a imagem do upload
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }else{
                toast.error('Tipos de imagem aceitos: PNG ou JPEG');
                //setImageAvatar(null);
                //return null; //pra parar a execução do codigo caso tenha algo mais...
            }
        }
    };

    async function handleUpload(){
        setBtnSalvar(true);
        const currentUid = user.uid;  //pegar o uid pra sber qual usuário está logado
        const uploadTask = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async() => {
            toast.success('Imagem alterada!')
            setBtnSalvar(false)
        });

        await firebase.storage().ref(`images/${currentUid}`).child(imageAvatar.name).getDownloadURL()
        .then( async(url) => {
            let urlFoto = url;

            await firebase.firestore().collection('users').doc(user.uid).update({
                avatarUrl: urlFoto,
                nome: nome
            }).then( () => {
                let data = {
                    ...user,
                    avatarUrl: urlFoto,
                    nome: nome
                }
                setUser(data);
                storageUser(data);
            })
        })

    };

    async function handleSave(e){
        e.preventDefault();

        if(imageAvatar === null && nome !==''){
            await firebase.firestore().collection('users').doc(user.uid)
            .update({
                nome: nome
            }).then( () => {
                let data = {
                    ...user,
                    nome: nome
                };
                setUser(data);
                storageUser(data);
                toast.success('Dados atualizados com sucesso!')
            }).catch( (error) => {
                toast.error('Ops, algo deu errado!');
                console.log(error);
            })
        }
        else if(nome !== '' && imageAvatar !== null){
            handleUpload();
        }
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Meu Perfil'>
                    <FiSettings size={25}/>
                </Title>

                <div className='container-profile'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>
                            <input type='file' accept='image/*' onChange={handleFile}/>
                            {avatarUrl === null ? 
                            <img src={avatar} width='250' height='250' alt='Foto de perfil do usuário'/>
                            :
                            <img src={avatarUrl} width='250' height='250' alt='Foto de perfil do usuário'/>
                            }
                        </label>

                        <label>Nome</label>
                        <input type='text' value={nome} onChange={ (e) => setNome(e.target.value)}/>
                        
                        <label>E-mail</label>
                        <input type='text' value={email} disabled/>
                        
                        <button type='submit'>{btnSalvar ? 'Salvando modificações...' : 'Salvar'}</button>
                    </form>                    
                </div>
                <div className='container-profile'>
                    <button className='btn-sair' onClick={logout}>Sair</button>
                </div>
            </div>            
        </div>
    );
}