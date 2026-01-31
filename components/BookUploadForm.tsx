import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BookUploadForm() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationDistrict, setLocationDistrict] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [openchatUrl, setOpenchatUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

      // 단순하게 문자열만 합치기
      const meetingDateTime = `${meetingDate}T${meetingTime}:00`;

      const { error } = await supabase
        .from('books')
        .insert([
          {
            user_id: user.id,
            book_title: bookTitle,
            book_author: bookAuthor,
            book_description: bookDescription,
            book_cover: bookCover,
            meeting_date: meetingDateTime,
            location_city: locationCity,
            location_district: locationDistrict,
            location_detail: locationDetail,
            kakao_openchat_url: openchatUrl,
          }
        ]);

      if (error) throw error;

      setMessage('책이 등록되었습니다! 🎉');
      // 폼 초기화
      setBookTitle('');
      setBookAuthor('');
      setBookDescription('');
      setBookCover('');
      setMeetingDate('');
      setMeetingTime('');
      setLocationCity('');
      setLocationDistrict('');
      setLocationDetail('');
      setOpenchatUrl('');
      
      // 페이지 새로고침으로 책 목록 업데이트
      window.location.reload();
    } catch (error: any) {
      setMessage(`에러: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#93f261] rounded-2xl flex items-center justify-center">
            <span className="text-3xl">📚</span>
          </div>
          <h2 className="text-3xl font-black text-black">책 등록하기</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 책 제목 */}
          <div>
            <label className="block text-black font-bold mb-2">책 제목 *</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
              placeholder="예: 데미안"
            />
          </div>

          {/* 작가 */}
          <div>
            <label className="block text-black font-bold mb-2">작가 *</label>
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
              placeholder="예: 헤르만 헤세"
            />
          </div>

          {/* 책 소개 */}
          <div>
            <label className="block text-black font-bold mb-2">만나서 나눌 책 내용 간단히 한 줄 소개 *</label>
            <textarea
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent resize-none"
              placeholder="예: 자아를 찾아가는 소년의 성장 이야기를 함께 나누고 싶어요"
            />
          </div>

          {/* 책 이미지 */}
          <div>
            <label className="block text-black font-bold mb-2">책 이미지 추가 (선택)</label>
            <div className="flex items-start gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="w-full px-4 py-3 rounded-xl bg-white border-2 border-dashed border-slate-300 text-slate-500 hover:border-[#93f261] transition-all text-center">
                  {bookCover ? '✅ 이미지 선택됨' : '📷 이미지 선택 또는 URL 입력'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <input
              type="url"
              value={bookCover}
              onChange={(e) => setBookCover(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent mt-2"
              placeholder="또는 이미지 URL 입력"
            />
            {bookCover && (
              <div className="mt-4 flex justify-center">
                <img src={bookCover} alt="책 표지 미리보기" className="w-40 h-56 object-cover rounded-xl shadow-lg" />
              </div>
            )}
          </div>

          {/* 만날 날짜 & 시간 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-bold mb-2">만날 날짜 *</label>
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-black font-bold mb-2">만날 시간 *</label>
              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
              />
            </div>
          </div>

          {/* 장소 */}
          <div>
            <label className="block text-black font-bold mb-2">장소 *</label>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
                placeholder="도시 (예: 서울)"
              />
              <input
                type="text"
                value={locationDistrict}
                onChange={(e) => setLocationDistrict(e.target.value)}
                required
                className="px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
                placeholder="구 (예: 강남구)"
              />
            </div>
            <input
              type="text"
              value={locationDetail}
              onChange={(e) => setLocationDetail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
              placeholder="상세 장소 (예: 스타벅스 강남역점) - 선택"
            />
          </div>

          {/* 오픈채팅 URL */}
          <div>
            <label className="block text-black font-bold mb-2">카카오 오픈채팅 URL (매칭 시 제공) *</label>
            <input
              type="url"
              value={openchatUrl}
              onChange={(e) => setOpenchatUrl(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-black focus:outline-none focus:ring-2 focus:ring-[#93f261] focus:border-transparent"
              placeholder="https://open.kakao.com/..."
            />
            <p className="text-sm text-slate-500 mt-2">💡 매칭 수락 시 상대방에게 자동으로 공유됩니다</p>
          </div>

          {/* 등록 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#93f261] text-black font-black py-4 rounded-full hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            {loading ? '등록 중...' : '📚 책 등록하기'}
          </button>

          {/* 메시지 */}
          {message && (
            <div className={`text-center font-bold p-4 rounded-xl ${message.includes('에러') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
