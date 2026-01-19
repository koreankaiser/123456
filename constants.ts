
import { Member } from './types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Lucas Miller',
    age: 28,
    nationality: 'Germany',
    location: 'Gangnam-gu, Seoul',
    locationKo: '서울 강남구',
    intro: 'Software architect passionate about clean code and specialty coffee. Let\'s talk systems over an espresso.',
    introKo: '클린 코드와 스페셜티 커피에 진심인 소프트웨어 아키텍트입니다. 에스프레소 한 잔과 함께 시스템 설계를 이야기해요.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    tags: ['Tech', 'Architecture', 'Coffee']
  },
  {
    id: '2',
    name: 'Elena Rossi',
    age: 31,
    nationality: 'Italy',
    location: 'Itaewon, Seoul',
    locationKo: '서울 이태원',
    intro: 'Art historian and creative director. I love discussing the intersection of classical art and modern UI design.',
    introKo: '미술사학자이자 크리에이티브 디렉터입니다. 고전 미술과 현대 UI 디자인의 접점에 대해 이야기하는 것을 좋아해요.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    tags: ['Art', 'Design', 'History']
  },
  {
    id: '3',
    name: 'Liam O\'Connor',
    age: 25,
    nationality: 'Ireland',
    location: 'Yeonhui-dong, Seoul',
    locationKo: '서울 연희동',
    intro: 'Travel writer and digital nomad currently exploring Seoul. Looking for buddies to share hidden city gems.',
    introKo: '서울을 탐험 중인 여행 작가이자 디지털 노마드입니다. 도시의 숨겨진 보석 같은 장소들을 공유할 버디를 찾아요.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    tags: ['Writing', 'Travel', 'Nomad']
  },
  {
    id: '4',
    name: 'Sofia Fernandez',
    age: 29,
    nationality: 'Spain',
    location: 'Hannam-dong, Seoul',
    locationKo: '서울 한남동',
    intro: 'Marketing strategist with a love for spicy food and sustainable fashion. Always up for a deep dive into branding.',
    introKo: '매운 음식과 지속 가능한 패션을 사랑하는 마케팅 전략가입니다. 브랜드 전략에 대해 깊이 있는 대화를 나누고 싶어요.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    tags: ['Marketing', 'Fashion', 'Strategy']
  },
  {
    id: '5',
    name: 'Oliver Smith',
    age: 34,
    nationality: 'United Kingdom',
    location: 'Seongsu-dong, Seoul',
    locationKo: '서울 성수동',
    intro: 'UX Researcher obsessed with user psychology. I enjoy dissecting why we interact with apps the way we do.',
    introKo: '사용자 심리에 몰두하는 UX 리서처입니다. 우리가 왜 특정한 방식으로 앱과 상호작용하는지 분석하는 것을 즐깁니다.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    tags: ['UX', 'Psychology', 'Research']
  },
  {
    id: '6',
    name: 'Anya Sokolov',
    age: 27,
    nationality: 'Ukraine',
    location: 'Mapo-gu, Seoul',
    locationKo: '서울 마포구',
    intro: 'Frontend developer and amateur photographer. Let\'s discuss React performance or the best lighting for portraits.',
    introKo: '프론트엔드 개발자이자 아마추어 사진작가입니다. 리액트 성능이나 인물 사진을 위한 최고의 조명에 대해 대화해요.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    tags: ['Coding', 'Photo', 'React']
  }
];
