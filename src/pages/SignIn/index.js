import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './signin.css';

function SignIn() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(e){
    e.preventDefault();  //pra não atualizar a pagina
    
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
            <input type='password' placeholder='**********' value={senha} onChange={ (e) => setSenha(e.target.value)}/>
            <button type='submit'>Acessar</button>
          </form>

          <Link to='/register'>Cadastre-se</Link>
        </div>
      </div>
    );
  }
  
  export default SignIn;
