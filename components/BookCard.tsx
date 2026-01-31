import { useState } from 'react';

interface BookCardProps {
  book: {
    id: string;
    book_title: string;
    book_author: string;
    book_description: string;
    book_cover?: string;
    meeting_date: string;
    location_city: string;
    location_district: string;
    location_detail?: string;
  };
  onRequest: (bookId: string) => void;
}

export default function BookCard({ book, onRequest }: BookCardProps) {
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

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* 책 표지 */}
      <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {book.book_cover ? (
          <img 
            src={book.book_cover} 
            alt={book.book_title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">📚</span>
          </div>
        )}
        
        {/* 장소 뱃지 */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-black">
            📍 {book.location_city}
          </span>
        </div>
      </div>

      {/* 책 정보 */}
      <div className="p-6">
        <h3 className="text-2xl font-black text-black mb-2 line-clamp-1">
          {book.book_title}
        </h3>
        
        <p className="text-slate-500 text-sm font-medium mb-3">
          {book.book_author}
        </p>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {book.book_description}
        </p>

        {/* 만날 시간 & 장소 */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <span>🗓</span>
            <span className="font-medium">{formatDate(book.meeting_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span>📍</span>
            <span className="font-medium">
              {book.location_district}
              {book.location_detail && ` · ${book.location_detail}`}
            </span>
          </div>
        </div>

        {/* 매칭 요청 버튼 */}
        <button
          onClick={() => onRequest(book.id)}
          className="w-full bg-[#93f261] text-black font-black py-3 rounded-full hover:scale-105 transition-all active:scale-95"
        >
          함께 읽기 신청
        </button>
      </div>
    </div>
  );
}
