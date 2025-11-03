import React, { useState } from 'react';
import { Users, Activity, Globe, X, RefreshCw, Trash2 } from 'lucide-react';
import { generateRoomName } from '../utils/helpers';

const AdminPanel = ({ user, demoRequests, setDemoRequests, leadershipData, setLeadershipData, usersList, setUsersList }) => {
  const [showTech, setShowTech] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [showLeaderEdit, setShowLeaderEdit] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'recruiter', password: '', username: '' });
  const [showCredentials, setShowCredentials] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);

  const visitors = [
    { ip: '192.168.1.1', loc: 'San Francisco', page: '/recruiter', time: '10:45 AM' },
    { ip: '192.168.1.2', loc: 'New York', page: '/client', time: '10:42 AM' }
  ];

  const handleDemoRequest = (request, action) => {
    if (action === 'approve') {
      const roomName = `FlowwDemo${Date.now()}`;
      window.open(`https://meet.jit.si/${roomName}`, '_blank');
      alert(`Demo approved! Joining room: ${roomName}`);
    }
    setDemoRequests(demoRequests.filter(r => r.id !== request.id));
  };

  const handleEditLeader = leader => {
    setEditingLeader({ ...leader });
    setShowLeaderEdit(true);
  };

  const handleSaveLeader = () => {
    const updatedData = leadershipData.map(l => (l.id === editingLeader.id ? editingLeader : l));
    setLeadershipData(updatedData);
    setShowLeaderEdit(false);
    setEditingLeader(null);
    alert('Leadership data updated! Changes are live on homepage.');
  };

  const handleCreateUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.username.trim()) {
      alert('Name, Email, and Username are required!');
      return;
    }

    const finalPassword = newUser.password.trim() || Math.random().toString(36).slice(-8);

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      password: finalPassword,
      role: newUser.role,
      status: 'active'
    };
    setUsersList([...usersList, user]);
    setCreatedCredentials({ username: user.username, password: finalPassword, role: user.role, name: user.name });
    setShowCreateUser(false);
    setShowCredentials(true);
    setNewUser({ name: '', email: '', role: 'recruiter', password: '', username: '' });
  };

  const handleDeleteUser = userId => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsersList(usersList.filter(u => u.id !== userId));
      alert('User deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Control Panel</h1>

        {demoRequests.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Pending Demo Requests</h3>
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
                    Approve & Join
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

        <div
          className="relative mb-12 cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setShowTech(!showTech)}
        >
          <div
            className="relative transition-all duration-600"
            style={{ transformStyle: 'preserve-3d', transform: showTech ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            <div className="bg-purple-600 rounded-xl p-8 text-white shadow-xl" style={{ backfaceVisibility: 'hidden' }}>
              <h2 className="text-3xl font-bold mb-4">System Overview</h2>
              <p className="text-lg mb-4">All systems operational</p>
              <p className="text-sm opacity-80 italic">✨ Flip me, I will surprise you!</p>
            </div>
            <div
              className="absolute top-0 left-0 w-full bg-white rounded-xl border-2 border-purple-600 p-8 shadow-xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <h2 className="text-2xl font-bold mb-6">Technical Dashboard</h2>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">API Health</span>
                    <Activity className="text-green-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <div className="text-xs text-gray-500 mt-1">45ms response</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Active Users</span>
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">127</div>
                  <div className="text-xs text-gray-500 mt-1">Peak: 245</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Live Visitors</span>
                    <Globe className="text-purple-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{visitors.length}</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <h4 className="font-semibold mb-3">Recent Visitors</h4>
                <div className="space-y-2">
                  {visitors.map((v, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{v.ip}</span>
                      <span className="text-gray-500">{v.loc}</span>
                      <span className="text-gray-400">{v.page}</span>
                      <span className="text-gray-400">{v.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-purple-600 p-8 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Leadership Team Management</h2>
            <p className="text-sm text-gray-600">Edit bios, photos, and roles - changes sync live to homepage</p>
          </div>
          <div className="space-y-4">
            {leadershipData.map(leader => (
              <div
                key={leader.id}
                className="bg-white rounded-lg border-2 border-purple-300 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-600 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{leader.name}</h3>
                  <p className="text-sm text-purple-600 font-medium truncate">{leader.role}</p>
                  <p className="text-xs text-gray-500 truncate">{leader.email || leader.linkedin}</p>
                </div>
                <button
                  onClick={() => handleEditLeader(leader)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
                >
                  Edit Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-purple-600 p-8 shadow-lg">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <button
              onClick={() => setShowCreateUser(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <Users size={20} />
              Create User
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Username</th>
                <th className="text-left py-3 px-4 font-semibold">Role</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition-all duration-200">
                  <td className="py-4 px-4">{u.name}</td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{u.username}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.role === 'recruiter'
                          ? 'bg-purple-100 text-purple-700'
                          : u.role === 'admin'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">{u.email}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-purple-600 hover:text-purple-700 mx-2 transition-all duration-200">
                      <RefreshCw size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-red-600 hover:text-red-700 mx-2 transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showLeaderEdit && editingLeader && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full border-2 border-purple-600 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Leader Profile</h3>
                <button onClick={() => setShowLeaderEdit(false)} className="text-gray-400 hover:text-gray-600 transition-all">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={editingLeader.name}
                    onChange={e => setEditingLeader({ ...editingLeader, name: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role/Title *</label>
                  <input
                    type="text"
                    value={editingLeader.role}
                    onChange={e => setEditingLeader({ ...editingLeader, role: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL *</label>
                  <input
                    type="text"
                    value={editingLeader.image}
                    onChange={e => setEditingLeader({ ...editingLeader, image: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                  />
                  <div className="mt-2 flex justify-center">
                    <img
                      src={editingLeader.image}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-purple-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio *</label>
                  <textarea
                    value={editingLeader.bio}
                    onChange={e => setEditingLeader({ ...editingLeader, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL *</label>
                  <input
                    type="text"
                    value={editingLeader.linkedin}
                    onChange={e => setEditingLeader({ ...editingLeader, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                  />
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    onClick={handleSaveLeader}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowLeaderEdit(false)}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCreateUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full border-2 border-purple-600 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Create New User</h3>
              <button onClick={() => setShowCreateUser(false)} className="text-gray-400 hover:text-gray-600 transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                  placeholder="johndoe"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john@floww.com"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password (optional - auto-generated if blank)
                </label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Leave empty for auto-generation"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to generate a secure random password</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none bg-white text-sm"
                >
                  <option value="recruiter">Recruiter</option>
                  <option value="client">Client</option>
                  <option value="candidate">Candidate</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 pt-3">
                <button
                  onClick={handleCreateUser}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                  Create User
                </button>
                <button
                  onClick={() => setShowCreateUser(false)}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCredentials && createdCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border-2 border-green-600 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="text-green-600" size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">User Created!</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-4 mb-4 border-2 border-green-200">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Credentials for {createdCredentials.name}:</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Role:</p>
                  <p className="font-mono text-base font-bold text-green-600">{createdCredentials.role.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Username:</p>
                  <p className="font-mono text-base font-bold text-gray-900">{createdCredentials.username}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Password:</p>
                  <p className="font-mono text-base font-bold text-gray-900">{createdCredentials.password}</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Save these now!</strong> Share securely with user.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Username: ${createdCredentials.username}\nPassword: ${createdCredentials.password}\nRole: ${createdCredentials.role}`
                  );
                  alert('Credentials copied to clipboard!');
                }}
                className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Copy
              </button>
              <button
                onClick={() => setShowCredentials(false)}
                className="px-6 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
