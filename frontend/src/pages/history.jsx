import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Box,
  CardContent,
  Button,
  Typography,
  IconButton,
  Container,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import {
  Home as HomeIcon,
  VideoCall as VideoCallIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import './History.css'; // We'll create this CSS file

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const history = await getHistoryOfUser();
      setMeetings(history || []);
    } catch (err) {
      setError('Failed to load meeting history. Please try again.');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  }, [getHistoryOfUser]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatDate = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return 'Invalid date';
    }
  }, []);

  const joinMeeting = useCallback((meetingCode) => {
    navigate(`/${meetingCode}`);
  }, [navigate]);

  const getTimeAgo = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }, []);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your meeting history...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="history-container">
      {/* Header */}
      <Paper elevation={2} className="history-header">
        <Box className="header-content">
          <Box className="header-title">
            <IconButton 
              onClick={() => navigate("/home")}
              className="home-button"
              aria-label="Go to home"
              size="large"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h4" component="h1" className="title">
              Meeting History
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchHistory}
            disabled={loading}
            className="refresh-button"
          >
            Refresh
          </Button>
        </Box>
        
        <Typography variant="body1" color="text.secondary" className="subtitle">
          Your recent video meeting sessions
        </Typography>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          className="error-alert"
        >
          {error}
        </Alert>
      )}

      {/* Empty State */}
      {meetings.length === 0 && !loading && !error && (
        <Paper elevation={2} className="empty-state">
          <VideoCallIcon className="empty-icon" />
          <Typography variant="h6" className="empty-title">
            No meetings yet
          </Typography>
          <Typography variant="body2" color="text.secondary" className="empty-subtitle">
            Your meeting history will appear here once you join or create meetings
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/home")}
            className="empty-action"
          >
            Start a Meeting
          </Button>
        </Paper>
      )}

      {/* Meetings Grid */}
      {meetings.length > 0 && (
        <Grid container spacing={3} className="meetings-grid">
          {meetings.map((meeting, index) => (
            <Grid item xs={12} sm={6} md={4} key={meeting._id || index}>
              <Card elevation={3} className="meeting-card">
                <CardContent className="card-content">
                  {/* Meeting Code */}
                  <Box className="meeting-header">
                    <Chip
                      label={meeting.meetingCode}
                      color="primary"
                      variant="outlined"
                      className="meeting-code"
                    />
                    <Chip
                      label={getTimeAgo(meeting.date)}
                      size="small"
                      color="secondary"
                      variant="filled"
                    />
                  </Box>

                  {/* Date and Time */}
                  <Box className="meeting-details">
                    <Box className="detail-item">
                      <CalendarIcon className="detail-icon" />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(meeting.date)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                {/* Actions */}
                <Box className="card-actions">
                  <Button
                    variant="contained"
                    startIcon={<VideoCallIcon />}
                    onClick={() => joinMeeting(meeting.meetingCode)}
                    className="join-button"
                    fullWidth
                  >
                    Join Again
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}