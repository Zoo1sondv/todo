import TodoFeature from './features/TodoFeature';
import './App.css';
import { Route } from 'react-router';

export default function App() {
    return (
        <div className="todo-app">
            <div className="background">todos</div>
            <TodoFeature />
        </div>
    );
}
