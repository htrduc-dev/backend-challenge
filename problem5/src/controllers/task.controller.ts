
import { Request, Response } from 'express';
import { db } from '../config/db';

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const [result]: any = await db.execute(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description || null, status || 'pending']
    );

    return res.status(201).json({
      message: 'Task created successfully',
      id: result.insertId,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getTasks(req: Request, res: Response) {
  try {
    const { status } = req.query;

    let sql = 'SELECT * FROM tasks';
    const params: any[] = [];

    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC';

    const [rows] = await db.execute(sql, params);

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [rows]: any = await db.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [result]: any = await db.execute(
      `UPDATE tasks 
       SET title = ?, description = ?, status = ?
       WHERE id = ?`,
      [title, description || null, status || 'pending', id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [result]: any = await db.execute(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}