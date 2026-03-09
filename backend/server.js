const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const apiRoutes = express.Router();

// Contact Route for Email and DB Storage
apiRoutes.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Insert into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) throw error;

    console.log(`Contact message saved from ${name} (${email}): ${message}`);
    res.status(200).json({ success: true, message: 'Message sent and stored successfully.' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Failed to process message.' });
  }
});

// Fetch Projects Route
apiRoutes.get('/projects', async (req, res) => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

// Admin Dashboard mock route
apiRoutes.post('/admin/projects', (req, res) => {
  // logic to edit portfolio items
  res.json({ success: true, message: 'Project updated in dashboard.' });
});

// Resume Download API
apiRoutes.get('/resume', (req, res) => {
  // Replace with actual path to PDF on server
  // res.download('./public/Vishal_Resume.pdf');
  res.json({ message: 'Resume download endpoint. Provide PDF via path here.' });
});

// Analytics tracking
apiRoutes.post('/analytics', (req, res) => {
  console.log('Analytics event logged:', req.body);
  res.status(200).json({ success: true });
});

// App Router mount
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API Backend is Running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
