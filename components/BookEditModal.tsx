import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
}

interface BookEditModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BookEditModal({ book, isOpen, onClose, onUpdate }: BookEditModalProps) {
  const [formData, setFormData] = useState({
    book_title: '',
    book_author: '',
    book_description: '',
    book_cover: '',
    meeting_date: '',
    location_city: '',
    location_district: '',
    kakao_openchat_url: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      // UTC 시간을 로컬 시간으로 변환하여 datetime-local input에 맞게 설정
      const date = new Date(book.meeting_date);
      const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16); // "YYYY-MM-DDTHH:mm" 형식

      setFormData({
        book_title: book.book_title,
        book_author: book.book_author,
        book_description: book.book_description,
        book_cover: book.book_cover || '',
        meeting_date: localDateTime,
        location_city: book.location_city,
        location_district: book.location_district,
        kakao_openchat_url: book.kakao_openchat_url
      });
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    setLoading(true);

    // datetime-local 값을 ISO 형식으로 변환
    const localDateTime = new Date(formData.meeting_date);
    const meetingDateTime = localDateTime.toISOString();

    const { error } = await supabase
      .from('books')
      .update({
        ...formData,
        meeting_date: meetingDateTime
      })
      .eq('id', book.id);

    if (error) {
      alert('수정 실패: ' + error.message);
    } else {
      alert('책 정보가 수정되었습니다! ✅');
      onUpdate();
      onClose();
    }

    setLoading(false);
  };

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-black">책 정보 수정</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-black text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">책 제목 *</label>
            <input
              type="text"
              value={formData.book_title}
              onChange={(e) => setFormData({ ...formData, book_title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">저자 *</label>
            <input
              type="text"
              value={formData.book_author}
              onChange={(e) => setFormData({ ...formData, book_author: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">책 소개 *</label>
            <textarea
              value={formData.book_description}
              onChange={(e) => setFormData({ ...formData, book_description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">책 표지 URL</label>
            <input
              type="url"
              value={formData.book_cover}
              onChange={(e) => setFormData({ ...formData, book_cover: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2">도시 *</label>
              <input
                type="text"
                value={formData.location_city}
                onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2">구/동 *</label>
              <input
                type="text"
                value={formData.location_district}
                onChange={(e) => setFormData({ ...formData, location_district: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">만날 날짜/시간 *</label>
            <input
              type="datetime-local"
              value={formData.meeting_date}
              onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">카카오 오픈채팅 URL *</label>
            <input
              type="url"
              value={formData.kakao_openchat_url}
              onChange={(e) => setFormData({ ...formData, kakao_openchat_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#93f261] outline-none"
              placeholder="https://open.kakao.com/o/..."
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold text-black bg-slate-200 hover:bg-slate-300 transition-all"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl font-bold text-black bg-[#93f261] hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? '수정 중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
