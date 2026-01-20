
import React, { useState } from 'react';
import { Member } from '../types';
import { sendEmail } from '../services/emailService';

interface ConnectModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ member, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestData, setRequestData] = useState({ contact: '', time: '', message: '' });

  if (!isOpen || !member) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendEmail({ target_buddy: member.name, ...requestData, type: 'COFFEE_CHAT_REQUEST' });
      setSubmitted(true);
    } catch (error) {
      alert("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-green-950/20 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-12 relative animate-in fade-in zoom-in duration-500 shadow-2xl border border-lime-100">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-green-600 transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {!submitted ? (
          <>
            <div className="flex flex-col items-center mb-10 text-center">
              <img src={member.imageUrl} className="w-24 h-24 rounded-3xl object-cover shadow-2xl mb-6 border-4 border-[#93f261]" alt="" />
              <h2 className="serif text-3xl font-black text-green-950 leading-tight">Talk with <br/><span className="text-[#93f261]">{member.name}</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input required type="text" className="w-full px-6 py-4 bg-lime-50 border-none rounded-2xl focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all text-sm font-medium" placeholder="Kakao ID or Email" value={requestData.contact} onChange={e => setRequestData({...requestData, contact: e.target.value})} />
              <input required type="text" className="w-full px-6 py-4 bg-lime-50 border-none rounded-2xl focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all text-sm font-medium" placeholder="Preferred Time" value={requestData.time} onChange={e => setRequestData({...requestData, time: e.target.value})} />
              <textarea required rows={3} className="w-full px-6 py-4 bg-lime-50 border-none rounded-2xl focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all resize-none text-sm font-medium" placeholder="What should we talk about?" value={requestData.message} onChange={e => setRequestData({...requestData, message: e.target.value})} />
              <button disabled={isSubmitting} className="w-full py-5 bg-green-950 text-[#93f261] rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl">
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-[#93f261] text-black rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-12">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="serif text-3xl font-black text-green-950 mb-6">Sent!</h2>
            <button onClick={onClose} className="w-full py-4 bg-green-950 text-[#93f261] rounded-2xl font-black text-sm uppercase">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectModal;
