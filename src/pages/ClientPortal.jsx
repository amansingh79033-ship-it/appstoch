import React, { useState } from 'react';
import { Video } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import ChatBox from '../components/ChatBox';
import { sampleCandidates } from '../data/sampleData';

const ClientPortal = ({ user, connectRequests, setConnectRequests }) => {
  const [msgs, setMsgs] = useState([
    { sender: 'recruiter', from: user.recruiterName, text: 'Welcome! Top candidates for your position.' }
  ]);
  const [viewMode, setViewMode] = useState('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [stackOrder, setStackOrder] = useState([0, 1]);
  const [gridZIndices, setGridZIndices] = useState([0, 1]);

  const candidates = sampleCandidates.slice(0, 2);

  const handleConnect = (candidate) => {
    const requestId = Date.now();
    setConnectRequests([
      ...connectRequests,
      {
        id: requestId,
        clientName: user.name,
        candidateName: candidate.name,
        candidateId: candidate.id
      }
    ]);
    alert(`Connection request sent to ${user.recruiterName}. Waiting for approval...`);
  };

  const handleStackClick = (candidateId) => {
    const idx = candidates.findIndex(c => c.id === candidateId);
    if (idx !== -1) {
      const newOrder = [idx, ...stackOrder.filter(i => i !== idx)];
      setStackOrder(newOrder);
    }
  };

  const handleGridBringToFront = (candidateId) => {
    const maxZ = Math.max(...gridZIndices);
    const newIndices = [...gridZIndices];
    const idx = candidates.findIndex(c => c.id === candidateId);
    newIndices[idx] = maxZ + 1;
    setGridZIndices(newIndices);
  };

  const renderCandidates = () => {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((c, idx) => (
            <div key={c.id} style={{ zIndex: gridZIndices[idx], position: 'relative' }}>
              <CandidateCard
                candidate={c}
                onConnect={handleConnect}
                isClient={true}
                zIndex={gridZIndices[idx]}
                onBringToFront={handleGridBringToFront}
              />
            </div>
          ))}
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className="space-y-4">
          {candidates.map(c => (
            <div
              key={c.id}
              className="bg-white rounded-xl border-2 border-purple-600 p-6 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{c.name}</h3>
                <p className="text-gray-600">{c.role}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="text-2xl font-bold text-purple-600">{c.score}/100</p>
                </div>
                <button
                  onClick={() => handleConnect(c)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <Video size={18} />
                  REQUEST CONNECT
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (viewMode === 'carousel') {
      const c = candidates[carouselIndex];
      return (
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
            disabled={carouselIndex === 0}
            className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 disabled:bg-gray-300 text-2xl transition-all duration-300 transform hover:scale-110"
          >
            ←
          </button>
          <div className="flex-1 max-w-2xl mx-auto">
            <CandidateCard candidate={c} onConnect={handleConnect} isClient={true} />
            <p className="text-center mt-4 text-gray-600 font-medium">
              Candidate {carouselIndex + 1} of {candidates.length}
            </p>
          </div>
          <button
            onClick={() => setCarouselIndex(Math.min(candidates.length - 1, carouselIndex + 1))}
            disabled={carouselIndex === candidates.length - 1}
            className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 disabled:bg-gray-300 text-2xl transition-all duration-300 transform hover:scale-110"
          >
            →
          </button>
        </div>
      );
    }

    if (viewMode === 'stack') {
      return (
        <div className="relative h-[500px]">
          {stackOrder.map((idx, pos) => {
            const c = candidates[idx];
            const zIndex = stackOrder.length - pos;
            const offset = pos * 20;
            return (
              <div
                key={c.id}
                className="absolute w-full max-w-md left-1/2 transform -translate-x-1/2 transition-all duration-300"
                style={{
                  top: `${offset}px`,
                  zIndex,
                  opacity: pos === 0 ? 1 : 0.7
                }}
              >
                <CandidateCard
                  candidate={c}
                  zIndex={zIndex}
                  onBringToFront={handleStackClick}
                  onConnect={handleConnect}
                  isClient={true}
                />
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl border-2 border-purple-600 p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600">
            Assigned Recruiter: <span className="font-semibold text-purple-600">{user.recruiterName}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Candidates</h2>
              <div className="flex gap-2 bg-white rounded-xl border-2 border-purple-600 p-2 shadow-lg">
                {[
                  { mode: 'grid', icon: '⊞', label: 'Grid' },
                  { mode: 'list', icon: '☰', label: 'List' },
                  { mode: 'carousel', icon: '⇄', label: 'Slide' },
                  { mode: 'stack', icon: '⊡', label: 'Stack' }
                ].map(v => (
                  <button
                    key={v.mode}
                    onClick={() => setViewMode(v.mode)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      viewMode === v.mode
                        ? 'bg-purple-600 text-white transform scale-105'
                        : 'text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{v.icon}</span>
                      <span className="text-xs">{v.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {renderCandidates()}
          </div>
          <ChatBox
            title={`Chat with ${user.recruiterName}`}
            messages={msgs}
            onSendMessage={(text) => setMsgs([...msgs, { sender: 'me', text }])}
            recipientName={user.recruiterName}
            currentUserId={user.name}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
