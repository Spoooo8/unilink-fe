import React, { useState } from 'react';
import axios from 'axios';
import InputForm from '../components/general/InputForm';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';
import logo from '../../public/image/logo.png';

function Login({ onClose }) {
  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
  ];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const values = { email, password };
  const setters = { setEmail, setPassword };

  const clientId = 'unilinkauth';
  const authorizationEndpoint = 'http://localhost:8080/unilink/auth/oauth2/authorize';
  const redirectUri = 'http://localhost:5173/callback';
  const scope = 'openid email';

  const handlePKCELogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/unilink/auth/api/login', {
        email: email,
        password: password,
      }, { withCredentials: true });

      const codeVerifier = generateCodeVerifier();
      localStorage.setItem('pkce_code_verifier', codeVerifier);

      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
      });

      window.location.href = `${authorizationEndpoint}?${params.toString()}`;
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="w-[500px] p-6 sm:p-10 flex flex-col items-center">
      <img src={logo} alt="Logo" className="w-20 h-10 mb-4" />
      <InputForm fields={fields} values={values} setters={setters} onSubmit={handlePKCELogin} title="Login" />
    </div>
  );
}

export default Login;
