
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t, language } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // إخفاء رسالة النجاح بعد 5 ثوانٍ
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t('support.title')}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t('support.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>
            
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              {t('support.form.title')}
            </h2>

            {submitted && (
              <div className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-green-400 font-bold">
                  {language === 'ar' ? 'شكراً لرسالتك! سنقوم بالرد عليك خلال 24 ساعة.' : 'Thank you! We will get back to you within 24 hours.'}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest px-1">{t('support.form.name')} *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                    placeholder={t('support.form.placeholder.name')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest px-1">{t('support.form.email')} *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                    placeholder={t('support.form.placeholder.email')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest px-1">{t('support.form.subject')} *</label>
                <div className="relative">
                  <select 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="" className="bg-slate-950">{t('support.form.placeholder.subject')}</option>
                    <option value="access" className="bg-slate-950">مشكلة في الدخول (Access Issue)</option>
                    <option value="payment" className="bg-slate-950">المدفوعات (Billing)</option>
                    <option value="course" className="bg-slate-950">معلومات الكورس (Course Info)</option>
                    <option value="feedback" className="bg-slate-950">اقتراحات (Feedback)</option>
                  </select>
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest px-1">{t('support.form.message')} *</label>
                <textarea 
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500 transition-all resize-none placeholder:text-slate-700"
                  placeholder={t('support.form.placeholder.message')}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 w-full md:w-auto"
              >
                <span>{loading ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t('support.form.submit')}</span>
                {!loading && <Send className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>

          {/* Right Column: Info & Extra Sections */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Information */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl shadow-black/50">
              <h2 className="text-2xl font-bold text-white mb-10">{t('support.info.title')}</h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-blue-600/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Email</h4>
                    <p className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">mouazfried18@gmail.com</p>
                    <p className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">mouazfried@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-cyan-600/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-cyan-600/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Phone</h4>
                    <p className="text-slate-400">+201009285935</p>
                    <p className="text-[10px] font-black uppercase text-cyan-500/60 mt-1 tracking-widest">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-700 group-hover:text-white transition-all shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Address</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Fuwwah<br />
                      Kafr El Sheikh, Egypt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times Section */}
            <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 rounded-[2rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'أوقات الاستجابة' : 'Response Times'}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400 font-medium">{language === 'ar' ? 'استفسارات عامة' : 'General Inquiries'}</span>
                  <span className="font-black text-blue-400">{language === 'ar' ? 'خلال 4 ساعات' : 'Within 4h'}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400 font-medium">{language === 'ar' ? 'دعم فني' : 'Technical Support'}</span>
                  <span className="font-black text-blue-400">{language === 'ar' ? 'خلال ساعتين' : 'Within 2h'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">{language === 'ar' ? 'مشاكل الدفع' : 'Billing Issues'}</span>
                  <span className="font-black text-blue-400">{language === 'ar' ? 'خلال ساعة' : 'Within 1h'}</span>
                </div>
              </div>
            </div>

            {/* Quick Answers Section */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-[2rem] p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                   <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'تحتاج إجابات سريعة؟' : 'Need Quick Answers?'}
                </h3>
              </div>
              
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {language === 'ar' 
                  ? 'تحقق من الأسئلة الشائعة للحصول على حلول فورية للمشاكل المعتادة.' 
                  : 'Check our frequently asked questions for instant solutions to common issues.'}
              </p>
              
              <a
                href="#/faq"
                className="inline-flex items-center text-blue-400 hover:text-white font-black text-sm group transition-colors"
              >
                {language === 'ar' ? 'زيارة مركز المساعدة' : 'Visit Help Center'}
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
