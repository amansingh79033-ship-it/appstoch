import React, { useState } from 'react';
import { X } from 'lucide-react';

const LoginPage = ({ setCurrentPage, setUser, usersList }) => {
  const [rForm, setRForm] = useState({ id: '', pw: '' });
  const [cForm, setCForm] = useState({ token: '' });
  const [candForm, setCandForm] = useState({ token: '' });
  const [aForm, setAForm] = useState({ id: '', pw: '' });

  const handleRecruiterLogin = () => {
    const foundUser = usersList.find(
      u => u.username === rForm.id && u.password === rForm.pw && (u.role === 'recruiter' || u.role === 'admin')
    );
    if (foundUser) {
      setUser({
        role: foundUser.role === 'admin' ? 'recruiter' : 'recruiter',
        name: foundUser.name,
        id: foundUser.username
      });
      setCurrentPage('recruiter');
    } else {
      alert('Invalid recruiter credentials');
    }
  };

  const handleAdminLogin = () => {
    const foundUser = usersList.find(u => u.username === aForm.id && u.password === aForm.pw && u.role === 'admin');
    if (foundUser) {
      setUser({ role: 'admin', name: foundUser.name });
      setCurrentPage('admin');
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleClientLogin = () => {
    if (cForm.token === 'RFR20T') {
      setUser({
        role: 'client',
        name: 'TechCorp HR',
        recruiterName: 'Demo Recruiter',
        recruiterId: 'demo'
      });
      setCurrentPage('client');
    } else {
      alert('Invalid client token');
    }
  };

  const handleCandidateLogin = () => {
    if (candForm.token === 'CAND123') {
      setUser({
        role: 'candidate',
        name: 'Sarah Johnson',
        recruiterName: 'Demo Recruiter',
        recruiterId: 'demo'
      });
      setCurrentPage('candidate');
    } else {
      alert('Invalid candidate token');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Login to Floww</h1>
        <div className="bg-purple-50 border-2 border-purple-600 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-purple-600 mb-3">📝 Demo Credentials (Try These!):</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold text-purple-600">Recruiter:</span> Username:{' '}
              <code className="bg-white px-2 py-1 rounded">demo</code> | Password:{' '}
              <code className="bg-white px-2 py-1 rounded">demo123</code>
            </p>
            <p>
              <span className="font-semibold text-purple-600">Admin:</span> Username:{' '}
              <code className="bg-white px-2 py-1 rounded">admin</code> | Password:{' '}
              <code className="bg-white px-2 py-1 rounded">admin123</code>
            </p>
            <p>
              <span className="font-semibold text-purple-600">Client Token:</span>{' '}
              <code className="bg-white px-2 py-1 rounded">RFR20T</code>
            </p>
            <p>
              <span className="font-semibold text-purple-600">Candidate Token:</span>{' '}
              <code className="bg-white px-2 py-1 rounded">CAND123</code>
            </p>
            <p className="text-xs text-gray-600 mt-3 italic">
              💡 Admins can create new users with custom credentials from the Admin Panel!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Recruiter Login */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-2">Recruiter Login</h2>
            <p className="text-sm text-gray-600 mb-6">Username or Name</p>
            <div className="space-y-4">
              <input
                type="text"
                value={rForm.id}
                onChange={(e) => setRForm({ ...rForm, id: e.target.value })}
                placeholder="Username (try: demo)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
              />
              <input
                type="password"
                value={rForm.pw}
                onChange={(e) => setRForm({ ...rForm, pw: e.target.value })}
                placeholder="Password (try: demo123)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleRecruiterLogin()}
              />
              <button
                onClick={handleRecruiterLogin}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </div>
          </div>

          {/* Client Access */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-2">Client Access</h2>
            <p className="text-sm text-gray-600 mb-6">Token-only access</p>
            <div className="space-y-4">
              <input
                type="text"
                value={cForm.token}
                onChange={(e) => setCForm({ token: e.target.value })}
                placeholder="Access Token (try: RFR20T)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleClientLogin()}
              />
              <button
                onClick={handleClientLogin}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Access Portal
              </button>
            </div>
          </div>

          {/* Candidate Login */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-2">Candidate Login</h2>
            <p className="text-sm text-gray-600 mb-6">Secure access</p>
            <div className="space-y-4">
              <input
                type="text"
                value={candForm.token}
                onChange={(e) => setCandForm({ token: e.target.value })}
                placeholder="Token (try: CAND123)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleCandidateLogin()}
              />
              <button
                onClick={handleCandidateLogin}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Access Portal
              </button>
            </div>
          </div>

          {/* Admin Login */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
            <p className="text-sm text-gray-600 mb-6">Full management</p>
            <div className="space-y-4">
              <input
                type="text"
                value={aForm.id}
                onChange={(e) => setAForm({ ...aForm, id: e.target.value })}
                placeholder="Admin Username (try: admin)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
              />
              <input
                type="password"
                value={aForm.pw}
                onChange={(e) => setAForm({ ...aForm, pw: e.target.value })}
                placeholder="Password (try: admin123)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
              <button
                onClick={handleAdminLogin}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Admin Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
