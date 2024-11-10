import express from 'express';
import dotenv from 'dotenv';
import { TeacherAgent } from './agents/teacherAgent.js';

dotenv.config();

const app = express();
app.use(express.json());

const teacherAgent = new TeacherAgent();

app.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    const response = await teacherAgent.processMessage(message, context);
    res.json(response);
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Teacher's chatbot running on port ${PORT}`);
});