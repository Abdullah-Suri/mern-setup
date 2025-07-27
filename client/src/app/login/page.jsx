'use client'

import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

export default function LoginPage() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post('http://localhost:8080/api/auth/google-login', {
        token: credentialResponse.credential,
      })

      sessionStorage.setItem('access_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      console.log('User logged in:', data)
      // Store token if needed: localStorage.setItem('token', data.token)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
    </div>
  )
}
