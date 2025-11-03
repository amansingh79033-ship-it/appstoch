import React, { useState, useEffect } from 'react';
import { Video, Users, FileText, Target, TrendingUp, Shield, Zap, User, Mail, Building, Phone, X } from 'lucide-react';
import LeaderCard from '../components/LeaderCard';
import { getRandomCuriousMindsColor } from '../utils/helpers';

const HomePage = ({ setCurrentPage, setDemoRequests, leadershipData }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', phone: '' });
  const [tagColor, setTagColor] = useState('#8B5CF6');

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
    setTagColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDemoSubmit = () => {
    if (demoForm.name && demoForm.email && demoForm.company) {
      setDemoRequests(prev => [...prev, { ...demoForm, id: Date.now(), status: 'pending' }]);
      alert('Demo request submitted! Our admin will review and connect with you shortly.');
      setShowDemoForm(false);
      setDemoForm({ name: '', email: '', company: '', phone: '' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Transform Your Hiring Process
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AI-powered recruitment that finds perfect matches 3x faster. Watch your hiring pipeline transform with
            intelligent candidate scoring and instant video connections.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">94%</div>
              <div className="text-sm text-gray-500">PLACEMENT SUCCESS</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">3.8x</div>
              <div className="text-sm text-gray-500">FASTER OFFERS</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">1,200+</div>
              <div className="text-sm text-gray-500">ACTIVE CLIENTS</div>
            </div>
          </div>
          <div className="flex gap-6 justify-center flex-wrap">
            <div className="relative">
              <button
                onClick={() => setShowLoginMenu(!showLoginMenu)}
                className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
              {showLoginMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border-2 border-purple-600 overflow-hidden z-50 min-w-[200px]">
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setShowLoginMenu(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-purple-50 transition-all duration-200 border-b border-gray-100 font-medium"
                  >
                    Recruiter Login
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setShowLoginMenu(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-orange-50 transition-all duration-200 border-b border-gray-100 font-medium"
                  >
                    Client Access
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setShowLoginMenu(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 font-medium"
                  >
                    Candidate Login
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setShowLoginMenu(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Admin Panel
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowDemoForm(true)}
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Video size={24} />
              Connect for Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section with Stacking Effect */}
      <section className="py-20 px-6 bg-gray-50 mt-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Elite Teams Choose floww.</h2>
          <div className="relative h-[600px]">
            {[
              {
                icon: Users,
                title: 'Predictive Candidate Matching',
                desc: 'ML algorithms analyze 50+ data points to predict culture fit and performance potential',
                color: 'bg-purple-100',
                border: 'border-purple-600'
              },
              {
                icon: FileText,
                title: 'Instant Job Description Magic',
                desc: 'Generate compelling, ATS-optimized JDs in 12 seconds that attract top-tier talent',
                color: 'bg-blue-100',
                border: 'border-blue-600'
              },
              {
                icon: Video,
                title: 'Zero-Friction Video Interviews',
                desc: 'One-click secure video calls with automatic recording and AI-powered interview analysis',
                color: 'bg-green-100',
                border: 'border-green-600'
              },
              {
                icon: Shield,
                title: 'Military-Grade Security',
                desc: 'Bank-level encryption with SOC 2 compliance and granular access controls for peace of mind',
                color: 'bg-orange-100',
                border: 'border-orange-600'
              }
            ].map((item, idx) => {
              const offset = Math.max(0, scrollY - 400);
              const cardOffset = offset * 0.15;
              const scale = Math.max(0.85, 1 - idx * 0.05 - cardOffset * 0.001 * idx);
              const translateY = idx * 100 - cardOffset * idx * 0.5;
              const opacity = Math.max(0.4, 1 - idx * 0.1 - cardOffset * 0.002);

              return (
                <div
                  key={idx}
                  className={`absolute w-full ${item.color} rounded-2xl border-2 ${item.border} p-8 shadow-xl transition-all duration-300`}
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    zIndex: 4 - idx,
                    opacity
                  }}
                >
                  <div className="flex items-start gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <item.icon className="text-purple-600" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-lg">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* JD Generator Section */}
      <section className="py-20 px-6 bg-white mt-48">
        <div className="max-w-4xl mx-auto">
          <div className="bg-purple-50 rounded-2xl border-2 border-purple-600 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <FileText className="text-purple-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">AI Job Description Generator</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Create professional, ATS-optimized job descriptions in seconds with our AI-powered tool
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Full Stack Developer"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none bg-white transition-all duration-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none bg-white transition-all duration-200">
                    <option>Entry Level (0-2 years)</option>
                    <option>Mid Level (3-5 years)</option>
                    <option>Senior (5-8 years)</option>
                    <option>Lead/Principal (8+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none bg-white transition-all duration-200">
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills (comma separated) *</label>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js, PostgreSQL, AWS"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none bg-white transition-all duration-200"
                />
              </div>
              <button className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Zap size={20} />
                Generate JD with AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-6 bg-gray-50" style={{ marginTop: '30px' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Leadership Brains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.map(leader => (
              <LeaderCard
                key={leader.id}
                name={leader.name}
                role={leader.role}
                image={leader.image}
                bio={leader.bio}
                linkedin={leader.linkedin}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Graph */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Real Impact. Real Numbers.</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            See how floww. turns traditional hiring bottlenecks into competitive advantages
          </p>

          <div className="bg-white rounded-2xl border-2 border-purple-600 p-8 shadow-xl">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <TrendingUp className="text-purple-600 mx-auto mb-2" size={40} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">73%</div>
                  <div className="text-sm text-gray-600">Avg. Time Saved</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <Target className="text-blue-600 mx-auto mb-2" size={40} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">96%</div>
                  <div className="text-sm text-gray-600">Candidate-Role Fit</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <Users className="text-green-600 mx-auto mb-2" size={40} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">4.2x</div>
                  <div className="text-sm text-gray-600">Interview Conversion</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 relative overflow-hidden">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Placement Success Rate Trajectory</h3>
              <svg width="100%" height="300" viewBox="0 0 800 300" className="overflow-visible">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>

                <line x1="50" y1="250" x2="750" y2="250" stroke="#9CA3AF" strokeWidth="2" />
                <line x1="50" y1="50" x2="50" y2="250" stroke="#9CA3AF" strokeWidth="2" />

                <text x="400" y="285" textAnchor="middle" className="text-xs fill-gray-600">
                  Months
                </text>
                <text
                  x="20"
                  y="150"
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                  transform="rotate(-90 20 150)"
                >
                  Success Rate (%)
                </text>

                {[0, 1, 2, 3, 4, 5, 6].map(month => (
                  <text key={month} x={50 + month * 116} y="270" textAnchor="middle" className="text-xs fill-gray-600">
                    M{month}
                  </text>
                ))}

                {[0, 20, 40, 60, 80, 100].map(val => (
                  <text key={val} x="40" y={250 - val * 2} textAnchor="end" className="text-xs fill-gray-600">
                    {val}
                  </text>
                ))}

                <polyline
                  points="50,180 166,155 282,120 398,95 514,75 630,60 750,48"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="3"
                />

                {[
                  { x: 50, y: 180, val: 35 },
                  { x: 166, y: 155, val: 48 },
                  { x: 282, y: 120, val: 65 },
                  { x: 398, y: 95, val: 78 },
                  { x: 514, y: 75, val: 88 },
                  { x: 630, y: 60, val: 95 },
                  { x: 750, y: 48, val: 101 }
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="#8B5CF6"
                    className="hover:r-8 transition-all cursor-pointer"
                  >
                    <title>{`Month ${i}: ${point.val}% Success Rate`}</title>
                  </circle>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Our Clients</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Trusted by innovative companies transforming their hiring
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '!-flo', color: '#8B5CF6', tagline: 'Flow automation' },
              { name: 'metric.wtf', color: '#EC4899', tagline: 'Analytics simplified' },
              { name: 'metric+', color: '#F59E0B', tagline: 'Advanced metrics' },
              { name: 'emailiya', color: '#10B981', tagline: 'Email intelligence' },
              { name: 'euphoria', color: '#8B5CF6', tagline: 'Experience design' },
              { name: 'clazzy', color: '#EC4899', tagline: 'Class management' },
              { name: 'propertyfie', color: '#F59E0B', tagline: 'Real estate tech' }
            ].map((client, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border-2 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                style={{ borderColor: client.color }}
              >
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                    style={{ backgroundColor: client.color }}
                  >
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: client.color }}>
                    {client.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{client.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div
                className="text-2xl font-bold text-purple-600 mb-4 cursor-pointer transition-colors duration-300 hover:text-pink-500"
                onMouseEnter={e => (e.currentTarget.style.color = getRandomCuriousMindsColor())}
                onMouseLeave={e => (e.currentTarget.style.color = '#8B5CF6')}
                onClick={scrollToTop}
              >
                floww<span style={{ color: tagColor }}>.</span>
              </div>
              <p className="text-gray-400 text-sm">Hiring intelligence for modern teams</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-all duration-200">Features</li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">Demo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-all duration-200">About</li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">Careers</li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-all duration-200">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">Terms</li>
                <li className="hover:text-white cursor-pointer transition-all duration-200">Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 floww. All rights reserved. Built with intelligence.</p>
          </div>
        </div>
      </footer>

      {/* Demo Form Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border-2 border-purple-600 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Request a Demo</h3>
              <button onClick={() => setShowDemoForm(false)} className="text-gray-400 hover:text-gray-600 transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={demoForm.name}
                    onChange={e => setDemoForm({ ...demoForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={demoForm.email}
                    onChange={e => setDemoForm({ ...demoForm, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={demoForm.company}
                    onChange={e => setDemoForm({ ...demoForm, company: e.target.value })}
                    placeholder="Acme Inc"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={demoForm.phone}
                    onChange={e => setDemoForm({ ...demoForm, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleDemoSubmit}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
