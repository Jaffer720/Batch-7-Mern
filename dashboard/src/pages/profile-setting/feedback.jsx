import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { height } from '@mui/system';
import { Height } from '@mui/icons-material';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process feedback submission (e.g., send to an API)
    const feedbackData = {
      feedback,
      rating,
      email,
    };
    console.log('Feedback submitted:', feedbackData);
    // Clear the form after submission
    setFeedback('');
    setRating('');
    setEmail('');
  };

  return (
    <Box mt={4} sx={{ height: '700px' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            We value your feedback!
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Feedback input */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your feedback"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </Grid>

              {/* Rating input */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Rating</InputLabel>
                  <Select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  >
                    <MenuItem value={1}>1 Star</MenuItem>
                    <MenuItem value={2}>2 Stars</MenuItem>
                    <MenuItem value={3}>3 Stars</MenuItem>
                    <MenuItem value={4}>4 Stars</MenuItem>
                    <MenuItem value={5}>5 Stars</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Optional email input */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email (optional)"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              {/* Submit button */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit Feedback
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FeedbackForm;
