
import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onConnect: (member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onConnect }) => {
  return (
    <div className="group relative bg-white overflow-hidden rounded-[2.5rem] shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(147,242,97,0.15)] transition-all duration-700 border border-lime-50 flex flex-col h-full transform hover:-translate-y-4">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={member.imageUrl} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <button 
            onClick={() => onConnect(member)}
            className="w-full py-5 bg-[#93f261] text-black rounded-2xl font-black text-sm tracking-tight transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-white active:scale-95 shadow-2xl uppercase"
          >
            Start Chat
          </button>
        </div>
        
        <div className="absolute top-6 left-6 px-4 py-2 glass rounded-2xl shadow-sm border-white/50">
            <span className="text-[10px] font-black text-green-900 uppercase tracking-widest">{member.locationKo.split(' ')[1]}</span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6 flex justify-between items-start">
            <div>
              {/* 이름: 검은색 유지 */}
              <h3 className="text-2xl font-black text-black leading-tight mb-1">{member.name}</h3>
              {/* 국적: 검은색 유지 */}
              <p className="text-black text-[11px] font-black uppercase tracking-[0.2em]">{member.nationality}</p>
            </div>
            <span className="text-slate-300 text-xs font-black italic">#{member.age}</span>
        </div>
        
        {/* 한 줄 소개: 검은색/짙은 회색으로 변경 */}
        <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-2 mb-6 break-keep">
          {member.introKo}
        </p>

        {/* 태그: 검은색 텍스트와 연한 배경 */}
        <div className="mt-auto flex flex-wrap gap-2">
          {member.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-100 text-black text-[9px] rounded-lg uppercase tracking-widest font-black border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
