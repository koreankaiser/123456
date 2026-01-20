
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
      setRecommendation(result || 'No buddy found.');
    } catch (error) {
      setRecommendation('Error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-32 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-80 sm:w-96 glass rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-white overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-700">
          <div className="p-10 bg-black text-[#93f261]">
            <h3 className="serif text-3xl font-black leading-tight uppercase tracking-tighter">Buddy <br/>Intelligence</h3>
          </div>
          <div className="p-10 space-y-8 bg-white">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Find someone by interest..."
                className="w-full text-sm py-5 border-b-2 border-slate-100 focus:border-black focus:outline-none bg-transparent transition-all placeholder:text-slate-300 font-bold"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
              />
              <button onClick={handleAsk} disabled={isLoading} className="absolute right-0 bottom-5 text-black disabled:opacity-30">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            
            {isLoading && (
              <div className="flex space-x-2 py-4 justify-center">
                <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}

            {recommendation && (
              <div className="p-8 bg-[#f8fbfa] rounded-[2rem] text-slate-800 text-sm leading-relaxed animate-in fade-in duration-700 border border-[#93f261]/20 font-medium italic break-keep">
                "{recommendation}"
              </div>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-black text-[#93f261] rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-float border border-[#93f261]/20"
      >
        {isOpen ? (
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        )}
      </button>
    </div>
  );
};

export default AiHelper;
