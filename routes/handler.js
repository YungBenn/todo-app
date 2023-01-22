import express from 'express';
import Todo from '../models/todo.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Sup dude!',
  });
});

// create todo
router.post('/todos', (req, res) => {
  const todo = new Todo();
  todo.title = req.body.title;

  todo.save((err) => {
    if (err) {
      res.send(err, todos);
    }
    res.json({
      message: 'Todo created!',
    });
  });
});

// get all todos
router.get('/todos', (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
});

// get todo by id
router.get('/todos/:todo_id', (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err) {
      res.send(err);
    }
    res.send(todo);
  });
});

// update todo by id
router.put('/todos/:todo_id', (req, res) => {
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err) {
      res.send(err);
    }
    todo.title = req.body.title;

    todo.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'todo updated' });
    });
  });
});

// delete todo by id
router.delete('/todos/:todo_id', (req, res) => {
  Todo.remove(
    {
      _id: req.params.todo_id,
    },
    (err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    },
  );
});

export default router;
