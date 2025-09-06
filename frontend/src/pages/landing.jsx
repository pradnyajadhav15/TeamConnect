import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // We'll create this CSS file
import { Github, Linkedin, Instagram } from "lucide-react";

export default function LandingPage() {
    
   
     
    const router = useNavigate();

    const features = [
        {
            title: "High Quality Video",
            description: "Crystal clear video calls with HD quality",
            icon: "🎥"
        },
        {
            title: "Secure Meetings",
            description: "End-to-end encryption for your privacy",
            icon: "🔒"
        },
        {
            title: "Screen Sharing",
            description: "Share your screen with participants",
            icon: "🖥️"
        },
        {
            title: "Chat Messaging",
            description: "Real-time chat during meetings",
            icon: "💬"
        }
    ];

    const testimonials = [
        {
            name: "Sarah",
            role: "Marketing Manager",
            comment: "TeamConnect has transformed how our remote team collaborates. The video quality is exceptional!",
            avatar: "👩‍💼"
        },
        {
            name: "Michael",
            role: "Software Engineer",
            comment: "The screen sharing feature is flawless. It makes technical discussions so much easier.",
            avatar: "👨‍💻"
        },
        {
            name: "Piya",
            role: "Teacher",
            comment: "I use TeamConnect for my online classes. It's reliable and easy for my students to use.",
            avatar: "👩‍🏫"
        }
    ];

    return (
        <div className='landingPageContainer'>
            {/* Navigation Bar */}
            <nav className="landing-nav">
                <div className='navHeader'>
                    <h2>TeamConnect</h2>
                </div>
                <div className='navlist'>
                    <a href="#features">Features</a>
                    <a href="#testimonials">Testimonials</a>
                    <a href="#faq">FAQ</a>
                    <p onClick={() => router("/aljk23")}>Join as Guest</p>
                    <button className="nav-button" onClick={() => router("/auth")}>
                        Login
                    </button>
                    <button className="nav-button primary" onClick={() => router("/auth")}>
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1><span className="accent-text">Connect</span> with your loved Ones</h1>
                    <p className="hero-subtitle">Premium video conferencing solution for teams, friends, and family</p>
                    <div className="hero-buttons">
                        <button className="cta-button primary" onClick={() => router("/auth")}>
                            Get Started Free
                        </button>
                        <button className="cta-button secondary" onClick={() => router("/aljk23")}>
                            Join as Guest
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <h3>8000+</h3>
                            <p>Active Users</p>
                        </div>
                        <div className="stat">
                            <h3>99.9%</h3>
                            <p>Uptime</p>
                        </div>
                        <div className="stat">
                            <h3>10+</h3>
                            <p>Countries</p>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/connect.jpg" alt="TeamConnect App" />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2>Powerful Features</h2>
                    <p>Everything you need for seamless communication</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="section-header">
                    <h2>How It Works</h2>
                    <p>Get started in just a few simple steps</p>
                </div>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Create an Account</h3>
                        <p>Sign up for free in less than a minute</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Start a Meeting</h3>
                        <p>Create a new meeting or join an existing one</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Invite Others</h3>
                        <p>Share the meeting link with participants</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Connect & Collaborate</h3>
                        <p>Enjoy high-quality video conferencing</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="section-header">
                    <h2>What Our Users Say</h2>
                    <p>Join thousands of satisfied users worldwide</p>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-content">
                                <p>"{testimonial.comment}"</p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{testimonial.avatar}</div>
                                <div className="testimonial-info">
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="faq-section">
                <div className="section-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Find answers to common questions about TeamConnect</p>
                </div>
                <div className="faq-container">
                    <div className="faq-item">
                        <h3>Is TeamConnect free to use?</h3>
                        <p>Yes, TeamConnect offers a free plan with all essential features. We also have premium plans with additional capabilities for larger teams.</p>
                    </div>
                    <div className="faq-item">
                        <h3>How many participants can join a meeting?</h3>
                        <p>Our free plan supports up to 10 participants per meeting. Premium plans can accommodate up to 100 participants.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Do I need to download any software?</h3>
                        <p>No, TeamConnect works directly in your web browser. We also offer mobile apps for iOS and Android for on-the-go access.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Is my data secure with TeamConnect?</h3>
                        <p>Absolutely. We use end-to-end encryption and follow industry best practices to ensure your data remains private and secure.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of teams already using TeamConnect</p>
                    <div className="cta-buttons">
                        <button className="cta-button primary large" onClick={() => router("/auth")}>
                            Sign Up Free
                        </button>
                        <button className="cta-button secondary large" onClick={() => router("/aljk23")}>
                            Join a Meeting
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>TeamConnect</h3>
                        <p>Premium video conferencing made simple and accessible for everyone.</p>
                        {/* <div className="social-links">
                          
                            <a href="https://github.com/pradnyajadhav15" aria-label="GitHub">🐦</a>
                            <a href="https://www.linkedin.com/in/pradnya-jadhav-173199348/" aria-label="LinkedIn">👔</a>
                            <a href="https://www.instagram.com/pradnya_j24/#" aria-label="Instagram">📸</a>
                        </div> */}
                        

                         

                        <div className="social-links flex gap-4">
      <a
        href="https://github.com/pradnyajadhav15"
        aria-label="GitHub"
        className="hover:scale-110 transition-transform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="w-7 h-7 stroke-[1.5] hover:stroke-[2]" />
      </a>

      <a
        href="https://www.linkedin.com/in/pradnya-jadhav-173199348/"
        aria-label="LinkedIn"
        className="hover:scale-110 transition-transform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="w-7 h-7 stroke-[1.5] hover:stroke-[2]" />
      </a>

      <a
        href="https://www.instagram.com/pradnya_j24/#"
        aria-label="Instagram"
        className="hover:scale-110 transition-transform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram className="w-7 h-7 stroke-[1.5] hover:stroke-[2]" />
      </a>
    </div>
                    </div>
                    <div className="footer-section">
                        <h4>Product</h4>
                        <a href="#features">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Use Cases</a>
                        <a href="#">Integrations</a>
                    </div>
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <a href="#">Blog</a>
                        <a href="#">Tutorials</a>
                        <a href="#">Support</a>
                        <a href="#">Documentation</a>
                    </div>
                    <div className="footer-section">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Contact</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TeamConnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
