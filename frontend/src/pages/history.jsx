import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  const fetchHistory = useCallback(async () => {
    try {
      const history = await getHistoryOfUser();
      setMeetings(history);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      // TODO: Show Snackbar for error
    }
  }, [getHistoryOfUser]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Meeting History</h1>
        <button
          onClick={() => routeTo("/home")}
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </button>
      </div>

      <div className="grid gap-4">
        {meetings.length > 0 ? (
          meetings.map((e, i) => (
            <div key={i} className="card">
              <div className="card-header flex justify-between items-center">
                <h3 className="card-title">Meeting Code: {e.meetingCode}</h3>
                <span className="badge badge-primary">Completed</span>
              </div>
              <div className="card-content">
                <p className="text-gray-600">Date: {formatDate(e.date)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No meeting history found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
