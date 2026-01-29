
export interface User {
  id: string;
  fullName: string;
  username: string;
  whatsapp: string;
  email: string;
  password?: string;
  role: 'student' | 'admin' | 'creator';
  purchasedCourses: string[]; 
  completedLessons?: string[]; // مصفوفة تحتوي على معرفات الدروس المكتملة
}

export interface Video {
  id: string;
  title: string;
  url: string; 
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  studentsCount: string;
  videos: Video[];
  isLocked?: boolean;
}

export type Language = 'en' | 'ar';
