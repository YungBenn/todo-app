import express from 'express';
import Todo from '../models/todo.js';

const router = express.Router();

// get home page
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.render('index', { todos: todos });
});

// get create page
router.get('/new', (req, res) => {
  res.render('new', { todo: new Todo() });
});

// get edit page
router.get('/edit/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.render('edit', { todo: todo });
});

// create todo
router.post('/', (req, res) => {
  const todo = new Todo();
  todo.title = req.body.title;

  todo.save(() => {
    res.redirect('/');
  });
});

// update todo by id
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) {
      res.send(err);
    }
    todo.title = req.body.title;

    todo.save(() => {
      res.redirect('/');
    });
  });
});

// delete todo by id
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

export default router;
