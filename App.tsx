
import React, { useState, useEffect } from 'react';
import { INITIAL_MEMBERS } from './constants';
import { Member } from './types';
import MemberCard from './components/MemberCard';
import ApplyModal from './components/ApplyModal';
import ConnectModal from './components/ConnectModal';
import AiHelper from './components/AiHelper';

const App: React.FC = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = (member: Member) => {
    setSelectedMember(member);
    setIsConnectModalOpen(true);
  };

  const marqueeBuddies = [...INITIAL_MEMBERS, ...INITIAL_MEMBERS, ...INITIAL_MEMBERS];

  return (
    <div className="min-h-screen flex flex-col selection:bg-lime-200">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 px-6 sm:px-12 py-5 flex justify-between items-center ${
        scrolled ? 'glass py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' : 'bg-transparent'
      }`}>
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-[#93f261] rounded-lg flex items-center justify-center shadow-sm">
             <span className="text-black font-black text-lg">B</span>
           </div>
           <h1 className="serif text-xl font-black text-green-950 tracking-tighter">buddy.kr</h1>
        </div>
        <button 
          onClick={() => setIsApplyModalOpen(true)}
          className="bg-black text-[#93f261] px-6 py-2.5 rounded-full text-xs font-black tracking-tight hover:scale-105 transition-all active:scale-95 shadow-xl"
        >
          JOIN BUDDY
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-44 pb-32 overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-40 left-10 w-80 h-80 bg-lime-100 rounded-full blur-[120px] opacity-30 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100 rounded-full blur-[120px] opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
          {/* Centered Green Icon Card with Layered Effect (Design Inspiration Style) */}
          <div className="mb-14 reveal">
            <div className="relative group">
               {/* Background Layers for Stacked Effect */}
               <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-[85%] h-full bg-slate-100 rounded-[2rem] -z-10 opacity-60"></div>
               <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-[70%] h-full bg-slate-50 rounded-[2rem] -z-20 opacity-40"></div>
               
               <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#93f261] rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform duration-500">
                 <span className="text-black font-black text-5xl sm:text-6xl tracking-tighter italic">B</span>
               </div>
            </div>
          </div>

          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-lime-50 border border-lime-100 text-green-600 text-[10px] font-black tracking-[0.2em] uppercase mb-10 reveal">
            Discover Global Connections
          </div>
          
          <h2 className="text-7xl sm:text-[9.5rem] font-black text-black mb-10 tracking-tighter leading-[0.8] reveal">
            Meet your <br/>
            <span className="text-[#93f261] inline-block mt-2">Buddies.</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-slate-500 text-lg sm:text-xl leading-relaxed font-medium mb-16 reveal break-keep" style={{animationDelay: '0.2s'}}>
            서울에서 활동하는 글로벌 친구들과 <br/>
            가장 트렌디한 커피챗을 시작해보세요.
          </p>
        </div>

        {/* Marquee effect */}
        <div className="animate-scroll-left flex space-x-6 py-10 w-full reveal" style={{animationDelay: '0.4s'}}>
          {marqueeBuddies.map((buddy, idx) => (
            <div key={`${buddy.id}-${idx}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] overflow-hidden shadow-lg border-2 border-white flex-shrink-0 transform transition-transform hover:scale-110 hover:rotate-3 grayscale hover:grayscale-0 duration-500">
              <img src={buddy.imageUrl} alt={buddy.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </header>

      {/* Grid Content */}
      <main className="flex-grow px-6 sm:px-12 pb-56 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-16 px-4 reveal" style={{animationDelay: '0.5s'}}>
          <h3 className="serif text-5xl font-bold text-black tracking-tight">Active Buddies</h3>
          <p className="text-lime-500 text-[11px] font-black tracking-widest uppercase mt-4 sm:mt-0">Recently joined members in Seoul</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 reveal" style={{animationDelay: '0.6s'}}>
          {INITIAL_MEMBERS.map(member => (
            <MemberCard key={member.id} member={member} onConnect={handleConnect} />
          ))}
        </div>
      </main>

      <AiHelper members={INITIAL_MEMBERS} />

      <footer className="py-24 bg-white border-t border-slate-50 px-8 text-center mt-auto">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 bg-black text-[#93f261] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <span className="font-black text-xl">B</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-12 font-medium italic">
            Connecting global souls in the heart of Korea.
          </p>
          <div className="flex justify-center space-x-10 text-slate-300 text-[10px] font-black tracking-[0.3em] uppercase">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
      <ConnectModal member={selectedMember} isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} />
    </div>
  );
};

export default App;
