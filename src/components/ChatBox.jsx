import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const ChatBox = ({ title, messages, onSendMessage, recipientName, currentUserId }) => {
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    if (msg.trim()) {
      onSendMessage(msg);
      setMsg('');
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-purple-600 overflow-hidden shadow-lg">
      <div className="bg-purple-600 text-white px-4 py-3 font-semibold flex items-center gap-2">
        <MessageSquare size={20} />
        {title}
      </div>
      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-8">
            No messages yet. Start chatting with {recipientName}!
          </p>
        ) : (
          messages.map((m, i) => {
            const isMyMessage = m.from === currentUserId || m.sender === 'me';
            return (
              <div key={m.id || i} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${isMyMessage ? 'bg-purple-600 text-white' : 'bg-white border-2 border-gray-200'}`}>
                  <p className="text-sm font-medium mb-1">{isMyMessage ? 'You' : m.from}</p>
                  <p className="text-sm">{m.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {m.timestamp
                      ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="p-4 bg-white border-t-2 border-gray-200 flex gap-2">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Message ${recipientName}...`}
          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
