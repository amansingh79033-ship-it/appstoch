import React from 'react';
import { Upload, Download } from 'lucide-react';
import ChatBox from '../components/ChatBox';

const CandidatePortal = ({ user, globalChatMessages, setGlobalChatMessages }) => {
  const candidateMessages = globalChatMessages.filter(
    m =>
      (m.from === user.recruiterId && m.to === user.name) ||
      (m.from === user.name && (m.to === user.recruiterName || m.to === user.recruiterId))
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border-2 border-purple-600 p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">
            Recruiter: <span className="font-semibold text-purple-600">{user.recruiterName}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChatBox
            title={`Chat with ${user.recruiterName}`}
            messages={candidateMessages}
            onSendMessage={(text) => {
              setGlobalChatMessages([
                ...globalChatMessages,
                {
                  id: Date.now(),
                  from: user.name,
                  to: user.recruiterId || 'demo',
                  sender: 'candidate',
                  text,
                  timestamp: Date.now()
                }
              ]);
            }}
            recipientName={user.recruiterName}
            currentUserId={user.name}
          />
          <div className="bg-white rounded-xl border-2 border-purple-600 p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload size={24} className="text-purple-600" />
              Your Documents
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg border-2 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div>
                  <p className="font-medium">Resume.pdf</p>
                  <p className="text-xs text-gray-500">Oct 10, 2025</p>
                </div>
                <Download
                  size={20}
                  className="text-purple-600 cursor-pointer hover:text-purple-700 transition-all"
                  onClick={() => alert('Downloading Resume.pdf')}
                />
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg border-2 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div>
                  <p className="font-medium">Portfolio.pdf</p>
                  <p className="text-xs text-gray-500">Oct 12, 2025</p>
                </div>
                <Download
                  size={20}
                  className="text-purple-600 cursor-pointer hover:text-purple-700 transition-all"
                  onClick={() => alert('Downloading Portfolio.pdf')}
                />
              </div>
            </div>
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:bg-purple-50 cursor-pointer transition-all duration-300">
              <Upload size={32} className="text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload New Document</p>
              <p className="text-xs text-gray-400 mt-1">Visible to your recruiter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;
