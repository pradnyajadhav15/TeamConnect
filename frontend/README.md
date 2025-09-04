# TeamConnect - Modern Video Conferencing Platform

## 🚀 Overview

TeamConnect is a modern, responsive video conferencing platform built with React and Node.js. It provides seamless video calls, secure messaging, and team collaboration features with a beautiful, intuitive interface.

## ✨ Features

### 🎥 Video Conferencing
- **HD Video & Audio**: Crystal clear video calls with high-quality audio
- **Screen Sharing**: Share your screen with participants in real-time
- **Multiple Participants**: Support for multiple users in a single meeting
- **Video/Audio Controls**: Mute/unmute audio and enable/disable video
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 💬 Real-time Chat
- **Live Messaging**: Send messages during video calls
- **Message History**: View chat history during meetings
- **User Notifications**: Real-time message notifications
- **Emoji Support**: Rich messaging experience

### 🔐 Security & Privacy
- **End-to-End Encryption**: Secure communication channels
- **User Authentication**: Secure login and registration system
- **Meeting Privacy**: Private meeting rooms with unique codes
- **Guest Access**: Join meetings as a guest without registration

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Themes**: Automatic theme switching based on system preference
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Accessibility**: WCAG compliant design with keyboard navigation
- **Mobile-First**: Touch-friendly interface for mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Socket.io**: Real-time communication
- **WebRTC**: Peer-to-peer video/audio streaming
- **Material-UI**: Component library for consistent design
- **CSS Custom Properties**: Modern CSS with design tokens

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Socket.io**: Real-time bidirectional communication
- **MongoDB**: NoSQL database for data persistence
- **JWT**: JSON Web Tokens for authentication



## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (max-width: 480px) {   /* Mobile */
@media (max-width: 768px) {   /* Tablet */
@media (max-width: 1024px) {  /* Small Desktop */
@media (min-width: 1025px) {  /* Large Desktop */
```

## 🎯 Key Components

### 1. Landing Page (`landing.jsx`)
- Hero section with compelling copy
- Feature highlights with icons
- Call-to-action buttons
- Responsive navigation

### 2. Authentication (`authentication.jsx`)
- Login and registration forms
- Material-UI components
- Form validation
- Error handling

### 3. Home Dashboard (`home.jsx`)
- Meeting code input
- Quick join functionality
- Navigation to history
- User profile management

### 4. Video Meeting (`VideoMeet.jsx`)
- WebRTC video streaming
- Control buttons (mute, video, screen share)
- Chat sidebar
- Participant management

### 5. Meeting History (`history.jsx`)
- Past meetings list
- Meeting details
- Quick rejoin functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Zoom-Clone
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Frontend (.env)
   VITE_API_URL=http://localhost:8000
   
   # Backend (.env)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```

5. **Start the development servers**
   ```bash
   # Start backend
   cd backend
   npm run dev
   
   # Start frontend (in new terminal)
   cd frontend
   npm run dev
   ```

## 🎨 Customization

### Adding New Components
1. Create your component in the appropriate directory
2. Use the existing CSS custom properties for consistency
3. Follow the responsive design patterns
4. Test on multiple screen sizes

### Modifying Colors
Update the CSS custom properties in `src/index.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... other colors */
}
```

### Adding Animations
Use the existing animation classes or create new ones:
```css
.fade-in { animation: fadeIn 0.6s ease-in-out; }
.slide-up { animation: slideUp 0.8s ease-out; }
```

## 📊 Performance Optimizations

### Frontend
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP format with fallbacks
- **CSS Optimization**: Purged unused styles
- **Bundle Analysis**: Vite bundle analyzer

### Backend
- **Caching**: Redis for session management
- **Database Indexing**: Optimized MongoDB queries
- **Compression**: Gzip compression for responses
- **Rate Limiting**: API rate limiting for security

## 🔒 Security Features

- **HTTPS**: Secure communication protocol
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Server-side validation
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Cross-site request forgery prevention

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📈 Analytics & Monitoring

- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Anonymous usage statistics
- **Server Monitoring**: Health checks and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Material-UI**: For the component library
- **Socket.io**: For real-time communication
- **WebRTC**: For peer-to-peer video streaming
- **Vite**: For the fast build tool

## 📞 Support

For support, email support@teamconnect.com or join our Slack channel.

---

**Made with ❤️ by the TeamConnect Development Team**
