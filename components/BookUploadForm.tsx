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
