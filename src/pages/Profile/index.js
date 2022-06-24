import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'

export default function Profile(){
    const { user, logout } = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome); //teste para ver se tem algo em user; se tiver coloca o user.nome
    const [email, setEmail] = useState(user && user.email);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Meu Perfil'>
                    <FiSettings size={25}/>
                </Title>

                <div className='container-profile'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>
                            <input type='file' accept='image/*'/>
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
                        
                        <button type='submit'>Salvar</button>
                    </form>                    
                </div>
                <div className='container-profile'>
                    <button className='btn-sair' onClick={logout}>Sair</button>
                </div>
            </div>            
        </div>
    );
}