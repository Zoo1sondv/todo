import React from 'react';
import './TodoList.css';

function TodoList({ list = [], handleDelete = null, handleUpdate = null }) {
    const handleDeleteTodo = (id) => {
        if (!handleDelete) return;
        handleDelete(id);
    };

    return (
        <ul className="todo-list">
            {list.map((todo, index) => {
                return (
                    <li key={todo.id} className="todo">
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={todo.status === 'completed' ? true : false}
                            onChange={(e) => {
                                !!handleUpdate &&
                                    handleUpdate(todo.id, 'status', e.target.checked ? 'completed' : 'new');
                            }}
                        />
                        <input
                            value={todo.message}
                            className={(todo.status === 'completed' ? 'completed' : 'new') + ' task'}
                            onChange={(e) => {
                                !!handleUpdate && handleUpdate(todo.id, 'message', e.target.value);
                            }}
                        />
                        <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>
                            X
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default TodoList;
