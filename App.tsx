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

    try {
      // 1. 책 정보 가져오기 (책 주인이 누군지 확인)
      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .select('user_id')
        .eq('id', bookId)
        .single();

      if (bookError) throw bookError;

      // 2. 자기 자신의 책에는 신청 불가
      if (bookData.user_id === user.id) {
        alert('자신의 책에는 매칭 신청을 할 수 없습니다! 😅');
        return;
      }

      // 3. 이미 신청했는지 확인
      const { data: existingRequest } = await supabase
        .from('match_requests')
        .select('id')
        .eq('book_id', bookId)
        .eq('from_user_id', user.id)
        .single();

      if (existingRequest) {
        alert('이미 매칭 신청한 책입니다! 📚');
        return;
      }

      // 4. 매칭 요청 저장
      const { error: insertError } = await supabase
        .from('match_requests')
        .insert({
          book_id: bookId,
          from_user_id: user.id,
          to_user_id: bookData.user_id,
          status: 'pending'
        });

      if (insertError) throw insertError;

      alert('매칭 신청이 완료되었습니다! 🎉\n대시보드에서 진행 상황을 확인하세요.');
      
    } catch (error) {
      console.error('매칭 신청 오류:', error);
      alert('매칭 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

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

      {/* Hero Section - Marquee 제거하고 간결하게 */}
      <header className="relative pt-44 pb-20 overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-40 left-10 w-80 h-80 bg-lime-100 rounded-full blur-[120px] opacity-30 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-100 rounded-full blur-[120px] opacity-20 animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
          {/* Centered Green Icon Card */}
          <div className="mb-16 reveal flex justify-center">
            <div className="relative">
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
          
          {/* Title */}
          <h2 className="text-7xl sm:text-[9rem] font-black text-black mb-12 tracking-tighter leading-[0.8] reveal">
            <span className="block mb-10 opacity-90">함께 읽는</span>
            <span className="text-[#93f261] block transform hover:scale-105 transition-transform duration-700">Buddies.</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-slate-500 text-lg sm:text-xl leading-relaxed font-medium reveal break-keep" style={{animationDelay: '0.2s'}}>
            혼자 읽고, 같이 나눠요. <br/>
            책으로 연결되는 사람들.
          </p>
        </div>
      </header>

      {/* How it Works Section - 대폭 개선 */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#93f261] text-sm font-bold tracking-wider uppercase mb-4 block">
              How it Works
            </span>
            <h2 className="text-5xl sm:text-6xl font-black text-black mb-4">
              세 단계로 시작하세요
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              BookBuddy와 함께 책을 매개로 새로운 인연을 만나보세요
            </p>
          </div>

          <div className="space-y-24">
            {/* Step 1 - 왼쪽 이미지, 오른쪽 텍스트 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop" 
                  alt="책 등록하기"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#93f261] rounded-2xl mb-6 shadow-lg">
                  <span className="text-3xl font-black text-black">1</span>
                </div>
                <h3 className="text-4xl font-black text-black mb-4">책 등록하기</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  읽고 싶은 책의 제목과 저자를 입력하고,<br/>
                  만나고 싶은 시간과 장소를 등록하세요.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  카페, 도서관, 공원 등 편한 장소를 선택할 수 있어요.<br/>
                  카카오 오픈채팅 링크를 미리 준비해주세요!
                </p>
              </div>
            </div>

            {/* Step 2 - 오른쪽 이미지, 왼쪽 텍스트 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#93f261] rounded-2xl mb-6 shadow-lg">
                  <span className="text-3xl font-black text-black">2</span>
                </div>
                <h3 className="text-4xl font-black text-black mb-4">매칭 신청하기</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  다른 사람이 등록한 책 중에서<br/>
                  함께 읽고 싶은 책을 찾아보세요.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  마음에 드는 책이 있다면 "함께 읽기 신청" 버튼을 눌러<br/>
                  매칭을 요청할 수 있어요. 상대방이 수락하면 연결됩니다!
                </p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl order-2">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop" 
                  alt="매칭 신청"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>

            {/* Step 3 - 왼쪽 이미지, 오른쪽 텍스트 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop" 
                  alt="오픈채팅 공유"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#93f261] rounded-2xl mb-6 shadow-lg">
                  <span className="text-3xl font-black text-black">3</span>
                </div>
                <h3 className="text-4xl font-black text-black mb-4">오픈채팅으로 만나요</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  매칭이 수락되면 대시보드에서<br/>
                  오픈채팅 링크가 자동으로 공유됩니다.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  채팅방에 들어가서 약속을 잡고,<br/>
                  책을 함께 읽으며 새로운 인연을 만들어보세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BookBuddy Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[#93f261] text-sm font-bold tracking-wider uppercase mb-4 block">
              Vision
            </span>
            <h2 className="text-5xl sm:text-6xl font-black mb-8 leading-tight">
              혼자 읽던 책,<br/>
              함께 나누는 즐거움
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              책은 혼자 읽어도 좋지만, 함께 나눌 때 더 깊은 의미를 갖습니다.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              BookBuddy는 같은 책을 읽고 싶은 사람들을 연결하여<br/>
              새로운 독서 경험을 만들어갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <main className="flex-grow px-6 sm:px-12 pb-56 max-w-7xl mx-auto w-full">
        {/* 등록된 책들 */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-16 px-4 pt-20">
          <h3 className="serif text-5xl font-bold text-black tracking-tight">Book Buddies</h3>
          <p className="text-black text-[11px] font-black tracking-widest uppercase mt-4 sm:mt-0">최근 등록된 책들</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-20">
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

        {/* 책 등록 폼 */}
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
