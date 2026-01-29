
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, BookOpen, HelpCircle, LayoutDashboard, MessageSquare, Home, Globe, Shield, Crown } from 'lucide-react';
import { User as UserType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';
  const isCreator = user?.role === 'creator';
  const isAdminOrCreator = isAdmin || isCreator;

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: <Home className="w-3.5 h-3.5" /> },
    { name: t('nav.dashboard'), path: '/dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { name: t('nav.courses'), path: '/courses', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { name: t('nav.support'), path: '/support', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-black text-lg">X</span>
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter">
              <span className="text-slate-100">NXORA</span>
              <span className="text-blue-500 ms-1">X</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-x-5">
            {navLinks.map((link) => (
              (link.path === '/' || link.path === '/support' || user) && (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`flex items-center gap-1.5 text-[11px] font-bold transition-all ${location.pathname === link.path ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className={`${location.pathname === link.path ? 'text-blue-500' : 'text-slate-600'}`}>{link.icon}</span>
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAdminOrCreator && (
              <Link 
                to="/admin" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border shadow-lg ${
                  location.pathname === '/admin' 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-blue-600/40' 
                  : 'bg-slate-900 border-slate-800 text-blue-400 hover:border-blue-500/50'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                {t('nav.admin')}
              </Link>
            )}

            <button 
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="w-10 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 rounded-lg text-[10px] font-black hover:text-white transition-all uppercase"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>

            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-[11px] font-bold transition-all px-3 py-1.5 rounded-lg hover:bg-red-500/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                {t('nav.logout')}
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="text-white hover:text-blue-400 text-[11px] font-bold px-3 py-1.5 transition-colors">{t('nav.login')}</Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-4 py-1.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95">{t('nav.signup')}</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
             {isAdmin && <Crown className="w-4 h-4 text-yellow-500 fill-current" />}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#020617] border-b border-slate-900 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {isAdminOrCreator && (
              <Link 
                to="/admin" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 mb-2"
              >
                <Shield className="w-4 h-4" />
                <span className="font-bold text-xs">{t('nav.admin')}</span>
              </Link>
            )}
            {navLinks.map((link) => (
              (link.path === '/' || link.path === '/support' || user) && (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'}`}
                >
                  <span className="text-slate-500">{link.icon}</span>
                  <span className="font-bold text-xs">{link.name}</span>
                </Link>
              )
            ))}
            <div className="pt-2 flex flex-col gap-2">
               <button 
                onClick={() => { setLanguage(language === 'ar' ? 'en' : 'ar'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
              >
                <Globe className="w-4 h-4" />
                <span className="font-bold text-xs">{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-bold text-xs">{t('nav.logout')}</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-3 rounded-xl border border-slate-800 font-bold text-white text-xs">{t('nav.login')}</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center p-3 rounded-xl bg-blue-600 font-bold text-white text-xs">{t('nav.signup')}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
