import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

export const useTodo = (initialState = []) => {
  const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  };

  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onhandleRemove = (id) => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: id,
    };
    dispatch(action);
  };

  const handleToggleTodo = (id) => {
    const action = {
      type: '[TODO] Toggle Todo',
      payload: id,
    };
    dispatch(action);
  };
  const handleNewTodo = (e, todo, onResetForm) => {
    e.preventDefault();
    if (todo.description.length <= 1) {
      return alert('La descripción debe tener al menos 2 caracteres');
    }

    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    };
    dispatch(action);
    onResetForm();
  };

  const todosCount = todos.length;

  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    handleNewTodo,
    handleToggleTodo,
    onhandleRemove,
    pendingTodosCount,
    todosCount,
  };
};
