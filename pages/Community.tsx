
import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from '@firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, MessageCircle, Crown, ShieldCheck, Sparkles } from 'lucide-react';
import { User } from '../types';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: any;
  isAdmin?: boolean;
}

interface CommunityProps {
  user: User | null;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'), limit(100));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      setMessages(msgs);
    }, (err) => {
      console.error(err);
      setError(language === 'ar' ? "فشل تحميل الرسائل." : "Failed to load messages.");
    });

    return () => unsubscribe();
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: user.id,
        userName: user.fullName,
        timestamp: serverTimestamp(),
        isAdmin: user.role === 'admin'
      });
      setNewMessage('');
    } catch (err) {
      console.error(err);
      setError(language === 'ar' ? "فشل إرسال الرسالة." : "Failed to send message.");
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-8 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col h-[calc(100vh-140px)]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-500/5">
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-start">
              <h1 className="text-lg font-black text-white leading-none">{t('community.title')}</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{t('community.subtitle')}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400">{t('community.online')}</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative">
          <div className="absolute inset-0 chat-bg-pattern opacity-20 pointer-events-none"></div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar relative z-10">
            {error && (
              <div className="p-3 bg-red-500/10 text-red-400 text-center rounded-xl text-xs font-bold border border-red-500/20">
                {error}
              </div>
            )}
            
            {messages.length === 0 && !error && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3 opacity-40">
                <Sparkles className="w-10 h-10" />
                <p className="text-sm font-bold">{t('community.start_chat')}</p>
              </div>
            )}

            {messages.map((message) => {
              const isMe = message.userId === user?.id;
              const isAdmin = message.isAdmin;
              
              return (
                <div key={message.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] group text-start`}>
                    {!isMe && (
                      <div className="flex items-center gap-1.5 mb-1 mx-2">
                        {isAdmin && <Crown className="w-3 h-3 text-yellow-500 fill-current" />}
                        <span className={`text-[10px] font-black uppercase tracking-wider ${isAdmin ? 'text-yellow-500' : 'text-blue-400'}`}>
                          {message.userName}
                        </span>
                        {isAdmin && <span className="bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded text-[8px] font-black">ADMIN</span>}
                      </div>
                    )}
                    
                    <div className={`
                      px-4 py-2.5 rounded-2xl relative shadow-sm transition-all
                      ${isMe 
                        ? 'bg-blue-600 text-white rounded-be-none' 
                        : isAdmin 
                          ? 'bg-slate-800 border-2 border-yellow-500/30 text-white rounded-bs-none'
                          : 'bg-slate-800 text-slate-200 rounded-bs-none border border-slate-700'}
                    `}>
                      <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <div className={`text-[9px] mt-1 flex items-center gap-1 justify-end opacity-50 font-bold`}>
                        {formatTime(message.timestamp)}
                        {isMe && <ShieldCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-950/40 backdrop-blur-md border-t border-slate-800/50 relative z-10">
            <form onSubmit={sendMessage} className="flex gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('community.placeholder')}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all text-xs placeholder:text-slate-600 shadow-inner"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center active:scale-95"
              >
                <Send className="w-4 h-4 ltr:rotate-0 rtl:rotate-180" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
