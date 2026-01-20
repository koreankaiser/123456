
import React, { useState } from 'react';
import { ApplicationFormData } from '../types';
import { sendEmail } from '../services/emailService';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    age: '',
    nationality: '',
    location: '',
    intro: '',
    email: '',
    phone: '',
    instagram: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the terms.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendEmail({ ...formData, type: 'BUDDY_APPLICATION' });
      setSubmitted(true);
    } catch (error) {
      alert("Error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 relative animate-in fade-in zoom-in duration-500 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-black transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {!submitted ? (
          <>
            <div className="mb-14">
              <h2 className="serif text-4xl font-black text-black mb-4 leading-none uppercase tracking-tighter">Become a <br/><span className="text-[#93f261]">Buddy.</span></h2>
              <p className="text-slate-400 text-sm font-medium tracking-tight">당신의 이야기를 서울에 들려주세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" className="w-full px-6 py-4 bg-[#f9f9f9] border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="number" className="w-full px-6 py-4 bg-[#f9f9f9] border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
              </div>
              <input required type="text" className="w-full px-6 py-4 bg-[#f9f9f9] border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold" placeholder="Nationality" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
              <input required type="email" className="w-full px-6 py-4 bg-[#f9f9f9] border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <textarea required rows={2} className="w-full px-6 py-4 bg-[#f9f9f9] border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all resize-none text-sm font-bold" placeholder="Tell us about yourself" value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} />

              <div className="flex items-start space-x-3 p-5 bg-[#f9f9f9] rounded-2xl">
                <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="mt-1 w-5 h-5 rounded border-slate-200 text-black focus:ring-black" />
                <label className="text-[11px] text-slate-400 leading-relaxed font-medium">개인정보 수집 및 버디 등록 약관에 동의합니다.</label>
              </div>

              <button 
                disabled={isSubmitting || !agreed} 
                className="w-full py-6 bg-black text-[#93f261] rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] transition-all disabled:opacity-30 active:scale-95 shadow-2xl"
              >
                {isSubmitting ? 'Processing...' : 'Submit Postcard'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-black text-[#93f261] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl animate-float">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="serif text-4xl font-black text-black mb-6 uppercase">Success!</h2>
            <button onClick={onClose} className="w-full py-5 bg-black text-[#93f261] rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
