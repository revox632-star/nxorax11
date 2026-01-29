
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  BookOpen, PlayCircle, Sparkles, LayoutDashboard, 
  Zap, ChevronLeft, ArrowUpRight, Clock, 
  ShieldCheck, Calendar, Rocket, Target
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Course } from '../types';

interface DashboardProps {
  user: User | null;
  courses: Course[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, courses }) => {
  const { t, language } = useLanguage();
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dashboard-card', 
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.progress-fill',
        { width: '0%' },
        { 
          width: (i, target: HTMLElement) => target.dataset.width || '0%', 
          duration: 1.5, 
          ease: 'power2.inOut', 
          delay: 0.5 
        }
      );
    }, dashboardRef);
    return () => ctx.revert();
  }, [language, user?.completedLessons]);

  if (!user) return null;

  const purchasedCoursesData = courses.filter(c => user.purchasedCourses.includes(c.id));
  const completedLessonsCount = user.completedLessons?.length || 0;
  const totalLessonsInOwnedCourses = purchasedCoursesData.reduce((acc, course) => acc + course.videos.length, 0);
  const overallProgress = totalLessonsInOwnedCourses > 0 
    ? Math.round((completedLessonsCount / totalLessonsInOwnedCourses) * 100) 
    : 0;

  const getRank = () => {
    if (purchasedCoursesData.length === 0) return language === 'ar' ? "مبتدئ جديد" : "New Starter";
    if (overallProgress > 80) return language === 'ar' ? "خبير محترف" : "Pro Expert";
    if (overallProgress > 50) return language === 'ar' ? "متعلم متقدم" : "Advanced Learner";
    if (overallProgress > 20) return language === 'ar' ? "خبير صاعد" : "Rising Talent";
    return language === 'ar' ? "متعلم طموح" : "Ambitious Learner";
  };

  const currentDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const badges = [
    { id: 1, name: 'Power Start', icon: <Rocket className="w-4 h-4" />, active: purchasedCoursesData.length > 0, color: 'bg-orange-500/20 text-orange-400' },
    { id: 2, name: 'Smart Learner', icon: <Sparkles className="w-4 h-4" />, active: completedLessonsCount > 5, color: 'bg-blue-500/20 text-blue-400' },
    { id: 3, name: 'Elite Member', icon: <ShieldCheck className="w-4 h-4" />, active: purchasedCoursesData.length >= 3, color: 'bg-emerald-500/20 text-emerald-400' },
  ];

  return (
    <div ref={dashboardRef} className="min-h-screen bg-[#020617] pt-24 md:pt-32 pb-20 px-4 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="dashboard-card mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="text-start">
            <div className="flex items-center gap-3 text-blue-500 mb-2">
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Student Portal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">{t('dashboard.title')}</h1>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-2xl text-slate-400 text-xs font-bold shadow-inner">
            <Calendar className="w-4 h-4 text-blue-400" />
            {currentDate}
          </div>
        </div>

        <div className="dashboard-card bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-600/5 blur-3xl -mr-24 -mt-24"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-start w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/15 border border-blue-500/20 rounded-full text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4">
                {t('dashboard.level')}: {getRank()}
              </div>
              <h1 className="text-2xl md:text-6xl font-black text-white mb-3">
                {t('dashboard.welcome')}, <span className="text-blue-500">{user.fullName.split(' ')[0]}</span>
              </h1>
              <p className="text-slate-400 text-xs md:text-lg mb-6 max-w-xl mx-auto md:mx-0">
                {overallProgress === 100 
                  ? (language === 'ar' ? "مبارك! لقد أتممت جميع دروسك بنجاح." : "Congrats! You finished all your lessons.")
                  : (language === 'ar' ? `استمر في تقدمك! لقد أنجزت ${overallProgress}% من مسارك التعليمي.` : `Keep going! You have completed ${overallProgress}% of your path.`)}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link to="/courses" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 text-xs md:text-sm">
                  {t('dashboard.continue')} <ChevronLeft className="w-4 h-4 ltr:rotate-180 rtl:rotate-0" />
                </Link>
                <div className="flex gap-2">
                  {badges.map(badge => (
                    <div key={badge.id} title={badge.name} className={`w-10 h-10 rounded-xl ${badge.active ? badge.color : 'bg-slate-800/50 text-slate-700'} flex items-center justify-center shadow-lg transition-all`}>
                      {badge.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-28 h-28 md:w-48 md:h-48 flex-shrink-0">
               <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
               <div className="relative w-full h-full bg-slate-950 border-2 md:border-4 border-slate-800 rounded-full flex flex-col items-center justify-center">
                  <span className="text-xl md:text-4xl font-black text-blue-400">{overallProgress}%</span>
                  <span className="text-[8px] md:text-[10px] text-slate-500 font-black uppercase mt-0.5">{t('dashboard.total_progress')}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {[
            { icon: BookOpen, label: t('nav.courses'), value: user.purchasedCourses.length, color: 'text-blue-400', bg: 'bg-blue-600/10' },
            { icon: PlayCircle, label: t('dashboard.stats.completed'), value: completedLessonsCount, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { icon: Zap, label: t('dashboard.stats.points'), value: completedLessonsCount * 10, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            { icon: Target, label: t('dashboard.stats.total_lessons'), value: totalLessonsInOwnedCourses, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          ].map((stat, i) => (
            <div key={i} className="dashboard-card bg-slate-900/30 border border-slate-800 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:bg-slate-900/50 transition-all text-start">
               <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
               </div>
               <p className="text-[8px] md:text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">{stat.label}</p>
               <p className="text-lg md:text-3xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-black text-white px-2 text-start">{t('dashboard.continue')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {purchasedCoursesData.length > 0 ? purchasedCoursesData.map((course) => {
              const courseLessonsIds = course.videos.map(v => v.id);
              const courseCompletedCount = user.completedLessons?.filter(id => courseLessonsIds.includes(id)).length || 0;
              const courseProgress = course.videos.length > 0 ? Math.round((courseCompletedCount / course.videos.length) * 100) : 0;

              return (
                <div key={course.id} className="dashboard-card bg-slate-900/40 border border-slate-800 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 flex flex-col sm:flex-row items-center gap-6 group hover:border-blue-500/30 transition-all">
                  <div className="w-full sm:w-32 md:w-40 h-24 md:h-28 rounded-xl md:rounded-2xl overflow-hidden border border-slate-800 flex-shrink-0 group-hover:border-blue-500/50 transition-colors">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 w-full text-center sm:text-start">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-base md:text-xl font-black text-white group-hover:text-blue-400 transition-colors">{course.title}</h3>
                       <span className="text-[10px] font-black text-blue-500">{courseProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-4 border border-slate-800/50">
                      <div className="h-full bg-blue-600 rounded-full progress-fill transition-all duration-1000" data-width={`${courseProgress}%`} style={{ width: '0%' }}></div>
                    </div>
                    <Link to={`/player/${course.id}`} className="text-[10px] md:text-[11px] font-black text-blue-400 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-2 uppercase tracking-widest">
                      {courseProgress === 100 ? t('dashboard.review') : t('dashboard.continue_watching')} <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full py-16 md:py-20 text-center border-2 border-dashed border-slate-800 rounded-[2rem]">
                <Rocket className="w-10 h-10 md:w-12 md:h-12 text-slate-800 mx-auto mb-4" />
                <p className="text-slate-500 font-bold text-sm">{t('dashboard.no_courses')}</p>
                <Link to="/courses" className="mt-4 inline-block text-blue-400 font-black text-xs hover:underline uppercase tracking-widest">{t('courses.view_all')}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
