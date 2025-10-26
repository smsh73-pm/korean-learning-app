# Korean Language Learning App - Development Setup

## Prerequisites
- Node.js 18+ 
- PostgreSQL database
- API keys for OpenAI, Anthropic, and Google AI

## Installation

1. **Clone and install dependencies:**
```bash
cd "Korean Language"
npm install
```

2. **Set up environment variables:**
```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/korean_learning_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# AI API Keys
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
GOOGLE_AI_API_KEY="your-google-ai-api-key"
```

3. **Set up the database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Features Implemented

### ✅ Core Features
- **Multi-language Support**: English, Bahasa Malaysia, Korean interface
- **User Authentication**: NextAuth.js with credentials and Google OAuth
- **Korean Level Assessment**: AI-powered placement test
- **Voice Interface**: Web Speech API integration for pronunciation practice
- **AI Conversation Partners**: Multiple personality types for speaking practice
- **K-Content Integration**: YouTube integration for cultural learning
- **Quiz System**: AI-generated questions and assessments
- **Progress Tracking**: Comprehensive user progress and achievements
- **PWA Support**: Offline functionality and mobile app-like experience

### 🎯 Key Pages
- **Welcome Screen**: Multi-language onboarding and authentication
- **Dashboard**: Personalized learning overview and quick actions
- **Level Test**: Comprehensive Korean proficiency assessment
- **Learn**: Structured curriculum with swipe-based lessons
- **Practice**: AI conversation partners with voice recognition
- **K-Explore**: Korean cultural content with learning overlays
- **Profile**: User settings, achievements, and progress tracking

### 🤖 AI Integration
- **OpenAI GPT-4**: Conversation generation and quiz creation
- **Anthropic Claude**: Text analysis and cultural insights
- **Google Gemini**: Content analysis and multimodal learning
- **AI Orchestration**: Intelligent routing between AI services

### 📱 Mobile-First Design
- **Malaysian-Optimized UI**: Tropical minimalism with K-aesthetic
- **Touch-Friendly**: Swipe navigation and gesture support
- **Offline Support**: Service worker for offline learning
- **PWA Features**: Installable app with native-like experience

## Project Structure

```
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── learn/            # Learning page
│   ├── practice/         # Practice page
│   ├── explore/          # K-content exploration
│   ├── profile/          # User profile
│   └── level-test/       # Korean level assessment
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/               # Base UI components
├── lib/                  # Utility functions and services
│   ├── ai-services.ts    # AI integration services
│   ├── prisma.ts         # Database client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks

# Database
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes
npx prisma studio       # Open database GUI
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy to your preferred hosting platform

## API Endpoints

- `POST /api/conversation` - Generate AI conversation responses
- `POST /api/quiz` - Generate quiz questions
- `POST /api/lesson` - Generate personalized lessons
- `[...nextauth]` - NextAuth.js authentication routes

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **PWA support**: Installable on mobile devices
- **Voice recognition**: Chrome, Edge (Web Speech API)

## Contributing

This is a comprehensive Korean language learning platform designed specifically for Malaysian users. The codebase follows modern React/Next.js patterns with TypeScript for type safety.

## License

This project is created for educational purposes. Please ensure you have proper API keys and database setup before running in production.
