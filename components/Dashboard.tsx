import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import BookEditModal from './BookEditModal';

type TabType = 'myBooks' | 'receivedRequests' | 'sentRequests';

interface Book {
  id: string;
  book_title: string;
  book_author: string;
  book_description: string;
  book_cover?: string;
  meeting_date: string;
  location_city: string;
  location_district: string;
  kakao_openchat_url: string;
  created_at: string;
  user_id: string;
}

interface MatchRequest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  book_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  books: Book;
}

interface DashboardProps {
  onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('myBooks');
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<MatchRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<MatchRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyBooks();
      fetchReceivedRequests();
      fetchSentRequests();
    }
  }, [user]);

  const fetchMyBooks = async () => {
    const { data } = await supabase
      .from('books')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (data) setMyBooks(data);
    setLoading(false);
  };

  const fetchReceivedRequests = async () => {
    const { data } = await supabase
      .from('match_requests')
      .select('*, books(*)')
      .eq('to_user_id', user?.id)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (data) setReceivedRequests(data);
  };

  const fetchSentRequests = async () => {
    const { data } = await supabase
      .from('match_requests')
      .select('*, books(*)')
      .eq('from_user_id', user?.id)
      .order('created_at', { ascending: false });
    
    if (data) setSentRequests(data);
  };

  const handleAcceptRequest = async (requestId: string, bookId: string) => {
    const { error } = await supabase
      .from('match_requests')
      .update({ status: 'accepted' })
      .eq('id', requestId);

    if (!error) {
      alert('매칭을 수락했습니다! 🎉');
      fetchReceivedRequests();
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    const { error } = await supabase
      .from('match_requests')
      .update({ status: 'rejected' })
      .eq('id', requestId);

    if (!error) {
      alert('매칭을 거절했습니다.');
      fetchReceivedRequests();
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (!error) {
      alert('책이 삭제되었습니다.');
      fetchMyBooks();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      timeZone: 'Asia/Seoul',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-400">로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with Back Button */}
        <div className="mb-12 flex items-center gap-4">
          <button
            onClick={onBack}
            className="bg-white px-6 py-3 rounded-xl font-bold text-black hover:bg-slate-100 transition-all shadow-md"
          >
            ← 홈으로
          </button>
          <div>
            <h1 className="text-5xl font-black text-black mb-2">📚 내 대시보드</h1>
            <p className="text-slate-600">책과 매칭을 관리하세요</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-slate-200">
          <button
            onClick={() => setActiveTab('myBooks')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'myBooks'
                ? 'text-black border-b-4 border-[#93f261]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            내 책 ({myBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('receivedRequests')}
            className={`px-6 py-3 font-bold transition-all relative ${
              activeTab === 'receivedRequests'
                ? 'text-black border-b-4 border-[#93f261]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            받은 요청 ({receivedRequests.length})
            {receivedRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {receivedRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('sentRequests')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'sentRequests'
                ? 'text-black border-b-4 border-[#93f261]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            보낸 요청 ({sentRequests.length})
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {loading ? (
            <p className="text-center text-slate-400">로딩 중...</p>
          ) : (
            <>
              {/* 내 책 */}
              {activeTab === 'myBooks' && (
                <div className="space-y-6">
                  {myBooks.length === 0 ? (
                    <p className="text-center text-slate-400 py-12">등록한 책이 없습니다.</p>
                  ) : (
                    myBooks.map(book => (
                      <div key={book.id} className="border-2 border-slate-200 rounded-2xl p-6 hover:border-[#93f261] transition-all">
                        <div className="flex gap-6">
                          {book.book_cover && (
                            <img src={book.book_cover} alt={book.book_title} className="w-24 h-32 object-cover rounded-xl" />
                          )}
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-black mb-2">{book.book_title}</h3>
                            <p className="text-slate-600 mb-2">{book.book_author}</p>
                            <p className="text-sm text-slate-500 mb-3">{book.book_description}</p>
                            <div className="flex gap-4 text-sm text-slate-600">
                              <span>🗓 {formatDate(book.meeting_date)}</span>
                              <span>📍 {book.location_city} {book.location_district}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleEditBook(book)}
                              className="px-4 py-2 bg-[#93f261] text-black rounded-lg hover:bg-[#7de34a] transition-all font-bold"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-bold"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 받은 요청 */}
              {activeTab === 'receivedRequests' && (
                <div className="space-y-6">
                  {receivedRequests.length === 0 ? (
                    <p className="text-center text-slate-400 py-12">받은 요청이 없습니다.</p>
                  ) : (
                    receivedRequests.map(request => (
                      <div key={request.id} className="border-2 border-[#93f261] rounded-2xl p-6 bg-lime-50">
                        <h3 className="text-xl font-black text-black mb-4">
                          📚 "{request.books.book_title}" 매칭 요청
                        </h3>
                        <p className="text-slate-600 mb-4">누군가 이 책으로 만남을 신청했습니다!</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAcceptRequest(request.id, request.book_id)}
                            className="flex-1 bg-[#93f261] text-black font-black py-3 rounded-xl hover:scale-105 transition-all"
                          >
                            ✅ 수락하기
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="flex-1 bg-slate-300 text-black font-bold py-3 rounded-xl hover:bg-slate-400 transition-all"
                          >
                            ❌ 거절하기
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* 보낸 요청 */}
              {activeTab === 'sentRequests' && (
                <div className="space-y-6">
                  {sentRequests.length === 0 ? (
                    <p className="text-center text-slate-400 py-12">보낸 요청이 없습니다.</
