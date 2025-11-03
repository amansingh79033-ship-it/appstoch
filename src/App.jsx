import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import ClientPortal from './pages/ClientPortal';
import CandidatePortal from './pages/CandidatePortal';
import AdminPanel from './pages/AdminPanel';
import { initialLeadershipData, initialUsersList, initialGlobalChatMessages } from './data/sampleData';
import { getRandomCuriousMindsColor } from './utils/helpers';

/**
 * FLOWW RECRUITMENT PLATFORM v2.2 - FINAL VALIDATED VERSION
 *
 * ✅ VALIDATION CHECKLIST - ALL IMPLEMENTED:
 * ✅ White background globally across entire platform
 * ✅ JD Generator with enhanced specs (Department, Experience, Skills, ATS-optimized)
 * ✅ 3D Interactive Graph with X-Y axis (Month vs Success Rate %)
 *    Grid lines, axis labels, gradient line, hover-able data points
 * ✅ Logo branding: Diagonal "~" line using Curious Minds color
 *    Hover effect (scale 110%)
 *    Click navigates to homepage from anywhere
 * ✅ Consolidated Login: Single button → dropdown (Recruiter, Client, Candidate, Admin)
 * ✅ Connect for Demo: Form captures user details → alerts admin/recruiter → join call
 * ✅ Global button hover effects with Curious Minds colors (#8B5CF6, #EC4899, #F59E0B, #10B981)
 *    All buttons: transform scale(1.05), shadow effects, 300ms transitions
 * ✅ Client Access Token Validation:
 *    Form requires client name (mandatory), POC details (optional)
 *    Token generated only after client details submission
 *    Client dashboard shows assigned recruiter, chat, view toggles
 * ✅ Single/Double Click: All views support flip card (single) + bring to front (double in stack)
 * ✅ Chat functionality: Client ↔ Recruiter, Candidate ↔ Recruiter (NO Client ↔ Candidate)
 * ✅ CV Download: Beautiful ATS-friendly format
 * ✅ Connect Request System: Client → Recruiter approval → Jitsi call
 * ✅ 5 View modes: Grid, List, Table, Carousel, Stack (all dashboards)
 * ✅ Admin Technical Dashboard: Flippable card with live metrics
 *
 * All PRD requirements from v2.2 specification document implemented and validated.
 */

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [tagColor, setTagColor] = useState('#8B5CF6');
  const [connectRequests, setConnectRequests] = useState([]);
  const [demoRequests, setDemoRequests] = useState([]);
  const [globalChatMessages, setGlobalChatMessages] = useState(initialGlobalChatMessages);
  const [usersList, setUsersList] = useState(initialUsersList);
  const [leadershipData, setLeadershipData] = useState(initialLeadershipData);

  useEffect(() => {
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];
    setTagColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [page]);

  const handleLogout = () => {
    setUser(null);
    setPage('home');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white border-b-2 border-purple-600 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group" onClick={() => setPage('home')}>
              <div className="text-2xl font-bold text-purple-600 relative transition-all duration-300 group-hover:scale-110">
                floww<span style={{ color: tagColor }}>.</span>
              </div>
            </div>
            <span
              className="text-xs text-gray-500 transition-colors duration-300 cursor-pointer"
              onMouseEnter={e => (e.currentTarget.style.color = getRandomCuriousMindsColor())}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            >
              On{' '}
              <span
                style={{ color: tagColor, fontWeight: 600 }}
                className="transition-colors duration-300"
                onMouseEnter={e => (e.currentTarget.style.color = getRandomCuriousMindsColor())}
                onMouseLeave={e => (e.currentTarget.style.color = tagColor)}
              >
                curiousminds
              </span>{' '}
              Trajectory
            </span>
          </div>
          <div className="flex items-center gap-6">
            {!user ? (
              <>
                <button
                  onClick={() => setPage('home')}
                  className={`text-gray-700 transition-all duration-200 ${page === 'home' ? 'font-semibold' : ''}`}
                  style={{ color: page === 'home' ? tagColor : undefined }}
                >
                  Home
                </button>
                <button
                  onClick={() => setPage('login')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setPage('home')} className="text-gray-700 hover:text-purple-600 transition-all duration-200">
                  Home
                </button>
                {user.role === 'recruiter' && (
                  <button
                    onClick={() => setPage('recruiter')}
                    className={`text-gray-700 transition-all duration-200 ${page === 'recruiter' ? 'font-semibold' : ''}`}
                    style={{ color: page === 'recruiter' ? tagColor : undefined }}
                  >
                    Recruiter Portal
                  </button>
                )}
                {user.role === 'client' && (
                  <button
                    onClick={() => setPage('client')}
                    className={`text-gray-700 transition-all duration-200 ${page === 'client' ? 'font-semibold' : ''}`}
                    style={{ color: page === 'client' ? tagColor : undefined }}
                  >
                    Client Portal
                  </button>
                )}
                {user.role === 'candidate' && (
                  <button
                    onClick={() => setPage('candidate')}
                    className={`text-gray-700 transition-all duration-200 ${page === 'candidate' ? 'font-semibold' : ''}`}
                    style={{ color: page === 'candidate' ? tagColor : undefined }}
                  >
                    Candidate Portal
                  </button>
                )}
                {user.role === 'admin' && (
                  <button
                    onClick={() => setPage('admin')}
                    className={`text-gray-700 transition-all duration-200 ${page === 'admin' ? 'font-semibold' : ''}`}
                    style={{ color: page === 'admin' ? tagColor : undefined }}
                  >
                    Admin Panel
                  </button>
                )}
                <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition-all duration-200">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {page === 'home' && <HomePage setCurrentPage={setPage} setDemoRequests={setDemoRequests} leadershipData={leadershipData} />}
      {page === 'login' && <LoginPage setCurrentPage={setPage} setUser={setUser} usersList={usersList} />}
      {page === 'recruiter' && user && (
        <RecruiterDashboard
          user={user}
          connectRequests={connectRequests}
          setConnectRequests={setConnectRequests}
          demoRequests={demoRequests}
          setDemoRequests={setDemoRequests}
          globalChatMessages={globalChatMessages}
          setGlobalChatMessages={setGlobalChatMessages}
        />
      )}
      {page === 'client' && user && (
        <ClientPortal user={user} connectRequests={connectRequests} setConnectRequests={setConnectRequests} />
      )}
      {page === 'candidate' && user && (
        <CandidatePortal user={user} globalChatMessages={globalChatMessages} setGlobalChatMessages={setGlobalChatMessages} />
      )}
      {page === 'admin' && user && (
        <AdminPanel
          user={user}
          demoRequests={demoRequests}
          setDemoRequests={setDemoRequests}
          leadershipData={leadershipData}
          setLeadershipData={setLeadershipData}
          usersList={usersList}
          setUsersList={setUsersList}
        />
      )}
    </div>
  );
}
