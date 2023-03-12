import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ list, handleSelectAll, onSubmit = null }) => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState(true);

    const handleSubmit = (e) => {
        if (!onSubmit) return;
        if (e.key === 'Enter') {
            onSubmit(value);
            setValue('');
        }
    };

    const handleBtnAll = () => {
        if (!handleSelectAll) return;
        handleSelectAll(selected);
        setSelected(!selected);
    };

    return (
        <div className="todo-form">
            {list.length > 0 && (
                <button className="btn-all" onClick={() => handleBtnAll()}>
                    &#8744;
                </button>
            )}
            <input
                type="text"
                name="task"
                value={value}
                className="input-task"
                placeholder="What need tobe done?"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyPress={(e) => handleSubmit(e)}
            ></input>
        </div>
    );
};

export default TodoForm;
