import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import JobRequest from './models/jobs.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('Database Connection Error:', err));

// 1. Get all job requests (with optional filtering)
app.get('/api/jobs', async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
});

// 2. Get a single job request by ID
app.get('/api/jobs/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job request not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
});

// 3. Create a new job request
app.post('/api/jobs', async (req, res, next) => {
  try {
    const newJob = new JobRequest(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
});

// 4. Update the status of a job request
app.patch('/api/jobs/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status value' });
    }

    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job request not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
});

// 5. Delete a job request
app.delete('/api/jobs/:id', async (req, res, next) => {
  try {
    const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job request not found' });
    }
    res.status(200).json({ message: 'Job request deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));