import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css"; // keep only if you have custom styles

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [error, setError] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) {
      setError("Please enter a meeting code.");
      return;
    }

    try {
      await addToUserHistory(meetingCode);
      navigate(`/${meetingCode}`);
    } catch (err) {
      console.error("Failed to join meeting:", err);
      setError("Could not join meeting. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="navBar flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">TeamConnect</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="btn btn-ghost flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            History
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            className="btn btn-primary"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Meeting Container */}
      <div className="meetContainer flex flex-col md:flex-row items-center justify-between p-6">
        {/* Left Panel */}
        <div className="leftPanel flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">
            Providing Quality Video Call Just Like Quality Education
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Meeting Code"
              value={meetingCode}
              onChange={(e) => {
                setMeetingCode(e.target.value);
                setError("");
              }}
              className="form-input flex-1 px-3 py-2 border rounded-lg"
              required
            />
            <button
              onClick={handleJoinVideoCall}
              className="btn btn-primary px-4"
            >
              Join Meeting
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Right Panel */}
        <div className="rightPanel flex-1 flex justify-center">
          <img
            src="/logo3.png"
            alt="TeamConnect Logo"
            className="max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
