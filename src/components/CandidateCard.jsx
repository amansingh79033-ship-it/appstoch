import React, { useState, useRef } from 'react';
import { Video, MessageSquare, Download } from 'lucide-react';
import { generateRoomName, generateCV } from '../utils/helpers';

const CandidateCard = ({ candidate, onConnect, isClient = false, zIndex = 0, onBringToFront, onChatClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverColor] = useState(['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)]);
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef(null);

  const handleConnect = (e) => {
    e.stopPropagation();
    if (onConnect) {
      onConnect(candidate);
    } else {
      window.open(`https://meet.jit.si/${generateRoomName(candidate.id)}`, '_blank');
    }
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    if (onChatClick) {
      onChatClick(candidate);
    }
  };

  const handleCardClick = () => {
    setClickCount(prev => prev + 1);

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    clickTimer.current = setTimeout(() => {
      if (clickCount === 0) {
        setIsFlipped(!isFlipped);
      } else if (clickCount === 1) {
        if (onBringToFront) {
          onBringToFront(candidate.id);
        } else {
          setIsFlipped(!isFlipped);
        }
      }
      setClickCount(0);
    }, 250);
  };

  return (
    <div
      className="relative w-full min-h-[320px] cursor-pointer transition-all duration-300"
      style={{ perspective: '1000px', zIndex }}
      onClick={handleCardClick}
    >
      <div
        className="relative w-full h-full transition-transform duration-600 hover:scale-105"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          boxShadow: `0 4px 12px ${hoverColor}40`
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full bg-white rounded-xl border-2 p-6 shadow-lg transition-all"
          style={{
            backfaceVisibility: 'hidden',
            borderColor: hoverColor
          }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{candidate.name}</h3>
          <p className="text-gray-600 mb-4">{candidate.role}</p>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Score</span>
              <span className="text-lg font-bold" style={{ color: hoverColor }}>
                {candidate.score}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Experience</span>
              <span className="text-sm font-medium">{candidate.experience}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {!isClient && onChatClick && (
              <button
                onClick={handleChatClick}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:bg-gray-200"
              >
                <MessageSquare size={18} />
                CHAT
              </button>
            )}
            <button
              onClick={handleConnect}
              className="text-white py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: hoverColor,
                flex: isClient || !onChatClick ? 1 : 1
              }}
            >
              <Video size={18} />
              CONNECT
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 italic mt-2">
            {onBringToFront ? 'Single click to flip • Double click for front' : 'Click to flip me over'}
          </p>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full bg-white rounded-xl border-2 p-6 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: hoverColor
          }}
        >
          <h3 className="text-xl font-semibold mb-4">{candidate.name}</h3>
          <div className="space-y-2 text-sm mb-4">
            <p><span className="font-medium">Email:</span> {candidate.email}</p>
            <p><span className="font-medium">Location:</span> {candidate.location}</p>
            <p><span className="font-medium">Skills:</span> {candidate.skills}</p>
            <p><span className="font-medium">Notes:</span> {candidate.notes}</p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className="font-semibold" style={{ color: hoverColor }}>
                {candidate.recommendation}
              </span>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              generateCV(candidate);
            }}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mb-2 hover:bg-gray-200 hover:shadow-md transform hover:scale-105"
          >
            <Download size={18} />
            Download CV
          </button>
          <button
            onClick={handleConnect}
            className="w-full text-white py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: hoverColor }}
          >
            <Video size={18} />
            CONNECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
