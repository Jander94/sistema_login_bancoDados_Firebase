import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'
import logo from '../../assets/logo.png';
import './signin.css';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();  //pra não atualizar a pagina
    
    if(email !== '' && password !== ''){
      login(email, password);
    }else{
      alert('Favor preencher todos os campos!')
    }
  }

    return (
      <div className='container'>
        <div className='login'>
          
          <div className='area-logo'>
            <img src={logo} alt='logo do sistema'/>
          </div>

          <form onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <input type='text' placeholder='email@email.com' value={email} onChange={ (e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='**********' value={password} onChange={ (e) => setPassword(e.target.value)}/>
            <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
          </form>

          <Link to='/register'>Cadastre-se</Link>
        </div>
      </div>
    );
  }
  
  export default SignIn;
