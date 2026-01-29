
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
// Fix: Use @firebase/firestore directly to resolve "no exported member" errors in this environment
import { collection, query, where, getDocs } from '@firebase/firestore';
import { auth, db } from '../firebase';
import { Lock, AtSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const inputUsername = formData.username.trim().toLowerCase();

    try {
      // 1. البحث عن البريد الإلكتروني المرتبط باسم المستخدم في Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', inputUsername));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("اسم المستخدم هذا غير مسجل لدينا.");
        setLoading(false);
        return;
      }

      // الحصول على بيانات المستخدم الأول المطابق (اليوزر نيم يجب أن يكون فريداً)
      const userDocData = querySnapshot.docs[0].data();
      const userEmail = userDocData.email;

      // 2. محاولة تسجيل الدخول باستخدام البريد الإلكتروني المستخرج
      const userCredential = await signInWithEmailAndPassword(auth, userEmail, formData.password);
      const firebaseUser = userCredential.user;

      const userData = { id: firebaseUser.uid, ...userDocData } as User;
      onLogin(userData);
      navigate('/dashboard');

    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("كلمة المرور غير صحيحة.");
      } else {
        setError("حدث خطأ أثناء تسجيل الدخول. تأكد من بياناتك.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 pt-20" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600/10 rounded-3xl mb-6 border border-blue-500/20 shadow-xl shadow-blue-500/5">
            <ShieldCheck className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">تسجيل الدخول</h1>
          <p className="text-slate-400">ادخل اسم المستخدم للمتابعة</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-sm text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300 mr-2">اسم المستخدم</label>
            <div className="relative">
              <AtSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="أدخل اسم المستخدم "
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-300 mr-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group"
          >
            <span>{loading ? 'جاري التحقق...' : 'دخول للمنصة'}</span>
            {!loading && <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-slate-400">ليس لديك حساب؟ <Link to="/signup" className="text-blue-400 font-bold hover:underline">أنشئ حساباً جديداً</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
