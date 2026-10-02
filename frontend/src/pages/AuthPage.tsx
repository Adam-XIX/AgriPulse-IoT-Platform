import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) return <Navigate to="/" replace />;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login(email, name); // mock: accepts any credentials
    navigate('/');
  };
  const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-950 p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-emerald-800"><Sprout /> AgriPulse</div>
        <p className="text-center text-sm text-slate-500">{mode === 'login' ? 'Sign in to your farm dashboard' : 'Create your farm account'}</p>
        {mode === 'signup' && (
          <label className="block text-sm font-medium">Full name
            <input required className={input} value={name} onChange={e => setName(e.target.value)} />
          </label>
        )}
        <label className="block text-sm font-medium">Email
          <input required type="email" className={input} value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block text-sm font-medium">Password
          <input required type="password" minLength={4} className={input} value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700">
          {mode === 'login' ? 'Sign in' : 'Sign up'}
        </button>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="w-full text-center text-sm text-emerald-700 hover:underline">
          {mode === 'login' ? "No account? Sign up" : 'Have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}