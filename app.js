const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up the views directory
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'views') });
});
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});