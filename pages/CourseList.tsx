
import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Play, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Course, User } from '../types';

interface CourseListProps {
  courses: Course[];
  user: User | null;
  onMenuClick: () => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, user, onMenuClick }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 pt-20 md:pt-28 px-4 md:px-8 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 md:mb-16 text-start">
          <div className="inline-block bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-black mb-4 uppercase tracking-wider">
            {t('dashboard.welcome')}, {user?.fullName.split(' ')[0]}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{t('courses.academy_title')}</h1>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed">{t('courses.academy_desc')}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {courses.map(course => {
            const isPurchased = user?.purchasedCourses.includes(course.id) || user?.role === 'admin';
            
            return (
              <div key={course.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-[2rem] overflow-hidden group shadow-2xl flex flex-col hover:border-blue-500/30 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {!isPurchased && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-center">
                      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-700 mb-4 transform group-hover:scale-110 transition-transform">
                        <Lock className="w-8 h-8 text-blue-400" />
                      </div>
                      <span className="text-white font-black text-lg">{t('courses.locked')}</span>
                      <p className="text-slate-400 text-xs mt-2">{t('courses.locked_desc')}</p>
                    </div>
                  )}
                  
                  {isPurchased && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-white/20">
                      <CheckCircle className="w-3 h-3" />
                      <span>{t('courses.owned')}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col text-start">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight">{course.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center text-xs text-slate-500 font-bold">
                          <Users className="w-3.5 h-3.5 ms-2 text-blue-400" />
                          <span>{course.studentsCount} {t('stats.students')}</span>
                        </div>
                      </div>
                      <div className="text-start">
                         <span className="text-2xl md:text-3xl font-black text-blue-400">{course.price}</span>
                      </div>
                    </div>

                    {isPurchased ? (
                      <Link 
                        to={`/player/${course.id}`}
                        className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4.5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        <span className="text-base md:text-lg">{t('courses.watch_now')}</span>
                      </Link>
                    ) : (
                      <a 
                        href={`https://wa.me/+201009285935?text=${encodeURIComponent(`أرغب في شراء كورس: ${course.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4.5 rounded-2xl transition-all border border-slate-700 active:scale-95"
                      >
                        <span>{t('courses.contact_buy')}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
