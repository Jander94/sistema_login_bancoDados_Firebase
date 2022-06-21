import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './signin.css';

function SignIn() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

    return (
      <div className='container'>
        <div className='login'>
          
          <div className='area-logo'>
            <img src={logo} alt='logo do sistema'/>
          </div>

          <form>
            <h1>LOGIN</h1>
            <input type='text' placeholder='email@email.com'/>
            <input type='password' placeholder='**********'/>
            <button type='submit'>Acessar</button>
          </form>

          <Link to='/register'>Cadastre-se</Link>
        </div>
      </div>
    );
  }
  
  export default SignIn;
