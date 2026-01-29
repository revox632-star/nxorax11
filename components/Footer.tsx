
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, Shield, BookOpen, LayoutDashboard } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-4 text-start">
            <Link to="/" className="flex items-center justify-start">
              <span className="text-2xl font-black tracking-tighter">
                <span className="text-white">NXORA</span>
                <span className="text-blue-500 ms-1">X</span>
              </span>
            </Link>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3">
               <a href="mouazfried18@gmail.com" className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                  <Mail className="w-4 h-4" />
               </a>
               <a href="https://wa.me/+201009285935" target="_blank" className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-500/30 transition-all">
                  <Phone className="w-4 h-4" />
               </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-white font-black mb-4 uppercase tracking-widest text-[10px]">
              {t('footer.links')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-blue-400 text-[11px] font-bold flex items-center gap-2 transition-colors">
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-blue-400 text-[11px] font-bold flex items-center gap-2 transition-colors">
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-600" />
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support & Legal */}
          <div className="md:col-span-3">
            <h3 className="text-white font-black mb-4 uppercase tracking-widest text-[10px]">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/support" className="text-slate-400 hover:text-blue-400 text-[11px] font-bold flex items-center gap-2 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  {t('nav.support')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-blue-400 text-[11px] font-bold flex items-center gap-2 transition-colors">
                  <Shield className="w-3.5 h-3.5 text-slate-600" />
                  {t('privacy.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="md:col-span-3 bg-blue-600/5 border border-blue-500/10 rounded-2xl p-5 relative overflow-hidden">
            <h3 className="text-white font-black mb-1.5 text-[11px] uppercase tracking-wider">{t('footer.join')}</h3>
            <p className="text-slate-500 text-[10px] mb-3 font-bold">
              {t('footer.join_desc')}
            </p>
            <Link to="/signup" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black py-2.5 rounded-lg transition-all shadow-lg">
              {t('nav.signup')}
            </Link>
          </div>
        </div>
        
        {/* Bottom Bar - Distributed Layout */}
        <div className="border-t border-slate-900 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright - On the side */}
          <div className="text-center md:text-start">
            <p className="text-slate-500 text-[10px] font-bold tracking-tight">
              {t('footer.rights')} {' '}
              <span className="text-blue-500 font-black">NXORA X</span>
            </p>
          </div>

          {/* Created by Revox - On the other side */}
          <div className="text-center md:text-end">
            <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 justify-center md:justify-end">
              <span className="opacity-60">{t('footer.created_by')}</span>
              <a 
                href="https://wa.me/201070068235" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors hover:underline decoration-blue-500/30 underline-offset-4"
              >
                Revox
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
