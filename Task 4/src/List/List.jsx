import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, Circle, Clock, ListTodo, Plus, Tag, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import './List.css';

const categories = [
  { id: 'work', name: 'Work', color: '#3b82f6' },
  { id: 'personal', name: 'Personal', color: '#22c55e' },
  { id: 'shopping', name: 'Shopping', color: '#a855f7' },
  { id: 'health', name: 'Health', color: '#ef4444' },
];

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  function saveTodos(updatedTodos) {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  }

  function addTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTask = {
      id: `local-${Date.now()}`,
      text: newTodo,
      category: selectedCategory,
      due_date: dueDate,
      completed: false,
    };

    saveTodos([newTask, ...todos]);
    setNewTodo('');
    setDueDate('');
    toast.success('Todo added successfully');
  }

  function toggleTodo(id) {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
    toast.success('Todo updated');
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
    toast.error('Todo deleted', {
      style: { background: '#ef4444', color: '#fff' }, 
    });
  }
  
  return (
    <div className="todo-container">
      <Toaster position="top-right" />
      <div className="todo-content">
        <div className="todo-header">
          <div className="header-content">
            <ListTodo className="header-icon" />
            <h1>Task Master</h1>
          </div>

          <form onSubmit={addTodo} className="todo-form">
            <div className="input-group">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="todo-input"
              />
              <button type="submit" className="add-button">
                <Plus className="button-icon" />
                Add Task
              </button>
            </div>

            <div className="form-controls">
              <div className="category-select">
                <Tag className="select-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-dropdown"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="date-select">
                <Calendar className="select-icon" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="todos-list">
          {todos.length > 0 ? (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <button onClick={() => toggleTodo(todo.id)} className="toggle-button">
                  {todo.completed ? <CheckCircle2 className="check-icon completed" /> : <Circle className="check-icon" />}
                </button>

                <div className="todo-details">
                  <p className="todo-text">{todo.text}</p>
                  <div className="todo-meta">
                    <span className="category-tag" style={{ backgroundColor: categories.find(c => c.id === todo.category)?.color }}>
                      {categories.find(c => c.id === todo.category)?.name}
                    </span>
                    {todo.due_date && (
                      <span className="due-date">
                        <Clock className="date-icon" />
                        {format(new Date(todo.due_date), 'MMM d, yyyy')}
                      </span>
                    )}
                  </div>
                </div>

                <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                  <Trash2 className="delete-icon" />
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">No todos yet. Add one above!</div>
          )}
        </div>
      </div>
    </div>
  );
}
