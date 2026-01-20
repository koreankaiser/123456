
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
      // Mapping for the template provided in the prompt
      await sendEmail({ 
        name: formData.name,
        nationality: formData.nationality,
        age: formData.age,
        location: formData.location,
        intro: formData.intro,
        email: formData.email,
        phone: formData.phone,
        instagram: formData.instagram,
        type: 'BUDDY_APPLICATION' 
      });
      setSubmitted(true);
    } catch (error) {
      alert("Error occurred while sending application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-12 relative animate-in fade-in zoom-in duration-500 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[95vh]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-300 hover:text-black transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {!submitted ? (
          <>
            {/* Header Section */}
            <div className="mb-12">
              <h2 className="serif text-5xl font-black text-black mb-4 leading-none tracking-tighter uppercase">
                BECOME A <br/>
                <span className="text-[#93f261]">BUDDY.</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium tracking-tight">당신의 이야기를 서울에 들려주세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input required type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="number" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input required type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Nationality" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                <input required type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Location in Seoul" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input required type="email" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input required type="tel" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>

              <input required type="text" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Instagram ID" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
              
              <textarea required rows={3} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#93f261] focus:outline-none transition-all resize-none text-sm font-bold text-slate-700 placeholder:text-slate-300" placeholder="Tell us about yourself (Interests, Hobbies...)" value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} />

              {/* Checkbox */}
              <div className="flex items-center space-x-3 p-5 bg-slate-50 rounded-2xl">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={() => setAgreed(!agreed)} 
                  className="w-5 h-5 rounded border-slate-200 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                />
                <label className="text-[11px] text-slate-400 leading-relaxed font-bold cursor-pointer">
                  개인정보 수집 및 버디 등록 약관에 동의합니다.
                </label>
              </div>

              {/* Submit Button */}
              <button 
                disabled={isSubmitting || !agreed} 
                className="w-full py-6 bg-black text-[#93f261] rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.02] transition-all disabled:opacity-30 active:scale-95 shadow-2xl mt-2"
              >
                {isSubmitting ? 'PROCESSING...' : 'SUBMIT POSTCARD'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-black text-[#93f261] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl animate-float">
               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="serif text-4xl font-black text-black mb-6 uppercase">Success!</h2>
            <p className="text-slate-400 mb-10 font-medium">관리자 확인 후 개별 연락드리겠습니다.</p>
            <button onClick={onClose} className="w-full py-5 bg-black text-[#93f261] rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
