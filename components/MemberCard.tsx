
import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onConnect: (member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onConnect }) => {
  return (
    <div className="group relative bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={member.imageUrl} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <button 
            onClick={() => onConnect(member)}
            className="w-full py-4 bg-white text-stone-900 rounded-xl font-bold text-base tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-stone-50 active:scale-95 flex flex-col items-center leading-tight shadow-xl"
          >
            <span className="serif italic">Let's Buddy</span>
            <span className="text-[9px] opacity-60 font-medium uppercase tracking-widest mt-0.5">대화 신청하기</span>
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-stone-800 leading-none mb-2">{member.name}</h3>
            <div className="flex flex-col space-y-1">
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                {member.nationality} • {member.age}
              </p>
              <div className="flex items-center text-stone-500 text-[10px] font-semibold uppercase tracking-wider">
                <svg className="w-2.5 h-2.5 mr-1 text-stone-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{member.locationKo}</span>
                <span className="mx-1 opacity-30">/</span>
                <span className="text-stone-300 italic font-normal normal-case">{member.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 flex-grow">
          <p className="text-stone-700 text-sm leading-relaxed font-medium">
            {member.introKo}
          </p>
          <p className="text-stone-400 text-xs leading-relaxed italic border-l-2 border-stone-100 pl-3">
            {member.intro}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {member.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-stone-50 text-stone-500 text-[10px] rounded-md uppercase tracking-wider font-bold border border-stone-100">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
