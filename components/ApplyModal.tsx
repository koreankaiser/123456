
import React, { useState } from 'react';
import { ApplicationFormData } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("개인정보 수집에 동의해주세요. / Please agree to the privacy policy.");
      return;
    }
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative animate-in fade-in zoom-in duration-300 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-stone-300 hover:text-stone-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {!submitted ? (
          <>
            <div className="mb-10">
              <h2 className="serif text-3xl font-bold text-stone-900 mb-3">Buddy 신청하기 <span className="text-stone-300 font-light ml-2 italic text-2xl">Join Us</span></h2>
              <p className="text-stone-500 text-sm leading-relaxed font-light">
                글로벌 커뮤니티의 일원이 되어보세요. <br/>
                <span className="text-stone-400 italic">Be part of our global community in Seoul.</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="flex justify-between items-center mb-2.5 ml-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Name / 이름</span>
                  </label>
                  <input required type="text" className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="Full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="flex justify-between items-center mb-2.5 ml-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Age / 나이</span>
                  </label>
                  <input required type="number" className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="flex justify-between items-center mb-2.5 ml-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nationality / 국적</span>
                  </label>
                  <input required type="text" className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="Nationality" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
                </div>
                <div>
                  <label className="flex justify-between items-center mb-2.5 ml-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Location / 거주 지역</span>
                  </label>
                  <input required type="text" className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="Neighborhood" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              <div className="bg-stone-50 p-6 rounded-3xl space-y-5 border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Admin Review Only / 관리자 확인용</p>
                  <span className="bg-white px-2 py-0.5 rounded text-[8px] text-stone-300 border border-stone-100 uppercase">Secure</span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">Email / 이메일</label>
                  <input required type="email" className="w-full px-5 py-3.5 bg-white border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">Phone / 연락처</label>
                    <input required type="tel" className="w-full px-5 py-3.5 bg-white border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="010-..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">Instagram / 인스타</label>
                    <input required type="text" className="w-full px-5 py-3.5 bg-white border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all text-sm" placeholder="@id" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex justify-between items-center mb-2.5 ml-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">One-line Intro / 소개</span>
                </label>
                <textarea required rows={2} className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-stone-200 focus:outline-none transition-all resize-none text-sm" placeholder="A short sentence that defines you" value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} />
              </div>

              <div>
                <label className="flex justify-between items-center mb-2.5 ml-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Profile Photo / 사진</span>
                </label>
                <div className="relative group">
                  <input required type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files?.[0] || null})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-full px-5 py-8 bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl text-center group-hover:bg-stone-100 transition-all">
                    <span className="text-stone-400 text-sm font-medium">
                      {formData.image ? formData.image.name : 'Click to upload your photo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-stone-50 rounded-2xl">
                <input 
                  id="privacy" 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={() => setAgreed(!agreed)} 
                  className="mt-1 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900"
                />
                <label htmlFor="privacy" className="text-[11px] text-stone-500 leading-relaxed cursor-pointer">
                  개인정보 수집 및 관리자 검토에 동의합니다. (연락처 정보는 리스트 등록 시 노출되지 않으며 오직 관리자 확인용으로만 사용됩니다.) <br/>
                  <span className="text-stone-400 italic">I agree to the privacy policy. Contact info will only be used by the admin for verification.</span>
                </label>
              </div>

              <button 
                disabled={isSubmitting || !agreed} 
                className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all mt-4 shadow-xl shadow-stone-100 disabled:opacity-30 flex flex-col items-center"
              >
                <span>{isSubmitting ? 'Submitting...' : '신청 완료하기'}</span>
                <span className="text-[10px] opacity-60 font-medium">Submit Application</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="w-24 h-24 bg-stone-50 text-stone-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="serif text-3xl font-bold text-stone-800 mb-6">신청 접수 완료! <span className="text-stone-300 font-light block mt-1 italic text-2xl">Thank You</span></h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-12 font-light break-keep">
              운영자가 연락처와 SNS 정보를 확인한 후 <br/>
              멋진 프로필 카드를 제작하여 리스트에 등록해 드릴게요. <br/>
              <span className="text-stone-400 italic block mt-4">We'll review your info and add you to our list soon. Stay tuned!</span>
            </p>
            <button onClick={onClose} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all">
              메인으로 돌아가기 / Back to Main
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
