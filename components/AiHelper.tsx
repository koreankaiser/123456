
import React, { useState } from 'react';
import { getMemberRecommendation } from '../services/geminiService';
import { Member } from '../types';

interface AiHelperProps {
  members: Member[];
}

const AiHelper: React.FC<AiHelperProps> = ({ members }) => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setRecommendation('');
    try {
      const result = await getMemberRecommendation(prompt, members);
      setRecommendation(result || '죄송합니다. 적절한 Buddy를 찾지 못했어요. / No buddies found.');
    } catch (error) {
      setRecommendation('오류가 발생했습니다. / Error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.15)] border border-stone-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 bg-stone-900 text-stone-50">
            <h3 className="serif text-xl font-bold leading-tight">Buddy AI <span className="text-stone-500 font-light italic ml-2">Smart Match</span></h3>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              관심사를 적어주시면 가장 잘 어울리는 Buddy를 추천해 드릴게요. <br/>
              <span className="text-stone-400 italic">Tell us your interests, and we'll suggest a perfect Buddy.</span>
            </p>
            <div className="relative group">
              <input 
                type="text"
                placeholder="Ex) Design, Photography, Tech..."
                className="w-full text-sm py-3 px-1 border-b-2 border-stone-100 focus:border-stone-900 focus:outline-none bg-transparent transition-all placeholder:text-stone-300"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
              />
              <button 
                onClick={handleAsk}
                disabled={isLoading}
                className="absolute right-0 bottom-3 text-stone-900 disabled:opacity-30 group-hover:translate-x-1 transition-transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
            
            {isLoading && (
              <div className="flex space-x-1.5 py-2 justify-center">
                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}

            {recommendation && (
              <div className="p-5 bg-stone-50 rounded-2xl text-stone-700 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-start space-x-3">
                  <span className="mt-1 text-stone-400 flex-shrink-0">✨</span>
                  <p className="break-keep">{recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-stone-900 text-stone-50 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? (
           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <div className="relative">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AiHelper;
