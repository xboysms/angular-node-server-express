import { Router } from "express";
import { config } from "../middleware/config";

const users: any[] = []; // Dummy in-memory users
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Request, Response } from 'express';
dotenv.config();

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}
let tasks: Task[] = []; // Dummy in-memory task store

const router = Router();

// Auth
router.post('/register', (req, res: any) => {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ error: 'Username and password required' });

    // Hash password
    const hashedPassword = bcrypt.hash(password, 10);
    const user = { id: Date.now(), username, password: hashedPassword };
    users.push(user);
    res.status(201).json(user);
});

router.post('/login', (req, res: any) => {
    const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        if (!user) return res.json({ error: 'Invalid credentials' });
    
        const valid = bcrypt.compare(password, user.password);
        if (!valid) return res.json({ error: 'Invalid credentials' });
    
        const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token });
});

// Task
router.post('/addTask', (req, res: any) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newTask: Task = { id: Date.now(), title, description, dueDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.get('/getTasks', (req, res: any) => {
  // Sort tasks by due date
  const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  res.json(sortedTasks);
});

router.get('/getTaskById', (req, res: any) => {
  const id = parseInt(req.body.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.put('/updateTask', (req, res: any) => {
  const id = parseInt(req.body.id);
  const { title, description, dueDate } = req.body;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  
  tasks[index] = { id, title, description, dueDate };
  res.json(tasks[index]);
});

router.delete('/deleteTask/:id', (req, res: any) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

export default router;
