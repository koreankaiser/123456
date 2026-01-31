import React, { useState, useEffect } from 'react';
import { INITIAL_MEMBERS } from './constants';
import { Member } from './types';
import MemberCard from './components/MemberCard';
import ApplyModal from './components/ApplyModal';
import ConnectModal from './components/ConnectModal';
import AiHelper from './components/AiHelper';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import BookUploadForm from './components/BookUploadForm';
import BookCard from './components/BookCard';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const { user, loading, signInWithKakao, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);
    
    if (data) {
      setBooks(data);
    }
  };

  const handleConnect = (member: Member) => {
    setSelectedMember(member);
    setIsConnectModalOpen(true);
  };

  const handleBookRequest = async (bookId: string) => {
    if (!user) {
      alert('로그인이 필요합니다!');
      return;
    }
    alert('매칭 요청 기능은 곧 추가됩니다! 🎉');
  };

  const marqueeBuddies = [...INITIAL_MEMBERS, ...INITIAL_MEMBERS, ...INITIAL_MEMBERS];

  // 대시보드 페이지 표시
  if (currentPage === 'dashboard') {
    return <Dashboard onBack={() => setCurrentPage('home')} />;
  }

  // 홈 페이지 표시
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
           <h1 className="serif text-xl font-black text-black tracking-tighter">buddy.kr</h1>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <button 
              onClick={() => setCurrentPage(currentPage === 'home' ? 'dashboard' : 'home')}
              className="bg-[#93f261] text-black px-6 py-2.5 rounded-full text-xs font-black tracking-tight hover:scale-105 transition-all active:scale-95 shadow-xl"
            >
              {currentPage === 'home' ? '대시보드' : '홈'}
            </button>
          )}
          <button 
            onClick={() => user ? signOut() : signInWithKakao()}
            className="bg-black text-[#93f261] px-6 py-2.5 rounded-full text-xs font-black tracking-tight hover:scale-105 transition-all active:scale-95 shadow-xl"
          >
            {loading ? 'LOADING...' : user ? 'LOGOUT' : 'LOGIN'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-44 pb-32 overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-40 left-10 w-80 h-80 bg-lime-100 rounded-full blur-[120px] opacity-30 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100 rounded-full blur-[120px] opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
          {/* Centered Green Icon Card - Fixed Alignment */}
          <div className="mb-16 reveal flex justify-center">
            <div className="relative">
               {/* Background Layers - Ensuring Perfect Centering */}
               <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[88%] h-full bg-slate-100 rounded-[2rem] -z-10 opacity-60 shadow-sm"></div>
               <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[75%] h-full bg-slate-50 rounded-[2rem] -z-20 opacity-40 shadow-sm"></div>
               
               <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#93f261] rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_rgba(147,242,97,0.2)] transform hover:rotate-3 transition-transform duration-500">
                 <span className="text-black font-black text-5xl sm:text-6xl tracking-tighter">B</span>
               </div>
            </div>
          </div>

          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-lime-50 border border-lime-100 text-green-600 text-xs font-bold tracking-wide mb-12 reveal">
            책으로 시작하는 만남
          </div>
          
          {/* Title - Updated */}
          <h2 className="text-7xl sm:text-[9rem] font-black text-black mb-12 tracking-tighter leading-[0.8] reveal">
            <span className="block mb-10 opacity-90">함께 읽는</span>
            <span className="text-[#93f261] block transform hover:scale-105 transition-transform duration-700">Buddies.</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-slate-500 text-lg sm:text-xl leading-relaxed font-medium mb-16 reveal break-keep" style={{animationDelay: '0.2s'}}>
            혼자 읽고, 같이 나눠요. <br/>
            책으로 연결되는 사람들.
          </p>
        </div>

        {/* Marquee effect */}
        <div className="animate-scroll-left flex space-x-6 py-10 w-full reveal" style={{animationDelay: '0.4s'}}>
          {marqueeBuddies.map((buddy, idx) => (
            <div key={`${buddy.id}-${idx}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] overflow-hidden shadow-lg border-2 border-white flex-shrink-0 transform transition-transform hover:scale-110 hover:rotate-3 grayscale hover:grayscale-0 duration-500 bg-white">
              <img src={buddy.imageUrl} alt={buddy.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </header>

      {/* Grid Content - Reordered */}
      <main className="flex-grow px-6 sm:px-12 pb-56 max-w-7xl mx-auto w-full">
        {/* 먼저 등록된 책들 보여주기 */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-16 px-4 reveal" style={{animationDelay: '0.5s'}}>
          <h3 className="serif text-5xl font-bold text-black tracking-tight">Book Buddies</h3>
          <p className="text-black text-[11px] font-black tracking-widest uppercase mt-4 sm:mt-0">최근 등록된 책들</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 reveal mb-20" style={{animationDelay: '0.6s'}}>
          {books.length > 0 ? (
            books.map(book => (
              <BookCard key={book.id} book={book} onRequest={handleBookRequest} />
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-slate-400 text-lg">아직 등록된 책이 없습니다 📚</p>
              <p className="text-slate-400 text-sm mt-2">첫 번째로 책을 등록해보세요!</p>
            </div>
          )}
        </div>

        {/* 책 등록 폼은 아래로 */}
        {user && (
          <div className="mt-20">
            <BookUploadForm />
          </div>
        )}
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
