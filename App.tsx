
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, collection, onSnapshot, updateDoc, setDoc, deleteDoc } from '@firebase/firestore';
import { auth, db } from './firebase';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CourseList from './pages/CourseList';
import VideoPlayer from './pages/VideoPlayer';
import AdminDashboard from './pages/AdminDashboard';
import Support from './pages/Support';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { User, Course, Video } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [introVideoUrl, setIntroVideoUrl] = useState<string>('');

  useEffect(() => {
    // مؤقت أمان قصير جداً: إذا استغرق التحميل أكثر من 2.5 ثانية، افتح التطبيق فوراً
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    let unsubUserDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (unsubUserDoc) {
        unsubUserDoc();
        unsubUserDoc = null;
      }

      if (firebaseUser) {
        // جلب بيانات المستخدم وتحديث الواجهة بمجرد الحصول على أول استجابة
        unsubUserDoc = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            setUser({ id: firebaseUser.uid, ...docSnap.data() } as User);
          }
          setLoading(false);
          clearTimeout(safetyTimer);
        }, () => {
          setLoading(false);
          clearTimeout(safetyTimer);
        });
      } else {
        setUser(null);
        setLoading(false);
        clearTimeout(safetyTimer);
      }
    });

    const unsubscribeCourses = onSnapshot(collection(db, 'courses'), (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      setCourses(coursesData);
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'appearance'), (docSnap) => {
      if (docSnap.exists()) {
        setIntroVideoUrl(docSnap.data().introVideoUrl || '');
      }
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(usersData);
    });

    return () => {
      unsubscribeAuth();
      if (unsubUserDoc) unsubUserDoc();
      unsubscribeCourses();
      unsubscribeSettings();
      unsubscribeUsers();
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const toggleAccess = async (userId: string, courseId: string) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;
    const hasAccess = userToUpdate.purchasedCourses.includes(courseId);
    const newPurchased = hasAccess 
      ? userToUpdate.purchasedCourses.filter(id => id !== courseId)
      : [...userToUpdate.purchasedCourses, courseId];
    await updateDoc(doc(db, 'users', userId), { purchasedCourses: newPurchased });
  };

  const toggleRole = async (userId: string) => {
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate || userToUpdate.role === 'admin') return;
    const newRole = userToUpdate.role === 'creator' ? 'student' : 'creator';
    await updateDoc(doc(db, 'users', userId), { role: newRole });
  };

  const addCourse = async (course: Course) => {
    await setDoc(doc(db, 'courses', course.id), course);
  };

  const updateCourseVideos = async (courseId: string, updatedVideos: Video[]) => {
    await updateDoc(doc(db, 'courses', courseId), { videos: updatedVideos });
  };

  const deleteCourse = async (courseId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكورس نهائياً؟')) {
      await deleteDoc(doc(db, 'courses', courseId));
    }
  };

  const updateIntroVideo = async (url: string) => {
    await setDoc(doc(db, 'settings', 'appearance'), { introVideoUrl: url }, { merge: true });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6 px-4" dir="rtl">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-blue-500 font-black text-xs">X</span>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-blue-500 font-black text-xs tracking-[0.3em] uppercase animate-pulse">جاري التحضير</p>
        <p className="text-slate-600 text-[10px] font-bold">NXORA X | التعليم الذكي</p>
      </div>
    </div>
  );

  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header user={user} onLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage courses={courses} introVideoUrl={introVideoUrl} />} />
              <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
              <Route path="/courses" element={user ? <CourseList courses={courses} user={user} onMenuClick={() => {}} /> : <Navigate to="/login" />} />
              <Route path="/player/:courseId" element={user ? <VideoPlayer courses={courses} user={user} /> : <Navigate to="/login" />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={user ? <Dashboard user={user} courses={courses} /> : <Navigate to="/login" />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route 
                path="/admin" 
                element={user?.role === 'admin' || user?.role === 'creator'
                  ? <AdminDashboard 
                      users={users} 
                      currentUser={user}
                      courses={courses} 
                      onToggleAccess={toggleAccess} 
                      onToggleRole={toggleRole} 
                      onAddCourse={addCourse}
                      onUpdateCourseVideos={updateCourseVideos}
                      onDeleteCourse={deleteCourse}
                      introVideoUrl={introVideoUrl}
                      onUpdateIntroVideo={updateIntroVideo}
                    /> 
                  : <Navigate to="/" />
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
