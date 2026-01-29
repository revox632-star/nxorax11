
import React, { useState, useRef } from 'react';
import { 
  Users as UsersIcon, Search, Shield, Video, Trash2, 
  Layout, UserPlus, Smartphone, Mail, MessageSquare, AlertCircle, PlusCircle, ChevronLeft, Play, Info, Settings, Save, AlertTriangle, X, AtSign, Crown, Image as ImageIcon, Link as LinkIcon, Plus, UserCircle, ShieldCheck, Upload
} from 'lucide-react';
import { User, Course, Video as VideoType } from '../types';

interface AdminDashboardProps {
  users: User[];
  currentUser: User | null;
  courses: Course[];
  onToggleAccess: (userId: string, courseId: string) => void;
  onAddCourse: (course: Course) => void;
  onToggleRole: (userId: string) => void;
  onUpdateCourseVideos: (courseId: string, videos: VideoType[]) => void;
  onDeleteCourse: (courseId: string) => void;
  introVideoUrl: string;
  onUpdateIntroVideo: (url: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  users, currentUser, courses, onToggleAccess, onAddCourse, onToggleRole, onUpdateCourseVideos,
  onDeleteCourse, introVideoUrl, onUpdateIntroVideo
}) => {
  const isAdmin = currentUser?.role === 'admin';
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'settings'>(isAdmin ? 'users' : 'content');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for new course
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '', description: '', image: '', price: '0 EGP'
  });

  // State for lesson management
  const [selectedCourseForLessons, setSelectedCourseForLessons] = useState<Course | null>(null);
  const [newLesson, setNewLesson] = useState<Partial<VideoType>>({ title: '', url: '', description: '' });

  const [newIntroUrl, setNewIntroUrl] = useState(introVideoUrl);
  const [isSavingVideo, setIsSavingVideo] = useState(false);

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(search.toLowerCase()) || 
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.whatsapp.includes(search)
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        alert("حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse({ ...newCourse, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveVideo = async () => {
    setIsSavingVideo(true);
    await onUpdateIntroVideo(newIntroUrl);
    setIsSavingVideo(false);
    alert('تم تحديث الفيديو بنجاح!');
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.image) return alert('برجاء إدخال اسم الكورس واختيار صورة');
    const courseToAdd: Course = {
      id: Date.now().toString(),
      title: newCourse.title || '',
      description: newCourse.description || '',
      image: newCourse.image || '',
      price: newCourse.price || '0 EGP',
      studentsCount: '0',
      videos: []
    };
    await onAddCourse(courseToAdd);
    setShowAddCourse(false);
    setNewCourse({ title: '', description: '', image: '', price: '0 EGP' });
  };

  const handleAddLesson = async () => {
    if (!selectedCourseForLessons || !newLesson.title || !newLesson.url) return;
    const updatedVideos = [...selectedCourseForLessons.videos, {
      id: Date.now().toString(),
      title: newLesson.title || '',
      url: newLesson.url || '',
      description: newLesson.description || ''
    }];
    await onUpdateCourseVideos(selectedCourseForLessons.id, updatedVideos);
    setNewLesson({ title: '', url: '', description: '' });
    setSelectedCourseForLessons({ ...selectedCourseForLessons, videos: updatedVideos });
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!selectedCourseForLessons) return;
    const updatedVideos = selectedCourseForLessons.videos.filter(v => v.id !== lessonId);
    await onUpdateCourseVideos(selectedCourseForLessons.id, updatedVideos);
    setSelectedCourseForLessons({ ...selectedCourseForLessons, videos: updatedVideos });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 md:pt-24 px-4 md:px-8 pb-20 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
               <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">لوحة تحكم الإدارة</h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">مرحباً، {currentUser?.fullName}</p>
            </div>
          </div>
          
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl w-full lg:w-auto overflow-x-auto shadow-xl">
            {isAdmin && (
              <button onClick={() => setActiveTab('users')} className={`px-5 py-2 rounded-lg transition-all font-black text-[11px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>
                <UsersIcon className="w-3.5 h-3.5" /> الطلاب
              </button>
            )}
            <button onClick={() => setActiveTab('content')} className={`px-5 py-2 rounded-lg transition-all font-black text-[11px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'content' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>
              <Video className="w-3.5 h-3.5" /> الكورسات
            </button>
            {isAdmin && (
              <button onClick={() => setActiveTab('settings')} className={`px-5 py-2 rounded-lg transition-all font-black text-[11px] whitespace-nowrap flex items-center gap-2 ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}>
                <Settings className="w-3.5 h-3.5" /> الإعدادات
              </button>
            )}
          </div>
        </header>

        {activeTab === 'users' && isAdmin && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl shadow-2xl flex flex-col md:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="ابحث عن طالب..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pr-10 pl-4 focus:outline-none focus:border-blue-500 transition-all text-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="bg-blue-600/10 px-4 py-2 rounded-lg border border-blue-500/20 text-blue-400 font-bold text-[10px]">
                إجمالي الطلاب: {users.length}
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-950/50 border-b border-slate-800">
                      <th className="p-4 text-slate-400 font-black text-[9px] uppercase tracking-widest">الطالب</th>
                      <th className="p-4 text-slate-400 font-black text-[9px] uppercase tracking-widest text-center">الرتبة</th>
                      <th className="p-4 text-slate-400 font-black text-[9px] uppercase tracking-widest">إدارة الدخول</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-blue-500/5 transition-all group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-black text-blue-400 border border-slate-700 text-xs">
                              {user.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-white text-xs">{user.fullName}</p>
                              <div className="text-[9px] text-slate-500 font-bold">@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                             <div className={`
                               inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider
                               ${user.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                 user.role === 'creator' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}
                             `}>
                               {user.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : user.role === 'creator' ? <Crown className="w-3 h-3" /> : <UserCircle className="w-3 h-3" />}
                               {user.role}
                             </div>
                             {user.role !== 'admin' && (
                               <button 
                                 onClick={() => onToggleRole(user.id)}
                                 className="text-[8px] font-black text-slate-500 hover:text-white underline underline-offset-2 transition-colors uppercase"
                               >
                                 {user.role === 'creator' ? 'تحويل لطالب' : 'تعيين كـ Creator'}
                               </button>
                             )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {courses.map(course => {
                              const hasAccess = user.purchasedCourses.includes(course.id);
                              return (
                                <button
                                  key={course.id}
                                  onClick={() => onToggleAccess(user.id, course.id)}
                                  className={`px-2.5 py-1 rounded-md text-[9px] font-black transition-all border ${hasAccess ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                                >
                                  {course.title} {hasAccess ? '✓' : '+'}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
               <h2 className="text-sm font-black">إدارة الكورسات</h2>
               <button 
                 onClick={() => setShowAddCourse(true)}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-black text-[11px] flex items-center gap-2"
               >
                 <PlusCircle className="w-4 h-4" /> إضافة كورس
               </button>
            </div>

            {showAddCourse && (
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input type="text" placeholder="اسم الكورس" className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} />
                    <input type="text" placeholder="السعر (مثلاً: 500 EGP)" className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs" value={newCourse.price} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} />
                    <textarea placeholder="وصف الكورس" className="w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs" rows={3} value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">الصورة المصغرة (رفع من الجهاز)</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden relative group"
                    >
                      {newCourse.image ? (
                        <>
                          <img src={newCourse.image} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="w-6 h-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-slate-700 mb-2" />
                          <span className="text-[10px] text-slate-500 font-bold">اضغط لاختيار صورة</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t border-slate-800/50">
                  <button onClick={handleAddCourse} className="bg-green-600 px-6 py-2 rounded-lg text-xs font-black hover:bg-green-700 transition-all">حفظ الكورس</button>
                  <button onClick={() => { setShowAddCourse(false); setNewCourse({title: '', description: '', image: '', price: '0 EGP'}); }} className="bg-slate-800 px-6 py-2 rounded-lg text-xs font-black">إلغاء</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map(course => (
                <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-slate-950">
                    <img src={course.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={course.title} />
                    <button onClick={() => onDeleteCourse(course.id)} className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-black text-sm mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-slate-500 text-[10px] mb-3 line-clamp-2 leading-relaxed">{course.description}</p>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-blue-400 border-t border-slate-800/50 pt-3">
                        <span>{course.price}</span>
                        <span>{course.videos.length} حصة</span>
                      </div>
                      <button 
                        onClick={() => setSelectedCourseForLessons(course)}
                        className="w-full bg-slate-800 hover:bg-blue-600 text-white py-2 rounded-lg text-[10px] font-black transition-all flex items-center justify-center gap-2"
                      >
                        <Settings className="w-3.5 h-3.5" /> إدارة الحصص
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCourseForLessons && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black">إدارة حصص: {selectedCourseForLessons.title}</h3>
                <button onClick={() => setSelectedCourseForLessons(null)} className="p-1.5 bg-slate-800 rounded-lg hover:bg-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl mb-6 space-y-3">
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">إضافة حصة جديدة</h4>
                <input type="text" placeholder="عنوان الحصة" className="w-full bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs" value={newLesson.title} onChange={(e) => setNewLesson({...newLesson, title: e.target.value})} />
                <input type="text" placeholder="رابط الفيديو" className="w-full bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs" value={newLesson.url} onChange={(e) => setNewLesson({...newLesson, url: e.target.value})} />
                <textarea placeholder="وصف الحصة" className="w-full bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs" rows={2} value={newLesson.description} onChange={(e) => setNewLesson({...newLesson, description: e.target.value})} />
                <button onClick={handleAddLesson} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-black text-xs flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> إضافة الحصة
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الحصص الحالية ({selectedCourseForLessons.videos.length})</h4>
                {selectedCourseForLessons.videos.map((video, idx) => (
                  <div key={video.id} className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-600">{idx + 1}</span>
                      <p className="text-xs font-bold truncate max-w-[200px]">{video.title}</p>
                    </div>
                    <button onClick={() => handleDeleteLesson(video.id)} className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-md">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && isAdmin && (
          <div className="max-w-xl mx-auto py-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
               <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500">
                    <Play className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black">فيديو الواجهة</h2>
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">الفيديو التعريفي للزوار</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">رابط الفيديو</label>
                    <div className="relative">
                      <LinkIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        type="text" 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pr-10 pl-4 text-white focus:outline-none focus:border-blue-500 transition-all text-xs"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newIntroUrl}
                        onChange={(e) => setNewIntroUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <button onClick={handleSaveVideo} disabled={isSavingVideo} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-black py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs">
                    <Save className="w-4 h-4" />
                    <span>{isSavingVideo ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
