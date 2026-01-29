
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// Fix: Use @firebase/firestore directly to resolve "no exported member" errors in this environment
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../firebase';
import { UserPlus, User, Mail, AtSign, Lock, Phone, ArrowRight, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../types';

interface SignupProps {
  onLogin: (user: UserType) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ 
    fullName: '', 
    username: '', 
    whatsapp: '', 
    email: '',
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanUsername = formData.username.trim().toLowerCase().replace(/\s+/g, '');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUser = userCredential.user;

      const role: 'student' | 'admin' | 'creator' = cleanUsername === 'admin' ? 'admin' : 'student';

      const newUser: UserType = {
        id: firebaseUser.uid,
        fullName: formData.fullName.trim(),
        username: cleanUsername,
        whatsapp: formData.whatsapp.trim(),
        // Fix: Use formData.email instead of newUser.email to avoid using the variable before its declaration
        email: formData.email,
        role: role,
        purchasedCourses: []
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        fullName: newUser.fullName,
        username: newUser.username,
        whatsapp: newUser.whatsapp,
        email: newUser.email,
        role: newUser.role,
        purchasedCourses: newUser.purchasedCourses
      });

      onLogin(newUser);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError("البريد الإلكتروني مستخدم بالفعل.");
      else if (err.code === 'auth/weak-password') setError("كلمة المرور ضعيفة جداً.");
      else setError("حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-24 md:py-32" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/10 rounded-3xl mb-6 border border-blue-500/20 shadow-xl shadow-blue-500/5">
            <UserPlus className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">إنشاء حساب جديد</h1>
          <p className="text-slate-400">انضم إلى مجتمع NXORA X اليوم</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-sm text-center font-bold flex flex-col items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-400 px-2 text-right">الاسم الكامل</label>
            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all text-xs"
                placeholder="أدخل اسمك بالكامل"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-400 px-2 text-right">اسم المستخدم (للدخول)</label>
            <div className="relative">
              <AtSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all text-xs"
                placeholder="سيستخدم كمعرف بروفايل"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-400 px-2 text-right">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all text-xs text-right"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-400 px-2 text-right">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all text-xs"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-400 px-2 text-right">رقم الواتساب</label>
            <div className="relative">
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="tel" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all text-xs"
                placeholder="01xxxxxxxxx"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group text-xs uppercase"
          >
            <span>{loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}</span>
            {!loading && <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs font-bold">لديك حساب بالفعل؟ <Link to="/login" className="text-blue-400 font-black hover:underline">سجل دخولك</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
