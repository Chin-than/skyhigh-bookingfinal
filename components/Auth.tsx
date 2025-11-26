import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User, isNewUser: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Mock existing user with full profile
        const existingUser: User = {
          id: 'u1',
          name: 'Rahul Sharma',
          email: email,
          phone: '+91 98765 43210',
          dob: '1992-08-15',
          address: '42, Mahatma Gandhi Road, Bangalore, Karnataka, 560001',
          gender: 'Male',
          nationality: 'Indian'
        };
        onLogin(existingUser, false);
      } else {
        // Mock new user with incomplete profile
        const newUser: User = {
          id: `u${Date.now()}`,
          name: name || 'New User',
          email: email,
          // Other fields undefined to trigger profile completion flow
        };
        onLogin(newUser, true);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-brand-600 rounded-xl flex items-center justify-center text-white text-3xl mb-4 shadow-lg transform -rotate-3">
                <i className="fa-solid fa-plane-up"></i>
            </div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isLogin ? 'Sign in to access your bookings' : 'Join SkyHigh today'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm ${isLogin ? 'rounded-t-md' : ''}`}
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
                autoComplete="current-password"
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-md hover:shadow-lg"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <i className={`fa-solid ${isLogin ? 'fa-lock' : 'fa-user-plus'} text-brand-500 group-hover:text-brand-400`}></i>
              </span>
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center">
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-brand-600 hover:text-brand-500 text-sm"
            >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;