import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, BookOpen, Shield, HelpCircle, User, LogOut, LayoutDashboard } from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    onClose();
    navigate('/');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-700 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-black tracking-tighter">
              <span className="text-white">NXORA</span>
              <span className="text-blue-500 ml-1">X</span>
            </span>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <nav className="flex-1 space-y-1.5">
            {user?.role === 'admin' && (
              <Link to="/admin" onClick={onClose} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-600/20 text-blue-400 transition-all">
                <LayoutDashboard className="w-4 h-4" />
                <span className="font-bold text-xs">لوحة التحكم</span>
              </Link>
            )}
            
            <Link to="/courses" onClick={onClose} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-xs">كورساتي</span>
            </Link>

            <Link to="/privacy" onClick={onClose} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all">
              <Shield className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-xs">سياسة الخصوصية</span>
            </Link>

            <Link to="/support" onClick={onClose} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800 transition-all">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="font-bold text-xs">دعم فني</span>
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 w-full rounded-xl hover:bg-red-900/20 text-red-400 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-bold text-xs">تسجيل الخروج</span>
              </button>
            ) : (
              <Link to="/signup" onClick={onClose} className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-bold text-xs">
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;