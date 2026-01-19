
import React, { useState } from 'react';
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

  const handleConnect = (member: Member) => {
    setSelectedMember(member);
    setIsConnectModalOpen(true);
  };

  const closeConnectModal = () => {
    setIsConnectModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const marqueeBuddies = [...INITIAL_MEMBERS, ...INITIAL_MEMBERS, ...INITIAL_MEMBERS];
  const marqueeBuddiesReverse = [...INITIAL_MEMBERS, ...INITIAL_MEMBERS, ...INITIAL_MEMBERS].reverse();

  return (
    <div className="min-h-screen flex flex-col selection:bg-stone-200 bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[60] bg-white/70 backdrop-blur-xl border-b border-stone-100/50 px-8 sm:px-16 py-5 flex justify-between items-center">
        <h1 className="serif text-2xl font-bold text-stone-900 tracking-tighter lowercase">
          buddy
        </h1>
        <button 
          onClick={() => setIsApplyModalOpen(true)}
          className="bg-stone-900 text-stone-50 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-stone-700 transition-all active:scale-95 shadow-sm flex flex-col items-center"
        >
          <span>Buddy 신청하기</span>
          <span className="text-[9px] opacity-60 font-medium">Join Community</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 overflow-hidden bg-white">
        <div className="mb-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="animate-scroll-left flex space-x-8 px-4">
            {marqueeBuddies.map((buddy, idx) => (
              <div key={`${buddy.id}-${idx}`} className="w-20 h-20 sm:w-28 sm:h-28 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 transform hover:scale-110 transition-transform duration-500">
                <img src={buddy.imageUrl} alt={buddy.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-12">
          <p className="text-stone-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-8">
            Global Connections in Seoul
          </p>
          
          <h2 className="text-5xl sm:text-8xl font-extrabold text-stone-900 mb-2 tracking-tighter leading-[0.9]">
            Meet Buddies
          </h2>
          <h2 className="text-5xl sm:text-8xl font-extrabold text-stone-900 mb-10 tracking-tighter leading-[0.9]">
            in <span className="serif italic font-light text-stone-300">South Korea</span>
          </h2>

          <div className="max-w-xl mx-auto mt-10">
            <p className="text-stone-400 text-base sm:text-lg leading-relaxed font-light break-keep">
              이름, 나이, 국적 그리고 한 줄의 소개. <br/>
              <span className="text-stone-300 italic">Name, Age, Nationality, and one line of Intro.</span> <br/>
              타국에서 만들어가는 새로운 이야기들을 기다립니다. <br/>
              <span className="text-stone-300 italic">Waiting for the new stories blooming in a foreign land.</span>
            </p>
          </div>
        </div>

        <div className="mt-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="animate-scroll-right flex space-x-10 px-4">
            {marqueeBuddiesReverse.map((buddy, idx) => (
              <div key={`rev-${buddy.id}-${idx}`} className="w-16 h-16 sm:w-24 sm:h-24 rounded-[1.8rem] overflow-hidden shadow-xl border-4 border-white flex-shrink-0 transform hover:scale-110 transition-transform duration-500">
                <img src={buddy.imageUrl} alt={buddy.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Grid Header */}
      <div className="px-8 sm:px-16 max-w-7xl mx-auto w-full pt-20 mb-16 border-t border-stone-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h3 className="serif text-4xl font-bold text-stone-900 tracking-tight">Browse Buddies <span className="text-stone-300 font-light block sm:inline sm:ml-4 text-2xl">버디 둘러보기</span></h3>
          </div>
          <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            <span>Filter: Recent</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="flex-grow px-8 sm:px-16 pb-56 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
          {INITIAL_MEMBERS.map(member => (
            <MemberCard key={member.id} member={member} onConnect={handleConnect} />
          ))}
        </div>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-12 left-0 right-0 px-6 pointer-events-none flex justify-center z-[50]">
        <div className="bg-stone-900 px-8 py-5 rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex items-center space-x-10 pointer-events-auto transition-all hover:scale-105 active:scale-95 border border-white/10">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {INITIAL_MEMBERS.slice(0, 3).map(m => (
                <img key={m.id} src={m.imageUrl} className="w-8 h-8 rounded-full border-2 border-stone-900 object-cover" alt="" />
              ))}
            </div>
            <p className="text-stone-400 text-[10px] font-bold tracking-widest uppercase">
              <strong className="text-white">{INITIAL_MEMBERS.length} Buddies</strong> Active
            </p>
          </div>
          <div className="h-4 w-[1px] bg-stone-700"></div>
          <button onClick={() => setIsApplyModalOpen(true)} className="text-white text-xs font-bold tracking-widest uppercase hover:text-stone-300 transition-colors">
            Apply Now →
          </button>
        </div>
      </div>

      <AiHelper members={INITIAL_MEMBERS} />

      {/* Footer */}
      <footer className="py-32 bg-stone-50 border-t border-stone-100 px-8 sm:px-16 text-center">
        <div className="max-w-sm mx-auto">
          <h4 className="serif text-2xl font-bold text-stone-800 mb-6">buddy</h4>
          <p className="text-stone-500 text-sm leading-relaxed mb-12 font-light">
            의미 있는 연결을 위한 가장 간결한 방법. <br/>
            당신의 다음 대화 상대를 여기서 찾아보세요.
            <span className="block mt-4 text-stone-400 italic">
              The simplest way for meaningful connections. <br/>
              Find your next conversation partner here.
            </span>
          </p>
          <div className="flex justify-center space-x-8 text-stone-300 text-[10px] font-bold tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-stone-600 transition-colors">About</a>
            <a href="#" className="hover:text-stone-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
      <ConnectModal member={selectedMember} isOpen={isConnectModalOpen} onClose={closeConnectModal} />
    </div>
  );
};

export default App;
