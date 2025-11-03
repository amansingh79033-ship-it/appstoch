// Sample data for the application

export const sampleCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Full Stack Developer',
    email: 'sarah.j@email.com',
    location: 'San Francisco, CA',
    experience: '5 years',
    score: 92,
    skills: 'React, Node.js, PostgreSQL, AWS',
    notes: 'Excellent technical skills, strong communication',
    recommendation: 'Highly Recommended'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'DevOps Engineer',
    email: 'mchen@email.com',
    location: 'Austin, TX',
    experience: '4 years',
    score: 88,
    skills: 'Kubernetes, CI/CD, Terraform, Python',
    notes: 'Strong infrastructure knowledge',
    recommendation: 'Recommended'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX/UI Designer',
    email: 'emily.r@email.com',
    location: 'New York, NY',
    experience: '6 years',
    score: 95,
    skills: 'Figma, User Research, Prototyping',
    notes: 'Outstanding portfolio',
    recommendation: 'Highly Recommended'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Data Scientist',
    email: 'dkim@email.com',
    location: 'Seattle, WA',
    experience: '3 years',
    score: 85,
    skills: 'Python, TensorFlow, SQL, ML',
    notes: 'Strong analytical skills',
    recommendation: 'Recommended'
  }
];

export const initialLeadershipData = [
  {
    id: 1,
    name: "Shiwani Singh",
    role: "CEO, CMO & Managing Director",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shiwani&backgroundColor=b6e3f4",
    bio: "A visionary leader who transforms curiosity into tangible results, Shiwani stands out for her ability to unite people in pursuit of excellence. With a proven track record at industry-leading organizations, she brings sharp strategic insight, a passionate commitment to developing talent, and an infectious drive for innovation. Shiwani leads from the front—empowering teams, elevating standards, and inspiring growth at every level.",
    linkedin: "https://www.linkedin.com/in/kumari-shiwani-singh-b646021b2"
  },
  {
    id: 2,
    name: "Aman Kumar Singh",
    role: "Assistant Chief of Tech, Research and Innovation",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman&backgroundColor=b6e3f4",
    bio: "Aman brings relentless energy and big-picture vision to every challenge. He fuses deep technical expertise with creative problem-solving, making technology feel accessible and transformative. Aman is known for championing practical innovation—from robust infrastructure to real-world automation—while rallying teams to work smarter, faster, and with unwavering integrity. His optimism and focus raise the bar for everyone around him.",
    linkedin: "https://www.linkedin.com/in/aman-kumar-singh-5688b41b3"
  },
  {
    id: 3,
    name: "Dipanshu Sehgal",
    role: "Chief of Latest Tech and Implementation",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dipanshu&backgroundColor=b6e3f4",
    bio: "Dipanshu is a builder of systems—precise, thoughtful, and deeply driven by the mission to turn data into strategic advantage. Equally at home architecting complex solutions or guiding teams to success, his leadership is grounded in clarity, collaboration, and decisive action. Colleagues trust his judgment and admire his commitment to progress, knowing he is dedicated not only to technical mastery but to making a difference through purposeful innovation.",
    linkedin: "https://www.linkedin.com/in/dipanshu-sehgal"
  }
];

export const initialUsersList = [
  {
    id: 1,
    name: 'Demo Recruiter',
    role: 'recruiter',
    email: 'demo@floww.com',
    username: 'demo',
    password: 'demo123',
    status: 'active'
  },
  {
    id: 2,
    name: 'TechCorp HR',
    role: 'client',
    email: 'hr@techcorp.com',
    username: 'techcorp',
    password: 'tech123',
    status: 'active'
  },
  {
    id: 3,
    name: 'Admin User',
    role: 'admin',
    email: 'admin@floww.com',
    username: 'admin',
    password: 'admin123',
    status: 'active'
  }
];

export const initialGlobalChatMessages = [
  {
    id: 1,
    from: 'TechCorp HR',
    to: 'demo',
    sender: 'client',
    text: 'Can you add more candidates?',
    timestamp: Date.now()
  },
  {
    id: 2,
    from: 'Sarah Johnson',
    to: 'demo',
    sender: 'candidate',
    text: 'When can we schedule the interview?',
    timestamp: Date.now()
  },
  {
    id: 3,
    from: 'demo',
    to: 'Sarah Johnson',
    sender: 'recruiter',
    text: 'Thanks for applying! Let\'s schedule an interview.',
    timestamp: Date.now()
  }
];
