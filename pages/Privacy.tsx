
import React from 'react';
import { Shield, Lock, Eye, Database, ArrowRight, ShieldAlert, Globe, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20 px-4 md:px-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/5 rotate-3">
            <Shield className="w-10 h-10 text-blue-400 -rotate-3" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'خصوصيتك هي أولويتنا القصوى. تعرف على كيفية حماية بياناتك والتعامل معها.' 
              : 'Your privacy is our priority. Learn how we protect and handle your data.'}
          </p>
          <div className="mt-4 inline-block px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
            {language === 'ar' ? 'آخر تحديث: يناير 2025' : 'Last updated: January 2025'}
          </div>
        </div>

        <div className="space-y-10">
          {/* Intellectual Property Notice */}
          <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-500/10 transition-all"></div>
            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
              <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/20">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-3">
                  {language === 'ar' ? 'حماية الملكية الفكرية' : 'Intellectual Property Protection'}
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {language === 'ar' 
                    ? 'جميع التصاميم، مفاهيم المنصة، والأكواد البرمجية هي ملكية فكرية لـ NEXORAX. أي محاولة للنسخ أو التقليد أو استخدام المفهوم أو واجهة المستخدم ستؤدي إلى إجراءات قانونية صارمة. التواصل مع المؤسسين متاح فقط عبر صفحة اتصل بنا.' 
                    : 'All design, platform concept, and code are intellectual property of NEXORAX. Any attempt to copy, imitate, or use the concept or UI will result in legal action. Contacting the founders is allowed via the Contact page.'}
                </p>
              </div>
            </div>
          </div>

          {/* Main Policy Content */}
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12 space-y-12">
              
              {/* Information We Collect */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-blue-400 mb-6">
                  <Database className="w-8 h-8" />
                  <h2 className="text-2xl font-black text-white">
                    {language === 'ar' ? 'المعلومات التي نجمعها' : 'Information We Collect'}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                    <h3 className="text-lg font-bold text-blue-400 mb-4">{language === 'ar' ? 'معلومات شخصية' : 'Personal Information'}</h3>
                    <ul className="space-y-3 text-slate-400 text-sm font-medium">
                      <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-blue-500" /> {language === 'ar' ? 'الاسم والبريد الإلكتروني' : 'Name and email address'}</li>
                      <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-blue-500" /> {language === 'ar' ? 'رقم الواتساب للتحقق والدعم' : 'WhatsApp number for support'}</li>
                      <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-blue-500" /> {language === 'ar' ? 'بيانات الملف الشخصي' : 'Profile information'}</li>
                    </ul>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4">{language === 'ar' ? 'معلومات الاستخدام' : 'Usage Information'}</h3>
                    <ul className="space-y-3 text-slate-400 text-sm font-medium">
                      <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-cyan-500" /> {language === 'ar' ? 'التقدم في الكورسات' : 'Course progress'}</li>
                      <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-cyan-500" /> {language === 'ar' ? 'رسائل المجتمع' : 'Community chat interactions'}</li>
                      <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-cyan-500" /> {language === 'ar' ? 'بيانات الجهاز وعناوين IP' : 'Device info and IP addresses'}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-emerald-400 mb-6">
                  <Eye className="w-8 h-8" />
                  <h2 className="text-2xl font-black text-white">
                    {language === 'ar' ? 'كيف نستخدم معلوماتك' : 'How We Use Your Information'}
                  </h2>
                </div>
                <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-slate-800">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400 text-sm font-medium leading-relaxed">
                    <li className="flex gap-3">• {language === 'ar' ? 'تحسين خدماتنا التعليمية' : 'Improve our educational services'}</li>
                    <li className="flex gap-3">• {language === 'ar' ? 'التواصل معك بشأن التحديثات' : 'Communicate about course updates'}</li>
                    <li className="flex gap-3">• {language === 'ar' ? 'ضمان أمن المنصة ومنع الاحتيال' : 'Ensure security and prevent fraud'}</li>
                    <li className="flex gap-3">• {language === 'ar' ? 'توفير الدعم الفني' : 'Provide customer support'}</li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-indigo-400 mb-6">
                  <Lock className="w-8 h-8" />
                  <h2 className="text-2xl font-black text-white">
                    {language === 'ar' ? 'أمن البيانات' : 'Data Security'}
                  </h2>
                </div>
                <div className="prose prose-invert max-w-none text-slate-400 font-medium">
                  <p className="mb-4">
                    {language === 'ar' ? 'نحن نطبق معايير أمنية عالمية لحماية معلوماتك الشخصية:' : 'We implement industry-standard security measures to protect your personal information:'}
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>{language === 'ar' ? 'تشفير البيانات أثناء الإرسال (HTTPS)' : 'Encrypted data transmission (HTTPS)'}</li>
                    <li>{language === 'ar' ? 'نظام تحقق قوي للوصول للمنصة' : 'Secure platform access verification'}</li>
                    <li>{language === 'ar' ? 'تحديثات أمنية دورية' : 'Regular security audits'}</li>
                  </ul>
                </div>
              </section>

              {/* International & Children */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="space-y-4">
                   <div className="flex items-center gap-3 text-white">
                      <Globe className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-bold">{language === 'ar' ? 'المستخدمون الدوليون' : 'International'}</h3>
                   </div>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium">
                     {language === 'ar' 
                      ? 'نيكسوراكس تعمل عالمياً. قد يتم نقل معلوماتك ومعالجتها في بلدان غير بلدك مع ضمان حمايتها.' 
                      : 'NEXORAX operates globally. Your information may be processed in countries other than your own with full protection.'}
                   </p>
                </section>
                <section className="space-y-4">
                   <div className="flex items-center gap-3 text-white">
                      <Shield className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-xl font-bold">{language === 'ar' ? 'خصوصية الأطفال' : "Children's Privacy"}</h3>
                   </div>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium">
                     {language === 'ar' 
                      ? 'خدماتنا مخصصة للمستخدمين من سن 18 عاماً فما فوق. لا نجمع بيانات الأطفال عمداً.' 
                      : 'Our services are intended for users 18 years and older. We do not knowingly collect personal information from children.'}
                   </p>
                </section>
              </div>

              {/* Contact Support Footer */}
              <div className="pt-10 border-t border-slate-800 mt-12">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-center shadow-xl shadow-blue-600/10">
                   <MessageCircle className="w-12 h-12 text-blue-100 mx-auto mb-4" />
                   <h3 className="text-2xl font-black text-white mb-4">
                      {language === 'ar' ? 'هل لديك أي استفسارات؟' : 'Have any questions?'}
                   </h3>
                   <p className="text-blue-100 mb-8 font-bold">
                      {language === 'ar' 
                        ? 'إذا كان لديك أسئلة حول ممارسات البيانات الخاصة بنا، تواصل مع فريق الخصوصية.' 
                        : 'If you have questions about our data practices, reach out to our privacy team.'}
                   </p>
                   <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      <a href="mailto:privacy@nexorax.com" className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black hover:bg-blue-50 transition-all">
                        privacy@nexorax.com
                      </a>
                      <a href="#/support" className="border-2 border-white/30 text-white px-8 py-3 rounded-2xl font-black hover:bg-white/10 transition-all">
                        {language === 'ar' ? 'الدعم الفني' : 'Technical Support'}
                      </a>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
