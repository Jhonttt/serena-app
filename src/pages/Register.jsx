import { useState } from 'react';
import api from '../api/axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/auth/register', { email, password });
      setMessage('Usuario registrado correctamente');
    } catch {
      setMessage('Error al registrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4">Register</h1>

        {message && <p>{message}</p>}

        <input
          className="border p-2 w-full mb-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full py-2">
          Register
        </button>
      </form>
    </div>
  );
}
