import React, { useState } from 'react';
import axios from 'axios';
import InputForm from '../components/general/InputForm';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';
import logo from '../../public/image/logo.png';

function Register({ onClose }) {
  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter username' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
  ];

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const values = { name, username, email, password };
  const setters = { setName, setUsername, setEmail, setPassword };

  const clientId = 'unilinkauth';
 const authorizationEndpoint = 'http://localhost:8080/unilink/auth/oauth2/authorize';
  const redirectUri = 'http://localhost:5173/callback';
  const scope = 'openid email';

  const handlePKCELogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register user
      await axios.post('http://localhost:8080/unilink/users/register', {
        name: name,
        username: username,
        email: email,
        password: password
      });

      // Step 2: Login user
      await axios.post('http://localhost:8080/unilink/auth/api/login', {
        email: email,
        password: password,
      }, { withCredentials: true });

      // Step 3: PKCE setup
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

      // Step 4: Redirect to authorization endpoint
      window.location.href = `${authorizationEndpoint}?${params.toString()}`;
    } catch (error) {
      console.error('Registration or Login failed', error);
      alert('Registration or login failed. Please try again.');
    }
  };

  return (
    <div className="w-[500px] p-6 sm:p-10 flex flex-col items-center">
      <img src={logo} alt="Logo" className="w-20 h-10 mb-4" />
      <InputForm fields={fields} values={values} setters={setters} onSubmit={handlePKCELogin} title="Register" />
    </div>
  );
}

export default Register;
