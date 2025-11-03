import React, { useState } from 'react';

const LeaderCard = ({ name, role, image, bio, linkedin }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverColor] = useState(['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)]);

  return (
    <div
      className="relative w-full cursor-pointer group"
      style={{ perspective: '1500px', minHeight: '380px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-all duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '380px'
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            border: `2px solid ${hoverColor}`,
            minHeight: '380px'
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center p-6">
            <div
              className="absolute top-0 left-0 right-0 h-20 opacity-5"
              style={{ backgroundColor: hoverColor }}
            ></div>

            <div
              className="relative w-32 h-32 rounded-full mb-4 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500"
              style={{
                border: `3px solid ${hoverColor}`,
                boxShadow: `0 8px 25px ${hoverColor}30`
              }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{name}</h3>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-md"
                style={{ backgroundColor: hoverColor }}
              >
                {role}
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center gap-2 text-gray-400 text-xs animate-pulse">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Click to discover more
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 bg-white rounded-xl shadow-xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            border: `2px solid ${hoverColor}`,
            minHeight: '380px'
          }}
        >
          <div className="h-full flex flex-col p-5 relative">
            <div
              className="absolute top-0 left-0 right-0 h-16 opacity-5"
              style={{ backgroundColor: hoverColor }}
            ></div>

            <div className="relative z-10 mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: hoverColor }}
              >
                {role}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar mb-3">
              <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
            </div>

            <div className="flex gap-2 pt-3 border-t" style={{ borderColor: `${hoverColor}30` }}>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: hoverColor }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            <p className="text-center text-xs text-gray-400 italic mt-2">Click to flip back</p>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${hoverColor};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${hoverColor}dd;
        }
      `}</style>
    </div>
  );
};

export default LeaderCard;
