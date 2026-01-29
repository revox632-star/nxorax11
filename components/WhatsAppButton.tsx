
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "+201009285935"; // Replace with actual support number
  const message = encodeURIComponent("Hello NEXORAX Support, I have a question.");

  return (
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] whatsapp-float group"
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-2xl transition-transform hover:scale-110">
          <svg className="w-9 h-9 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.853.448-1.271.607-1.445.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.101-.177.211-.077.383.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.088.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
