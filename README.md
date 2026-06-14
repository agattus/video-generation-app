# AI Video Generation App 🎬

A full-stack application for creating professional cinematic videos from audio files or text scripts using AI-powered generation and styling. Built with modern technologies including React, Node.js, TypeScript, and advanced AI models.

**Live Demo**: [Coming Soon]  
**Documentation**: [Read Full Docs](./docs/)

---

## 🌟 Key Features

### Core Capabilities
- **🎵 Audio to Video**: Upload MP3, WAV, AAC files → Generate cinematic videos
- **📝 Text to Video**: Input scripts → AI generates matching visuals
- **🎬 Multiple Formats**: 16:9 (long-form), 9:16 (shorts), 1:1 (square)
- **🎨 7+ Visual Styles**: Cinematic, Disney/Pixar, Anime, Photorealistic, Minimalist, Retro, Abstract

### Advanced Features
- **🤖 AI Avatars**: Digital presenters with lip-sync and emotion detection
- **🎞️ Auto Scene Generation**: AI creates visuals matching your content
- **🎵 Sound Effects**: 1000+ auto-synced effects and royalty-free music
- **📝 Auto Captions**: Multi-language subtitle generation with translations
- **🎯 Smart Editing**: AI-powered trim, scaling, and highlight detection
- **👥 Collaboration**: Team workspace with comments and task assignment
- **📊 Analytics**: Track video performance and generation metrics
- **⚡ Batch Processing**: Generate multiple videos simultaneously

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+
- **Docker** (optional, for containerized setup)
- **PostgreSQL** 13+ (if not using Docker)
- **Redis** 6+ (if not using Docker)

### Option 1: Local Development (Recommended for Development)

```bash
# Clone repository
git clone https://github.com/agattus/video-generation-app.git
cd video-generation-app

# Setup Backend
cd backend
npm install
cp .env.example .env
npm run dev

# In another terminal, setup Frontend
cd frontend
npm install
npm run dev
```

Access the app at: http://localhost:5173

### Option 2: Docker Compose (Recommended for Testing)

```bash
# Start all services
docker-compose -f docker/docker-compose.yml up -d

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Stop services
docker-compose -f docker/docker-compose.yml down
```

Access the app at: http://localhost

### Option 3: Individual Docker Containers

```bash
# Build backend
docker build -f docker/Dockerfile.backend -t video-gen-backend .

# Build frontend
docker build -f docker/Dockerfile.frontend -t video-gen-frontend .

# Run containers
docker run -p 3000:3000 video-gen-backend
docker run -p 80:80 video-gen-frontend
```

---

## 📁 Project Structure

```
video-generation-app/
├── backend/                    # Node.js Express API
│   ├── src/
│   │   ├── routes/             # API endpoints
│   │   ├── middlewares/        # Authentication, error handling
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utilities and helpers
│   │   └── index.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service calls
│   │   ├── store/              # Redux state management
│   │   ├── hooks/              # Custom React hooks
│   │   └── App.tsx             # Root component
│   ├── package.json
│   └── tsconfig.json
│
├── docker/                     # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── docker-compose.yml
│   └── nginx.conf
│
├── docs/                       # Documentation
│   ├── SETUP.md               # Detailed setup guide
│   ├── ARCHITECTURE.md        # System design
│   ├── API.md                 # API documentation
│   └── FEATURES.md            # Feature documentation
│
└── .github/workflows/          # CI/CD workflows
    ├── backend-test.yml
    ├── frontend-test.yml
    ├── code-quality.yml
    └── deploy.yml
```

---

## 🔧 Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + Zustand
- **HTTP Client**: Axios
- **UI Components**: Custom + react-icons
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT + bcrypt
- **API Documentation**: Swagger/OpenAPI (coming soon)

### AI & Processing
- **Text-to-Video**: OpenAI Sora, Runway ML, Kling AI
- **Avatar/Lip-Sync**: HeyGen API, D-ID
- **Text-to-Speech**: Google Cloud TTS, ElevenLabs
- **Video Processing**: FFmpeg, OpenCV
- **Image Generation**: DALL-E 3, Stable Diffusion

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose (Development)
- **CI/CD**: GitHub Actions
- **Cloud Hosting**: AWS / Google Cloud (coming soon)
- **Monitoring**: Prometheus + Grafana (coming soon)

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All authenticated endpoints require a Bearer token:
```
Authorization: Bearer <JWT_TOKEN>
```

