import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BookUploadForm() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [openchatUrl, setOpenchatUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setMessage('로그인이 필요합니다.');
        return;
      }

      const { error } = await supabase
        .from('books')
        .insert([
          {
            user_id: user.id,
            book_title: bookTitle,
            book_author: bookAuthor,
            book_cover: bookCover,
            kakao_openchat_url: openchatUrl,
          }
        ]);

      if (error) throw error;

      setMessage('책이 등록되었습니다! 🎉');
      // 폼 초기화
      setBookTitle('');
      setBookAuthor('');
      setBookCover('');
      setOpenchatUrl('');
    } catch (error: any) {
      setMessage(`에러: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        <h2 className="text-3xl font-black text-white mb-6">📚 책 등록하기</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 책 제목 */}
          <div>
            <label className="block text-white font-bold mb-2">책 제목</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#93f261]"
              placeholder="예: 데미안"
            />
          </div>

          {/* 작가 */}
          <div>
            <label className="block text-white font-bold mb-2">작가</label>
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#93f261]"
              placeholder="예: 헤르만 헤세"
            />
          </div>

          {/* 표지 이미지 URL */}
          <div>
            <label className="block text-white font-bold mb-2">표지 이미지 URL (선택)</label>
            <input
              type="url"
              value={bookCover}
              onChange={(e) => setBookCover(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#93f261]"
              placeholder="https://..."
            />
            {bookCover && (
              <img src={bookCover} alt="책 표지 미리보기" className="mt-4 w-32 h-48 object-cover rounded-lg" />
            )}
          </div>

          {/* 오픈채팅 URL */}
          <div>
            <label className="block text-white font-bold mb-2">카카오 오픈채팅 URL</label>
            <input
              type="url"
              value={openchatUrl}
              onChange={(e) => setOpenchatUrl(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#93f261]"
              placeholder="https://open.kakao.com/..."
            />
          </div>

          {/* 등록 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#93f261] text-black font-black py-4 rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '등록 중...' : '책 등록하기'}
          </button>

          {/* 메시지 */}
          {message && (
            <div className={`text-center font-bold ${message.includes('에러') ? 'text-red-400' : 'text-[#93f261]'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
