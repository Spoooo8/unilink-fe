// src/pages/Callback.jsx

import { useEffect } from 'react';
import axios from 'axios'; // ✅ Plain axios here is fine (no Authorization header needed)

function Callback() {
  useEffect(() => {
    console.log('📢 Callback.jsx mounted');

    async function exchangeToken() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      console.log('✅ Authorization Code from URL:', code);

      if (!code) {
        console.error('❌ Authorization code not found in URL');
        return;
      }

      const codeVerifier = localStorage.getItem('pkce_code_verifier');
      console.log('✅ Retrieved Code Verifier:', codeVerifier);

      if (!codeVerifier) {
        console.error('❌ PKCE Code Verifier not found in localStorage');
        return;
      }

      const tokenUrl = 'http://localhost:8080/unilink/auth/oauth2/token';

      const data = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:5173/callback',
        client_id: 'unilinkauth',
        code_verifier: codeVerifier
      });

      try {
        console.log('📡 Sending token request to:', tokenUrl);
        console.log('📦 Token request body:', data.toString());

        const response = await axios.post(tokenUrl, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        console.log('✅ Full Token Response:', response.data);

        const accessToken = response.data.access_token;
        if (accessToken) {
          sessionStorage.setItem('access_token', accessToken);
          console.log('✅ Token stored successfully:', accessToken);

          // 🔥 Decode JWT and store userId
          const tokenParts = accessToken.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('✅ Decoded JWT Payload:', payload);

            // ✅ Correct way: directly access userId
            if (payload.userId) {
              sessionStorage.setItem('userId', payload.userId);
              console.log('✅ userId stored successfully:', payload.userId);
            } else {
              console.warn('⚠️ userId not found in token payload');
            }
          } else {
            console.error('❌ Invalid JWT format');
          }

          window.location.href = '/';
        } else {
          console.error('❌ No access_token found in response:', response.data);
        }
      } catch (error) {
        console.error('❌ Token exchange failed:', error);
        if (error.response) {
          console.error('🔥 Error Response:', error.response);
        } else if (error.request) {
          console.error('🔥 No response received. Request object:', error.request);
        } else {
          console.error('🔥 Error Message:', error.message);
        }
      }
    }

    exchangeToken();
  }, []);

  return (
    <div className="p-10 text-center">
      <h2>Processing login...</h2>
    </div>
  );
}

export default Callback;
