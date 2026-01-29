
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    'nav.home': 'الرئيسية',
    'nav.courses': 'كورساتي',
    'nav.profile': 'الملف الشخصي',
    'nav.support': 'الدعم الفني',
    'nav.logout': 'خروج',
    'nav.login': 'دخول',
    'nav.signup': 'ابدأ الآن',
    'nav.admin': 'الإدارة',
    'nav.dashboard': 'لوحة التحكم',
    'hero.title': 'اتقن الذكاء الاصطناعي التوليدي والبرمجة',
    'hero.subtitle': 'تعلم مستقبل صناعة المحتوى وهندسة البرمجيات مع NXORA X.',
    'hero.cta': 'ابدأ رحلتك الآن',
    'hero.badge': 'مهارات المستقبل بين يديك',
    'intro.title': 'تعرف على NXORA X',
    'intro.no_video': 'لا يوجد فيديو تعريفي حالياً',
    'courses.latest': 'أحدث الكورسات',
    'courses.invest': 'استثمر في مستقبلك اليوم',
    'courses.view_all': 'مشاهدة الكل',
    'courses.no_courses': 'لا توجد كورسات متاحة حالياً.',
    'courses.start_now': 'ابدأ الآن',
    'courses.academy_title': 'NXORA X',
    'courses.academy_desc': 'تصفح مساراتك التعليمية أو اكتشف مهارات جديدة في عالم الذكاء الاصطناعي والبرمجة.',
    'courses.locked': 'المحتوى مقفل',
    'courses.locked_desc': 'تواصل مع الدعم الفني لفتح الكورس بعد الدفع',
    'courses.owned': 'ممتلك',
    'courses.contact_buy': 'تواصل للشراء',
    'courses.watch_now': 'مشاهدة الدروس الآن',
    'dashboard.title': 'لوحة تحكم الطالب',
    'dashboard.welcome': 'أهلاً',
    'dashboard.level': 'المستوى',
    'dashboard.total_progress': 'التقدم الإجمالي',
    'dashboard.stats.completed': 'دروس مكتملة',
    'dashboard.stats.points': 'النقاط',
    'dashboard.stats.total_lessons': 'إجمالي الحصص',
    'dashboard.continue': 'متابعة التعلم',
    'dashboard.review': 'مراجعة الدروس',
    'dashboard.continue_watching': 'مواصلة المشاهدة',
    'dashboard.no_courses': 'ابدأ رحلتك بامتلاك أول كورس لك الآن!',
    'trainers.title': 'نخبة المدربين',
    'trainers.ai_expert': 'خبير الذكاء الاصطناعي',
    'trainers.marketing_expert': 'خبير البرمجة والذكاء الاصطناعي',
    'stats.students': 'طالب مشترك',
    'stats.hours': 'ساعة تدريبية',
    'stats.courses': 'كورس احترافي',
    'stats.rating': 'تقييم إيجابي',
    'support.title': 'تواصل معنا',
    'support.subtitle': "لديك أسئلة حول دوراتنا أو تحتاج إلى دعم؟ نحن هنا لمساعدتك على النجاح في رحلتك الريادية.",
    'support.form.title': 'أرسل لنا رسالة',
    'support.form.name': 'الاسم الكامل',
    'support.form.email': 'البريد الإلكتروني',
    'support.form.subject': 'الموضوع',
    'support.form.message': 'الرسالة',
    'support.form.placeholder.name': 'أدخل اسمك الكامل',
    'support.form.placeholder.email': 'أدخل بريدك الإلكتروني',
    'support.form.placeholder.subject': 'اختر موضوعاً',
    'support.form.placeholder.message': 'أخبرنا كيف يمكننا مساعدتك...',
    'support.form.submit': 'إرسال الرسالة',
    'support.info.title': 'معلومات التواصل',
    'footer.rights': 'جميع الحقوق محفوظة © 2026',
    'footer.brand': 'NXORA X',
    'footer.created_by': 'بواسطة',
    'footer.desc': 'تمكين الأفراد من بناء مستقبلهم الرقمي وجني الأرباح باستخدام أدوات الذكاء الاصطناعي الأحدث عالمياً مع NXORA X.',
    'footer.links': 'روابط سريعة',
    'footer.legal': 'الدعم والقانون',
    'footer.join': 'انضم إلينا',
    'footer.join_desc': 'كن جزءاً من مجتمع الخبراء اليوم.',
    'privacy.title': 'سياسة الخصوصية',
    'privacy.last_update': 'آخر تحديث: يناير 2025',
    'player.back': 'العودة',
    'player.curriculum': 'منهج الكورس',
    'player.notes': 'ملاحظات الدرس'
  },
  en: {
    'nav.home': 'Home',
    'nav.courses': 'My Courses',
    'nav.profile': 'Profile',
    'nav.support': 'Support',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.signup': 'Get Started',
    'nav.admin': 'Admin',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'Master Generative AI & Programming',
    'hero.subtitle': 'Learn the future of content creation and software engineering with NXORA X.',
    'hero.cta': 'Start Journey Now',
    'hero.badge': 'Future Skills in Your Hands',
    'intro.title': 'Get to Know NXORA X',
    'intro.no_video': 'No intro video available',
    'courses.latest': 'Latest Courses',
    'courses.invest': 'Invest in your future today',
    'courses.view_all': 'View All',
    'courses.no_courses': 'No courses available currently.',
    'courses.start_now': 'Start Now',
    'courses.academy_title': 'NXORA X Academy',
    'courses.academy_desc': 'Browse your educational paths or discover new skills in AI and programming.',
    'courses.locked': 'Content Locked',
    'courses.locked_desc': 'Contact support to unlock the course after payment',
    'courses.owned': 'Owned',
    'courses.contact_buy': 'Contact to Buy',
    'courses.watch_now': 'Watch Lessons Now',
    'dashboard.title': 'Student Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.level': 'Level',
    'dashboard.total_progress': 'Total Progress',
    'dashboard.stats.completed': 'Completed',
    'dashboard.stats.points': 'Points',
    'dashboard.stats.total_lessons': 'Total Lessons',
    'dashboard.continue': 'Continue Learning',
    'dashboard.review': 'Review Lessons',
    'dashboard.continue_watching': 'Continue Watching',
    'dashboard.no_courses': 'Start your journey by owning your first course!',
    'trainers.title': 'Expert Trainers',
    'trainers.ai_expert': 'AI Specialist',
    'trainers.marketing_expert': 'Expert Programming and AI Enginee',
    'stats.students': 'Students',
    'stats.hours': 'Training Hours',
    'stats.courses': 'Professional Courses',
    'stats.rating': 'Positive Rating',
    'support.title': 'Get In Touch',
    'support.subtitle': "Questions or need support? We're here to help you succeed on your journey.",
    'support.form.title': 'Send a Message',
    'support.form.name': 'Full Name',
    'support.form.email': 'Email Address',
    'support.form.subject': 'Subject',
    'support.form.message': 'Message',
    'support.form.placeholder.name': 'Your full name',
    'support.form.placeholder.email': 'Your email',
    'support.form.placeholder.subject': 'Select a subject',
    'support.form.placeholder.message': 'How can we help you?',
    'support.form.submit': 'Send Message',
    'support.info.title': 'Contact Info',
    'footer.rights': 'All Rights Reserved © 2026',
    'footer.brand': 'NXORA X',
    'footer.created_by': 'Created by',
    'footer.desc': 'Empowering individuals to build their digital future and profit using global AI tools with NXORA X.',
    'footer.links': 'Quick Links',
    'footer.legal': 'Support & Legal',
    'footer.join': 'Join Us',
    'footer.join_desc': 'Be part of the expert community today.',
    'privacy.title': 'Privacy Policy',
    'privacy.last_update': 'Last updated: January 2025',
    'player.back': 'Back',
    'player.curriculum': 'Course Curriculum',
    'player.notes': 'Lesson Notes'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nx_lang');
    return (saved as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('nx_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
