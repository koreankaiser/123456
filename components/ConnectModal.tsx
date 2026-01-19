
import React, { useState } from 'react';
import { Member } from '../types';

interface ConnectModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ member, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative animate-in fade-in zoom-in duration-300 shadow-2xl border border-stone-100">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-stone-300 hover:text-stone-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center space-x-5 mb-10">
              <img src={member.imageUrl} alt={member.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
              <div>
                <h2 className="serif text-3xl font-bold text-stone-900 leading-tight">Let's Buddy! <br/><span className="text-stone-300 font-light italic text-xl">with {member.name}</span></h2>
              </div>
            </div>

            <p className="text-stone-500 text-sm mb-10 leading-relaxed font-light">
              새로운 친구와의 대화를 위해 정보를 남겨주세요. <br/>
              <span className="text-stone-400 italic">Tell us when you are free to chat.</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2.5 ml-1">Your Contact / 연락처</label>
                <input required type="text" className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="Kakao ID or Email" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2.5 ml-1">Available Time / 대화 가능한 시간</label>
                <input required type="text" className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="Ex) Weekdays 6PM~ / 평일 저녁 6시 이후" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-2.5 ml-1">Message / 메시지</label>
                <textarea required rows={3} className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all resize-none text-sm" placeholder="What would you like to talk about?" />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all mt-4 shadow-lg shadow-stone-100 flex flex-col items-center"
              >
                <span>{isSubmitting ? 'Sending...' : '신청하기'}</span>
                <span className="text-[10px] opacity-60 font-medium">Send Request</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="w-24 h-24 bg-stone-50 text-stone-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-stone-100">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="serif text-3xl font-bold text-stone-800 mb-6">전송 완료! <br/><span className="text-stone-300 font-light italic text-2xl">Sent Successfully!</span></h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-12 font-light break-keep">
              운영자가 시간대를 조율한 뒤 <br/>
              남겨주신 연락처로 직접 연락드릴게요. <br/>
              <span className="text-stone-400 italic block mt-4">The admin will check the schedule and contact you soon.</span>
            </p>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all"
            >
              닫기 / Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectModal;
