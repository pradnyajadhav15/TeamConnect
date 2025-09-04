import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Video, Users, Shield, Calendar, MessageSquare } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50">
        <h2 className="text-2xl font-bold text-blue-600">TeamConnect</h2>
        <div className="flex gap-6 items-center text-gray-700 font-medium">
          <button
            onClick={() => navigate("/aljk23")} // TODO: replace with dynamic/random code
            className="hover:text-blue-600"
          >
            Join as Guest
          </button>
          <Link to="/auth" className="hover:text-blue-600">
            Register
          </Link>
          <Link
            to="/auth"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-orange-500">Connect</span> with your team &{" "}
            loved ones
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Seamless video calls, secure chats, and smart scheduling — all in
            one platform.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/auth"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <button
              onClick={() => navigate("/aljk23")} // TODO: replace with dynamic/random code
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Join as Guest
            </button>
          </div>
        </div>
        <img
          src="/mobile.png"
          alt="TeamConnect app preview"
          className="w-full md:w-1/2"
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why TeamConnect?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="text-center p-6 shadow rounded-xl hover:shadow-lg transition">
            <Video className="mx-auto text-blue-600" size={40} />
            <h3 className="font-semibold text-lg mt-4">HD Video & Audio</h3>
            <p className="text-gray-600 mt-2">
              Crystal clear calls with zero lag.
            </p>
          </div>
          <div className="text-center p-6 shadow rounded-xl hover:shadow-lg transition">
            <Shield className="mx-auto text-green-600" size={40} />
            <h3 className="font-semibold text-lg mt-4">Secure & Encrypted</h3>
            <p className="text-gray-600 mt-2">
              Privacy first with end-to-end encryption.
            </p>
          </div>
          <div className="text-center p-6 shadow rounded-xl hover:shadow-lg transition">
            <Users className="mx-auto text-purple-600" size={40} />
            <h3 className="font-semibold text-lg mt-4">Team Collaboration</h3>
            <p className="text-gray-600 mt-2">
              Chats, whiteboards & screen share.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="text-center">
            <Calendar className="mx-auto text-indigo-600" size={40} />
            <h3 className="font-semibold mt-4">1. Create Meeting</h3>
            <p className="text-gray-600 mt-2">
              Sign up and schedule or start instantly.
            </p>
          </div>
          <div className="text-center">
            <MessageSquare className="mx-auto text-orange-500" size={40} />
            <h3 className="font-semibold mt-4">2. Share Link</h3>
            <p className="text-gray-600 mt-2">
              Invite your team with one click.
            </p>
          </div>
          <div className="text-center">
            <Users className="mx-auto text-green-600" size={40} />
            <h3 className="font-semibold mt-4">3. Collaborate</h3>
            <p className="text-gray-600 mt-2">
              Work together in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-3xl font-bold">Ready to connect?</h2>
        <p className="mt-4">Join thousands of teams using TeamConnect today.</p>
        <div className="mt-6">
          <Link
            to="/auth"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} TeamConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