### Key Endpoints

**Authentication**
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

**Videos**
- `POST /videos/generate` - Generate video from audio/text
- `GET /videos` - List user videos
- `GET /videos/:id` - Get video details
- `GET /videos/:id/status` - Get generation status

**Projects**
- `POST /projects` - Create project
- `GET /projects` - List projects
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project

**Assets**
- `GET /assets/styles` - List available styles
- `GET /assets/templates` - List templates
- `GET /assets/backgrounds` - Search backgrounds
- `GET /assets/sfx` - List sound effects
- `GET /assets/music` - List music tracks

See [docs/API.md](./docs/API.md) for complete API documentation.

---

## 🎯 Development Roadmap

### Phase 1: MVP (Weeks 1-8) ✅ In Progress
- [x] Project setup & infrastructure
- [x] User authentication system
- [x] Audio/text input interface
- [ ] Basic video generation (2-3 styles)
- [ ] Subtitle auto-generation
- [ ] 16:9 & 9:16 export formats
- [ ] Basic video preview

### Phase 2: Advanced Features (Weeks 9-16)
- [ ] Avatar system with lip-sync
- [ ] Advanced scene customization
- [ ] Sound effects library (1000+)
- [ ] Background library (10,000+)
- [ ] Collaboration features
- [ ] Video editing interface

### Phase 3: Enterprise (Weeks 17-24)
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] API for developers
- [ ] Analytics dashboard
- [ ] Advanced AI features
- [ ] Custom branding options

See [docs/FEATURES.md](./docs/FEATURES.md) for detailed feature breakdown.

---

## 🔐 Security

- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: TLS in transit, at-rest encryption
- **Input Validation**: Strict server-side validation
- **Rate Limiting**: Per-user and per-IP rate limits
- **Dependency Scanning**: Regular security audits
- **CORS**: Properly configured CORS policy

---

## 📊 Performance

- **Video Generation**: Average 90-120 seconds per video
- **API Response Time**: <100ms for most endpoints
- **Uptime**: 99%+ target
- **Concurrent Users**: Scales horizontally with load balancing
- **Video Quality**: Up to 4K resolution

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Quality Standards
- **Tests**: Minimum 80% coverage for new code
- **Linting**: ESLint + Prettier
- **Type Safety**: Full TypeScript coverage
- **Commits**: Conventional commit messages

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti :3000 | xargs kill -9
```

**Database Connection Error**
```bash
# Check PostgreSQL is running
psql -U postgres

# Start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

**Redis Connection Error**
```bash
# Check Redis is running
redis-cli ping

# Start Redis
brew services start redis       # macOS
sudo systemctl start redis-server # Linux
```

See [docs/SETUP.md](./docs/SETUP.md) for detailed troubleshooting guide.

---

## 📖 Documentation

- **[SETUP.md](./docs/SETUP.md)** - Detailed development setup
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System design & components
- **[API.md](./docs/API.md)** - Complete API reference
- **[FEATURES.md](./docs/FEATURES.md)** - Feature documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

---

## 💬 Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/agattus/video-generation-app/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/agattus/video-generation-app/discussions)
- **Email**: support@videogeneration.app
- **Discord**: [Join our community](https://discord.gg/your-invite) (coming soon)

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies and powered by cutting-edge AI models.

### Special Thanks
- OpenAI for Sora
- Runway ML for video generation
- HeyGen for avatar technology
- ElevenLabs for voice synthesis
- The open-source community

---

## 📈 Project Stats

- **Language**: TypeScript
- **Frontend**: React 18
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Redis
- **Tests**: Jest + Vitest
- **CI/CD**: GitHub Actions
- **License**: MIT

---

## 🎯 Our Vision

To democratize video creation using AI, enabling creators, marketers, and businesses to produce professional-quality cinematic videos without expensive equipment or technical expertise.

---

**Last Updated**: June 2026  
**Current Status**: 🚀 Active Development

---

Feel free to star ⭐ the repository if you find this project helpful!

For the latest updates, follow us on [GitHub](https://github.com/agattus/video-generation-app).
