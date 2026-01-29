
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Award, Star, Users, PlayCircle, Sparkles, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Course } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  courses: Course[];
  introVideoUrl: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ courses, introVideoUrl }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const featuredCourses = courses.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo('.course-card', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: coursesRef.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, [language, featuredCourses]);

  const renderVideoPlayer = (url: string) => {
    if (!url) {
      return (
        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-800 rounded-2xl">
          <PlayCircle className="w-10 h-10 text-slate-800 mb-3" />
          <p className="text-slate-600 font-bold text-[11px]">{t('intro.no_video')}</p>
        </div>
      );
    }
    
    let videoSrc = '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const vidId = url.split('v=')[1] || url.split('/').pop();
      videoSrc = `https://www.youtube.com/embed/${vidId}`;
    } else if (url.includes('vimeo.com')) {
      const vidId = url.split('/').pop();
      videoSrc = `https://player.vimeo.com/video/${vidId}`;
    }

    if (videoSrc) {
      return <iframe className="w-full h-full" src={videoSrc} frameBorder="0" allowFullScreen></iframe>;
    }

    return <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600 text-[11px]">Format not supported</div>;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-[#020617] to-blue-900/20 pt-14">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse">
            <Sparkles className="w-3 h-3" /> {t('hero.badge')}
          </div>
          <h1 className="hero-title text-5xl md:text-[7rem] font-black text-white mb-6 leading-none tracking-tighter">
            NXORA <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">X</span>
          </h1>
          <p className="hero-subtitle text-sm md:text-lg text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed font-medium">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup" className="hero-cta px-8 py-3.5 text-sm font-black text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2">
              <Rocket className="w-4 h-4" /> {t('hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="py-16 bg-slate-950/50 backdrop-blur-3xl border-y border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
             <h2 className="text-xl md:text-3xl font-black text-white mb-3">{t('intro.title')}</h2>
             <div className="w-12 h-0.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="relative max-w-2xl mx-auto aspect-video bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-white/5">
            {renderVideoPlayer(introVideoUrl)}
          </div>
        </div>
      </section>

      {/* Dynamic Courses Section */}
      <section ref={coursesRef} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="text-start">
              <h2 className="text-xl md:text-3xl font-black text-white mb-1">{t('courses.latest')}</h2>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">{t('courses.invest')}</p>
            </div>
            <Link to="/courses" className="text-blue-400 font-black text-[11px] flex items-center gap-1.5 hover:underline uppercase tracking-widest">
              {t('courses.view_all')} <TrendingUp className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {courses.length > 0 ? featuredCourses.map((course) => (
              <div key={course.id} className="course-card bg-slate-900/30 border border-slate-800 rounded-[1.5rem] overflow-hidden flex flex-col group hover:border-blue-500/30 transition-all duration-500">
                <div className="aspect-video overflow-hidden relative bg-slate-950">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base md:text-lg font-black text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{course.title}</h3>
                  <p className="text-slate-500 text-[10px] mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-base md:text-xl font-black text-blue-500">{course.price}</span>
                    <Link to="/signup" className="bg-white/5 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-[9px] font-black transition-all border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600 uppercase">
                      {t('courses.start_now')}
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-900 rounded-2xl">
                 <Rocket className="w-8 h-8 text-slate-800 mx-auto mb-2" />
                 <p className="text-slate-700 font-black text-[10px]">{t('courses.no_courses')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-16 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
             <h2 className="text-xl md:text-3xl font-black text-white mb-1">{t('trainers.title')}</h2>
             <p className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.3em]">Expert Mentors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Moaz */}
            <div className="group bg-slate-900/40 border border-slate-800 rounded-[1.5rem] p-5 text-center transition-all hover:bg-blue-600/5 hover:border-blue-500/30">
               <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative w-full h-full rounded-full border-2 border-slate-800 overflow-hidden group-hover:border-blue-500 transition-colors">
                     <img src="معاذ.jpg" className="w-full h-full object-cover" alt="Moaz" />
                  </div>
               </div>
               <h3 className="text-lg font-black text-white mb-1">Moaz</h3>
               <p className="text-blue-500 font-black text-[9px] uppercase tracking-widest mb-2">{t('trainers.ai_expert')}</p>
               <p className="text-slate-400 text-[11px] leading-relaxed">Specialized in building AI systems and automating businesses with the latest global tech.</p>
            </div>

            {/* Habiba */}
            <div className="group bg-slate-900/40 border border-slate-800 rounded-[1.5rem] p-5 text-center transition-all hover:bg-cyan-600/5 hover:border-cyan-500/30">
               <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-cyan-600 rounded-full blur-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative w-full h-full rounded-full border-2 border-slate-800 overflow-hidden group-hover:border-cyan-500 transition-colors">
                     <img src="حبيبه حمدي.jpg" className="w-full h-full object-cover" alt="Habiba" />
                  </div>
               </div>
               <h3 className="text-lg font-black text-white mb-1">Habiba</h3>
               <p className="text-cyan-500 font-black text-[9px] uppercase tracking-widest mb-2">{t('trainers.marketing_expert')}</p>
               <p className="text-slate-400 text-[11px] leading-relaxed">Pioneer in Programming and AI Solutions Development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: t('stats.students'), value: '15,000+', icon: <Users className="w-4 h-4" /> },
                 { label: t('stats.courses'), value: '25+', icon: <Award className="w-4 h-4" /> },
                 { label: t('stats.rating'), value: '4.9/5', icon: <Star className="w-4 h-4" /> },
               ].map((stat, i) => (
                 <div key={i} className="text-center">
                    <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 mx-auto mb-2 border border-blue-500/20">
                       {stat.icon}
                    </div>
                    <p className="text-base md:text-xl font-black text-white mb-0.5">{stat.value}</p>
                    <p className="text-slate-500 font-bold text-[8px] uppercase tracking-[0.2em]">{stat.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default LandingPage;
