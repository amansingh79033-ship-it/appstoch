# Floww Recruitment Platform v2.2

## 🚀 AI-Powered Recruitment Platform

A comprehensive recruitment platform with AI-powered features, multiple user roles, and real-time collaboration tools.

## ✨ Features

### Core Features
- **Multi-Role Support**: Recruiter, Client, Candidate, and Admin portals
- **5 View Modes**: Grid, List, Table, Carousel, and Stack views
- **Real-time Chat**: Communication between recruiters, clients, and candidates
- **Video Integration**: One-click Jitsi video calls
- **AI Job Description Generator**: Create ATS-optimized job descriptions
- **Candidate Management**: Upload, manage, and track candidates
- **Access Token System**: Secure token-based access for clients and candidates
- **Leadership Management**: Admin can manage leadership team profiles
- **User Management**: Create and manage users with different roles

### Technical Features
- **3D Interactive Components**: Flippable cards with smooth animations
- **Interactive Graph**: X-Y axis visualization for success rate tracking
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean white background with purple accent colors
- **Smooth Transitions**: 300ms hover effects and animations

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **Vite** - Build tool
- **Lucide React** - Icon library
- **Tailwind-style CSS** - Inline styling approach

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd appstoch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

## 🔑 Demo Credentials

### Recruiter Login
- **Username**: demo
- **Password**: demo123

### Admin Login
- **Username**: admin
- **Password**: admin123

### Client Access
- **Token**: RFR20T

### Candidate Login
- **Token**: CAND123

## 📁 Project Structure

```
appstoch/
├── src/
│   ├── components/           # Reusable components
│   │   ├── ChatBox.jsx
│   │   ├── CandidateCard.jsx
│   │   └── LeaderCard.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RecruiterDashboard.jsx
│   │   ├── ClientPortal.jsx
│   │   ├── CandidatePortal.jsx
│   │   └── AdminPanel.jsx
│   ├── data/                # Sample data
│   │   └── sampleData.js
│   ├── utils/               # Utility functions
│   │   └── helpers.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 User Roles

### Recruiter
- Manage candidate pool
- Generate client access tokens
- Chat with clients and candidates
- Upload candidates (CSV, TXT, DOCX)
- 5 different view modes for candidates
- Handle connection requests

### Client
- View assigned candidates
- Request connections with candidates
- Chat with assigned recruiter
- Multiple view modes for candidates

### Candidate
- View profile and documents
- Chat with recruiter
- Upload documents
- Track application status

### Admin
- Manage all users
- View technical dashboard
- Handle demo requests
- Edit leadership team profiles
- Full system overview

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📝 Usage Guide

### For Recruiters
1. Login with recruiter credentials
2. Upload candidates using CSV/TXT files or paste data
3. Generate client access tokens
4. Manage candidates using different view modes
5. Chat with clients and candidates
6. Approve/deny connection requests

### For Clients
1. Login with access token
2. View assigned candidates
3. Request connections with candidates
4. Chat with recruiter
5. Switch between view modes

### For Admins
1. Login with admin credentials
2. Create new users
3. Manage leadership team
4. View system metrics
5. Handle demo requests

## 🎨 Customization

### Colors
The platform uses Curious Minds brand colors:
- Purple: `#8B5CF6`
- Pink: `#EC4899`
- Orange: `#F59E0B`
- Green: `#10B981`

### Adding New Candidates
Upload CSV format with headers:
```
name,role,email,location,experience,score,skills,notes,recommendation
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is proprietary software.

## 🔗 Links

- [Live Demo](#)
- [Documentation](#)
- [Support](#)

## ⚠️ Notes

- All video calls use Jitsi Meet
- Chat messages are stored in memory (not persistent)
- File uploads are processed client-side
- Access tokens are generated randomly

## 🐛 Known Issues

None at the moment. Report issues on GitHub.

## 📮 Contact

For questions and support, contact the development team.

---

Built with ❤️ by the Floww Team on Curious Minds Trajectory
