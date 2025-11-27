// File: components/Signup.tsx (MODIFIED)

import React, { useState } from 'react';
import { User, AppRoute } from '../types';

interface SignupProps {
  onSignup: (user: User) => void;
  onNavigate: (route: AppRoute) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Registration failed.');
        }

        // On successful registration, you get back the token and basic user info.
        // NOTE: In a real app, you would store the token (data.token)
        
        // Construct the new User object to satisfy the front-end state
        const newUser: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          // Other profile fields are undefined, forcing profile completion flow
        };

        setIsLoading(false);
        onSignup(newUser); // Calls handleLogin in App.tsx
        
    } catch (err) {
        console.error('Signup API Error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred during signup.');
        setIsLoading(false);
    }
  };
  // ... (Rest of the component remains the same for JSX)
// ... (Rest of the component remains the same for JSX)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-brand-600 rounded-xl flex items-center justify-center text-white text-3xl mb-4 shadow-lg transform -rotate-3">
                <i className="fa-solid fa-plane-up"></i>
            </div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join SkyHigh today
          </p>
        </div>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoading ? (
                    <i className="fa-solid fa-circle-notch fa-spin text-brand-500 group-hover:text-brand-400"></i>
                ) : (
                    <i className="fa-solid fa-user-plus text-brand-500 group-hover:text-brand-400"></i>
                )}
              </span>
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center">
            <button
                onClick={() => onNavigate(AppRoute.LOGIN)}
                className="font-medium text-brand-600 hover:text-brand-500 text-sm"
            >
                Already have an account? Sign in
            </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;