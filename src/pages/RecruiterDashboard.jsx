import React, { useState, useRef } from 'react';
import { Users, Check, Activity, Upload, Shield, Copy, X, MessageSquare, Video } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import ChatBox from '../components/ChatBox';
import { sampleCandidates } from '../data/sampleData';
import { generateAccessToken, generateRoomName } from '../utils/helpers';

const RecruiterDashboard = ({
  user,
  connectRequests,
  setConnectRequests,
  demoRequests,
  setDemoRequests,
  globalChatMessages,
  setGlobalChatMessages
}) => {
  const [candidates, setCandidates] = useState(sampleCandidates);
  const [showModal, setShowModal] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [stackOrder, setStackOrder] = useState([0, 1, 2, 3]);
  const [gridZIndices, setGridZIndices] = useState(sampleCandidates.map((_, i) => i));
  const [clientForm, setClientForm] = useState({ clientName: '', pocName: '', pocEmail: '', pocPhone: '', company: '' });
  const [activeChatCandidate, setActiveChatCandidate] = useState(null);
  const [showCandidateChat, setShowCandidateChat] = useState(false);
  const [uploadedCandidates, setUploadedCandidates] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [showAccessTokens, setShowAccessTokens] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState([]);
  const fileInputRef = useRef(null);

  const recruiterChats = {
    clients: globalChatMessages.filter(
      m => m.sender === 'client' || (m.from === user.id && m.to === 'TechCorp HR')
    ),
    candidates: globalChatMessages.filter(m => m.sender === 'candidate' || (m.from === user.id && m.sender === 'recruiter'))
  };

  const handleGenerateToken = () => {
    setShowClientForm(true);
  };

  const handleClientFormSubmit = () => {
    if (!clientForm.clientName.trim()) {
      alert('Client Name is required!');
      return;
    }
    const newCode = generateAccessToken();
    setCode(newCode);
    setShowClientForm(false);
    setShowModal(true);
    setCopied(false);
    alert(`Token generated for ${clientForm.clientName}. Client details saved.`);
    setClientForm({ clientName: '', pocName: '', pocEmail: '', pocPhone: '', company: '' });
  };

  const handleStackClick = candidateId => {
    const idx = candidates.findIndex(c => c.id === candidateId);
    if (idx !== -1) {
      const newOrder = [idx, ...stackOrder.filter(i => i !== idx)];
      setStackOrder(newOrder);
    }
  };

  const handleGridBringToFront = candidateId => {
    const maxZ = Math.max(...gridZIndices);
    const newIndices = [...gridZIndices];
    const idx = candidates.findIndex(c => c.id === candidateId);
    newIndices[idx] = maxZ + 1;
    setGridZIndices(newIndices);
  };

  const handleCandidateChat = candidate => {
    setActiveChatCandidate(candidate);
    setShowCandidateChat(true);
  };

  const parseCandidateData = text => {
    const lines = text
      .trim()
      .split('\n')
      .filter(line => line.trim());
    const candidates = [];
    let idCounter = Date.now();

    if (lines[0].includes(',') || lines[0].includes('\t')) {
      const separator = lines[0].includes(',') ? ',' : '\t';
      const headers = lines[0]
        .toLowerCase()
        .split(separator)
        .map(h => h.trim());

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(separator).map(v => v.trim());
        const candidate = {
          id: idCounter++,
          name: values[headers.indexOf('name')] || 'Unknown',
          role: values[headers.indexOf('role')] || values[headers.indexOf('position')] || 'Position TBD',
          email: values[headers.indexOf('email')] || 'email@example.com',
          location: values[headers.indexOf('location')] || 'Location TBD',
          experience: values[headers.indexOf('experience')] || values[headers.indexOf('years')] || '0 years',
          score: parseInt(values[headers.indexOf('score')]) || Math.floor(Math.random() * 30) + 70,
          skills: values[headers.indexOf('skills')] || 'Various skills',
          notes: values[headers.indexOf('notes')] || 'No additional notes',
          recommendation: values[headers.indexOf('recommendation')] || 'Under Review'
        };
        candidates.push(candidate);
      }
    } else {
      lines.forEach(line => {
        const candidate = {
          id: idCounter++,
          name: line.substring(0, 50) || 'Candidate',
          role: 'Position TBD',
          email: 'email@example.com',
          location: 'Location TBD',
          experience: '0 years',
          score: Math.floor(Math.random() * 30) + 70,
          skills: 'Skills to be updated',
          notes: line,
          recommendation: 'Under Review'
        };
        candidates.push(candidate);
      });
    }

    return candidates;
  };

  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const newCandidates = parseCandidateData(text);
      setUploadedCandidates(newCandidates);
      setShowUploadModal(true);
    };
    reader.readAsText(file);
  };

  const handlePasteUpload = () => {
    if (!pasteText.trim()) {
      alert('Please paste candidate data first');
      return;
    }
    const newCandidates = parseCandidateData(pasteText);
    setUploadedCandidates(newCandidates);
    setPasteText('');
    setShowUploadModal(true);
  };

  const handleAddUploadedCandidates = () => {
    const tokens = uploadedCandidates.map(candidate => ({
      name: candidate.name,
      email: candidate.email,
      token: `CAND${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    }));

    setCandidates([...candidates, ...uploadedCandidates]);

    const newIndices = [...gridZIndices, ...uploadedCandidates.map((_, i) => gridZIndices.length + i)];
    setGridZIndices(newIndices);

    const newStackOrder = [...stackOrder, ...uploadedCandidates.map((_, i) => candidates.length + i)];
    setStackOrder(newStackOrder);

    setGeneratedTokens(tokens);
    setShowUploadModal(false);
    setShowAccessTokens(true);
    setUploadedCandidates([]);
  };

  const handleConnectRequest = (request, approved) => {
    if (approved) {
      window.open(`https://meet.jit.si/${generateRoomName(request.candidateId)}`, '_blank');
    }
    setConnectRequests(connectRequests.filter(r => r.id !== request.id));
  };

  const handleDemoRequest = (request, action) => {
    if (action === 'approve') {
      const roomName = `FlowwDemo${Date.now()}`;
      window.open(`https://meet.jit.si/${roomName}`, '_blank');
      alert(`Demo call started! Room: ${roomName}`);
    }
    setDemoRequests(demoRequests.filter(r => r.id !== request.id));
  };

  const renderCandidates = () => {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidates.map((c, idx) => (
            <div key={c.id} style={{ zIndex: gridZIndices[idx], position: 'relative' }}>
              <CandidateCard
                candidate={c}
                zIndex={gridZIndices[idx]}
                onBringToFront={handleGridBringToFront}
                onChatClick={handleCandidateChat}
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
                  onClick={() => handleCandidateChat(c)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageSquare size={18} />
                  CHAT
                </button>
                <button
                  onClick={() => window.open(`https://meet.jit.si/${generateRoomName(c.id)}`, '_blank')}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <Video size={18} />
                  CONNECT
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (viewMode === 'table') {
      return (
        <div className="bg-white rounded-xl border-2 border-purple-600 shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold">Name</th>
                <th className="text-left py-4 px-6 font-semibold">Role</th>
                <th className="text-left py-4 px-6 font-semibold">Score</th>
                <th className="text-left py-4 px-6 font-semibold">Experience</th>
                <th className="text-center py-4 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(c => (
                <tr key={c.id} className="border-t hover:bg-purple-50 transition-all duration-200">
                  <td className="py-4 px-6 font-medium">{c.name}</td>
                  <td className="py-4 px-6">{c.role}</td>
                  <td className="py-4 px-6">
                    <span className="text-purple-600 font-bold">{c.score}/100</span>
                  </td>
                  <td className="py-4 px-6">{c.experience}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleCandidateChat(c)}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105 mr-2"
                    >
                      <MessageSquare size={16} />
                      CHAT
                    </button>
                    <button
                      onClick={() => window.open(`https://meet.jit.si/${generateRoomName(c.id)}`, '_blank')}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 inline-flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                    >
                      <Video size={16} />
                      CONNECT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <CandidateCard candidate={c} onChatClick={handleCandidateChat} />
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
          {stackOrder.slice(0, candidates.length).map((idx, pos) => {
            const c = candidates[idx];
            if (!c) return null;
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
                  onChatClick={handleCandidateChat}
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
        <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-8">Room ID: REC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>

        {demoRequests.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Demo Requests</h3>
            {demoRequests.map(req => (
              <div key={req.id} className="bg-white rounded-lg p-4 mb-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {req.name} from {req.company}
                  </p>
                  <p className="text-sm text-gray-600">
                    {req.email} • {req.phone}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDemoRequest(req, 'approve')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Join Call
                  </button>
                  <button
                    onClick={() => handleDemoRequest(req, 'deny')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {connectRequests.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-yellow-900 mb-4">Connection Requests</h3>
            {connectRequests.map(req => (
              <div key={req.id} className="bg-white rounded-lg p-4 mb-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {req.clientName} wants to connect with {req.candidateName}
                  </p>
                  <p className="text-sm text-gray-600">Candidate ID: {req.candidateId}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleConnectRequest(req, true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleConnectRequest(req, false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl border-2 border-purple-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Total</span>
              <Users className="text-purple-600" size={24} />
            </div>
            <div className="text-4xl font-bold">{candidates.length}</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-green-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Hired</span>
              <Check className="text-green-600" size={24} />
            </div>
            <div className="text-4xl font-bold">2</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-orange-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Pending</span>
              <Activity className="text-orange-600" size={24} />
            </div>
            <div className="text-4xl font-bold">2</div>
          </div>
          <div className="bg-white rounded-xl border-2 border-red-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Rejected</span>
            </div>
            <div className="text-4xl font-bold">0</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl border-2 border-purple-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload size={24} className="text-purple-600" />
              Upload Candidates
            </h3>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.txt,.docx" className="hidden" />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:bg-purple-50 cursor-pointer transition-all duration-300 mb-4"
            >
              <Upload size={40} className="text-purple-600 mx-auto mb-3" />
              <p className="text-gray-600 font-medium mb-1">Click to upload</p>
              <p className="text-xs text-gray-500">CSV, TXT, or DOCX</p>
            </div>
            <div className="space-y-2">
              <textarea
                value={pasteText}
                onChange={e => setPasteText(e.target.value)}
                placeholder="Or paste candidate data here..."
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm resize-none"
                rows={3}
              />
              <button
                onClick={handlePasteUpload}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Process Pasted Data
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl border-2 border-purple-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield size={24} className="text-purple-600" />
              Generate Client Access
            </h3>
            <p className="text-gray-600 mb-4">Create secure token with client details</p>
            <button
              onClick={handleGenerateToken}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Generate Code
            </button>
          </div>
          <ChatBox
            title="Chat with Clients/Candidates"
            messages={[...recruiterChats.clients, ...recruiterChats.candidates]}
            onSendMessage={text => {
              setGlobalChatMessages([
                ...globalChatMessages,
                {
                  id: Date.now(),
                  from: user.id,
                  to: 'Team',
                  sender: 'recruiter',
                  text,
                  timestamp: Date.now()
                }
              ]);
            }}
            recipientName="Team"
            currentUserId={user.id}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Candidate Pool</h2>
          <div className="flex gap-2 bg-white rounded-xl border-2 border-purple-600 p-2 shadow-lg">
            {[
              { mode: 'grid', icon: '⊞', label: 'Grid' },
              { mode: 'list', icon: '☰', label: 'List' },
              { mode: 'table', icon: '⊟', label: 'Table' },
              { mode: 'carousel', icon: '⇄', label: 'Slide' },
              { mode: 'stack', icon: '⊡', label: 'Stack' }
            ].map(v => (
              <button
                key={v.mode}
                onClick={() => setViewMode(v.mode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  viewMode === v.mode ? 'bg-purple-600 text-white transform scale-105' : 'text-gray-600 hover:bg-purple-50'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">{v.icon}</span>
                  <span className="text-xs">{v.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {renderCandidates()}

        {showClientForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full border-2 border-purple-600 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Client Details</h3>
                <button onClick={() => setShowClientForm(false)} className="text-gray-400 hover:text-gray-600 transition-all">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={clientForm.clientName}
                    onChange={e => setClientForm({ ...clientForm, clientName: e.target.value })}
                    placeholder="e.g., TechCorp HR"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={clientForm.company}
                    onChange={e => setClientForm({ ...clientForm, company: e.target.value })}
                    placeholder="e.g., TechCorp Inc"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">POC Name</label>
                  <input
                    type="text"
                    value={clientForm.pocName}
                    onChange={e => setClientForm({ ...clientForm, pocName: e.target.value })}
                    placeholder="Point of Contact"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">POC Email</label>
                  <input
                    type="email"
                    value={clientForm.pocEmail}
                    onChange={e => setClientForm({ ...clientForm, pocEmail: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">POC Phone</label>
                  <input
                    type="tel"
                    value={clientForm.pocPhone}
                    onChange={e => setClientForm({ ...clientForm, pocPhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleClientFormSubmit}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Generate Token
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 border-2 border-purple-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="text-green-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold">Code Generated!</h3>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 mb-4 border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-2">Access URL:</p>
                <p className="font-mono text-sm text-purple-600 mb-3">
                  https://www.floww.site#client-{Math.random().toString(36).substr(2, 9)}
                </p>
                <p className="text-sm text-gray-600 mb-2">Password:</p>
                <p className="font-mono text-2xl font-bold text-purple-600">{code}</p>
                <p className="text-xs text-gray-500 mt-2">Status: ACTIVE</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`URL: https://www.floww.site\nPassword: ${code}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCandidateChat && activeChatCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 border-purple-600">
            <div className="bg-purple-600 text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Chat with {activeChatCandidate.name}</h3>
                <p className="text-sm opacity-90">{activeChatCandidate.role}</p>
              </div>
              <button onClick={() => setShowCandidateChat(false)} className="text-white hover:bg-purple-700 p-2 rounded-lg transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <ChatBox
                title=""
                messages={globalChatMessages.filter(
                  m =>
                    (m.from === activeChatCandidate.name && m.to === user.id) ||
                    (m.from === user.id && m.to === activeChatCandidate.name)
                )}
                onSendMessage={text => {
                  setGlobalChatMessages([
                    ...globalChatMessages,
                    {
                      id: Date.now(),
                      from: user.id,
                      to: activeChatCandidate.name,
                      sender: 'recruiter',
                      text,
                      timestamp: Date.now()
                    }
                  ]);
                }}
                recipientName={activeChatCandidate.name}
                currentUserId={user.id}
              />
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 border-purple-600">
            <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Preview Uploaded Candidates</h3>
                <p className="text-sm opacity-90">{uploadedCandidates.length} candidates ready to add</p>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-white hover:bg-purple-700 p-2 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedCandidates.map((candidate, idx) => (
                  <div key={idx} style={{ zIndex: uploadedCandidates.length - idx, position: 'relative' }}>
                    <CandidateCard
                      candidate={candidate}
                      zIndex={uploadedCandidates.length - idx}
                      onBringToFront={() => {}}
                      onChatClick={handleCandidateChat}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t-2 border-gray-200">
              <button
                onClick={handleAddUploadedCandidates}
                className="flex-1 bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Add All {uploadedCandidates.length} Candidates to Pool
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-8 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAccessTokens && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border-2 border-green-600">
            <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">✅ Candidates Added Successfully!</h3>
                <p className="text-sm opacity-90">{generatedTokens.length} candidates now have portal access</p>
              </div>
              <button onClick={() => setShowAccessTokens(false)} className="text-white hover:bg-green-700 p-2 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>📧 Important:</strong> Send these access tokens to candidates via their registered email addresses. They can use
                  these to login to the Candidate Portal.
                </p>
              </div>
              <div className="space-y-3">
                {generatedTokens.map((token, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-green-300 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{token.name}</h4>
                      <p className="text-sm text-gray-600">{token.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Access Token:</p>
                      <p className="font-mono text-lg font-bold text-green-600">{token.token}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`Access Token: ${token.token}\nEmail: ${token.email}`);
                        alert(`Token copied for ${token.name}!`);
                      }}
                      className="ml-4 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-all"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t-2 border-gray-200">
              <button
                onClick={() => {
                  const allTokens = generatedTokens.map(t => `${t.name} (${t.email}): ${t.token}`).join('\n');
                  navigator.clipboard.writeText(allTokens);
                  alert('All tokens copied to clipboard!');
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Copy All Tokens
              </button>
              <button
                onClick={() => setShowAccessTokens(false)}
                className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
