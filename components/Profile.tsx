import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  required?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, required = false }) => {
  const [formData, setFormData] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);

  // Automatically enter edit mode if required information is missing
  useEffect(() => {
    if (required || !user.dob || !user.address || !user.gender || !user.nationality) {
      setIsEditing(true);
    }
  }, [required, user]);

  const isProfileComplete = formData.name && formData.email && formData.dob && formData.address && formData.gender && formData.nationality;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    
    // If the profile is now complete, exit edit mode to show the view mode
    if (isProfileComplete) {
        setIsEditing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
        {required && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <i className="fa-solid fa-triangle-exclamation text-yellow-400"></i>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Please complete your profile information to continue to flight search.
                        </p>
                    </div>
                </div>
            </div>
        )}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-brand-500 to-brand-700 relative">
             <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-3xl overflow-hidden">
                        {user.avatarUrl ? (
                             <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                             <i className="fa-solid fa-user"></i>
                        )}
                    </div>
                </div>
             </div>
        </div>

        <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                     <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                     <p className="text-slate-500">{user.email}</p>
                </div>
                {!isEditing && !required && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                        <i className="fa-solid fa-pen mr-2"></i>
                        Edit Profile
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                         <div className="col-span-1 sm:col-span-2">
                             <h3 className="text-lg font-medium leading-6 text-slate-900 mb-4 border-b pb-2">Personal Information</h3>
                         </div>
                         
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Full Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2"
                            />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Date of Birth *</label>
                            <input
                                type="date"
                                required
                                value={formData.dob || ''}
                                onChange={e => setFormData({...formData, dob: e.target.value})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2"
                            />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Gender *</label>
                            <select
                                required
                                value={formData.gender || ''}
                                onChange={e => setFormData({...formData, gender: e.target.value as any})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2 bg-white"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Nationality *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. American"
                                value={formData.nationality || ''}
                                onChange={e => setFormData({...formData, nationality: e.target.value})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2"
                            />
                         </div>

                         <div className="col-span-1 sm:col-span-2">
                             <h3 className="text-lg font-medium leading-6 text-slate-900 mt-4 mb-4 border-b pb-2">Contact Details</h3>
                         </div>

                         <div>
                            <label className="block text-sm font-medium text-slate-700">Email *</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2"
                            />
                         </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700">Phone</label>
                            <input
                                type="tel"
                                value={formData.phone || ''}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2"
                            />
                         </div>
                         <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700">Address *</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.address || ''}
                                onChange={e => setFormData({...formData, address: e.target.value})}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2"
                                placeholder="Street address, City, State, Zip"
                            />
                         </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                        {!required && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-slate-700 font-medium hover:text-slate-900"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={!isProfileComplete}
                            className={`px-6 py-2 rounded-lg font-medium shadow-sm transition-all ${
                                isProfileComplete 
                                ? 'bg-brand-600 text-white hover:bg-brand-700' 
                                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            {required ? 'Save & Continue' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                     <div>
                         <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Personal Information</h4>
                         <ul className="space-y-3">
                             <li className="flex items-center text-slate-700">
                                 <span className="w-24 text-slate-400 text-sm">Gender:</span>
                                 {user.gender || 'Not provided'}
                             </li>
                             <li className="flex items-center text-slate-700">
                                 <span className="w-24 text-slate-400 text-sm">Nationality:</span>
                                 {user.nationality || 'Not provided'}
                             </li>
                             <li className="flex items-center text-slate-700">
                                 <span className="w-24 text-slate-400 text-sm">DOB:</span>
                                 {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'}
                             </li>
                         </ul>
                     </div>
                     <div>
                         <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Contact Information</h4>
                         <ul className="space-y-3">
                             <li className="flex items-start text-slate-700">
                                 <i className="fa-solid fa-envelope w-6 text-slate-400 mt-1"></i>
                                 <span>{user.email}</span>
                             </li>
                             <li className="flex items-start text-slate-700">
                                 <i className="fa-solid fa-phone w-6 text-slate-400 mt-1"></i>
                                 <span>{user.phone || 'Not provided'}</span>
                             </li>
                             <li className="flex items-start text-slate-700">
                                 <i className="fa-solid fa-location-dot w-6 text-slate-400 mt-1"></i>
                                 <span>{user.address || 'Not provided'}</span>
                             </li>
                         </ul>
                     </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;