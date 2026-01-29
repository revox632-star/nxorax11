
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, FileText, ChevronRight, Menu, CheckCircle, X } from 'lucide-react';
import { doc, updateDoc, arrayUnion } from '@firebase/firestore';
import { db } from '../firebase';
import { Course, User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoPlayerProps {
  courses: Course[];
  user: User | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ courses, user }) => {
  const { courseId } = useParams();
  const { t, language } = useLanguage();
  const course = courses.find(c => c.id === courseId);
  const [activeVideo, setActiveVideo] = useState(course?.videos[0]);
  const [showMobileList, setShowMobileList] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && activeVideo) {
      markLessonAsCompleted(activeVideo.id);
    }
  }, [activeVideo]);

  const markLessonAsCompleted = async (videoId: string) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        completedLessons: arrayUnion(videoId)
      });
    } catch (err) {
      console.error("Error marking lesson as completed:", err);
    }
  };

  if (!course) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black">Course Not Found</div>;

  const renderPlayer = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const vidId = url.split('v=')[1] || url.split('/').pop();
      return <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
    }
    if (url.includes('vimeo.com')) {
      const vidId = url.split('/').pop();
      return <iframe className="w-full h-full" src={`https://player.vimeo.com/video/${vidId}?autoplay=1`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>;
    }
    return <div className="w-full h-full bg-black flex items-center justify-center p-8 text-center text-slate-500">Video format not supported</div>;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <div className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-[60]">
        <Link to="/courses" className="flex items-center text-slate-400 hover:text-white transition-colors group">
          <ChevronRight className={`w-5 h-5 ms-1 transition-transform ${language === 'ar' ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1 rotate-180'}`} />
          <span className="text-xs md:text-sm font-black uppercase tracking-widest">{t('player.back')}</span>
        </Link>
        <h1 className="text-xs md:text-lg font-black truncate max-w-[40%] text-center">{course.title}</h1>
        <button 
          onClick={() => setShowMobileList(true)}
          className="lg:hidden p-2 bg-blue-600 rounded-xl text-white shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden lg:block text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">NXORAX PLAYER 1.0</div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 relative overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617]">
          <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-8 text-start">
            <div className="relative aspect-video bg-black rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-slate-800/50">
              {activeVideo && renderPlayer(activeVideo.url)}
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl md:text-3xl font-black leading-tight text-white">{activeVideo?.title}</h2>
                <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-xl w-fit">
                   <CheckCircle className="w-4 h-4 text-blue-400" />
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                     {language === 'ar' ? 'الدرس الحالي' : 'Current Lesson'}
                   </span>
                </div>
              </div>

              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 md:p-10">
                <div className="flex items-center gap-3 text-blue-500 mb-6 pb-4 border-b border-slate-800/50">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm md:text-base font-black uppercase tracking-widest">{t('player.notes')}</span>
                </div>
                <div className="text-slate-300 leading-relaxed text-sm md:text-lg">
                  {activeVideo?.description || (language === 'ar' ? 'لا توجد ملاحظات إضافية لهذا الدرس حالياً.' : 'No additional notes for this lesson.')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`
          fixed lg:relative inset-0 lg:inset-auto z-[100] lg:z-10
          w-full lg:w-[420px] bg-slate-950/95 lg:bg-slate-900/30 backdrop-blur-xl lg:backdrop-blur-none
          transition-transform duration-500 ease-in-out border-r border-slate-900
          ${showMobileList ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
        `}>
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-900">
            <h3 className="text-lg md:text-xl font-black">{t('player.curriculum')}</h3>
            <button onClick={() => setShowMobileList(false)} className="lg:hidden p-2 text-slate-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 custom-scrollbar h-[calc(100vh-200px)] lg:h-auto">
            {course.videos.map((video, idx) => {
              const isCompleted = user?.completedLessons?.includes(video.id);
              return (
                <button 
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video);
                    setShowMobileList(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-start group relative overflow-hidden
                    ${activeVideo?.id === video.id 
                      ? 'bg-blue-600 border-blue-400 shadow-xl' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] flex-shrink-0 z-10
                    ${activeVideo?.id === video.id ? 'bg-white text-blue-600' : isCompleted ? 'bg-green-600/20 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-500'}
                  `}>
                    {isCompleted && activeVideo?.id !== video.id ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </div>
                  <p className={`font-bold text-xs md:text-sm truncate flex-1 z-10 ${activeVideo?.id === video.id ? 'text-white' : 'text-slate-300'}`}>
                    {video.title}
                  </p>
                  {activeVideo?.id === video.id && <Play className="w-4 h-4 fill-current text-white animate-pulse z-10" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
