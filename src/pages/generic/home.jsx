import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const DATE = new Date();
    const TARGET = 10;
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const inputRef = useRef(null);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('done-list-tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('done-list-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            const task = {
                id: Date.now(),
                title: newTask.trim(),
                completed: false,
                createdAt: new Date().toISOString()
            };
            setTasks(prev => [...prev, task]);
            setNewTask('');
            inputRef.current?.focus();
        }
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length > 0 ? (completedTasks / Math.min(tasks.length, TARGET)) * 100 : 0;

    return (
        <div className="h-dvh px-30 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-2xl text-[var(--text)] font-bold">
                    Welcome back, <span className="font-bold text-[var(--primary)]">John</span>
                </p>
                <p className="text-2xl text-[var(--primary)]">
                    {DATE.getDate()}/{DATE.getMonth() + 1}/{DATE.getFullYear()}
                </p>
            </div>

            <div className="w-full h-0.5 bg-[var(--border)] my-6"/>

            <p className="font-bold text-[var(--text)] text-xl mb-4">Let's see today's progress</p>
            <div className="h-10 w-full rounded-full my-5 bg-[var(--border)] relative overflow-hidden">
                <p className="text-2xl text-[var(--text)] absolute inset-0 flex items-center justify-center z-10">
                    {Math.round(progress)}%
                </p>
                <div
                    className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Add Task Input */}
            <div className="relative mb-6">
                <input
                    ref={inputRef}
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new task..."
                    className="w-full h-13 rounded-2xl p-3 pl-12 border-2 border-[var(--border)] bg-[var(--card)] text-white placeholder-gray-400 focus:border-[var(--primary)] focus:outline-none transition-colors duration-200"
                />
                <button
                    onClick={addTask}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-white rounded-xl px-4 py-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newTask.trim()}
                >
                    Add
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

            <div className="w-full h-0.5 bg-[var(--border)] my-6"/>

            <div className="flex justify-between w-full gap-6">
                {/* Tasks List */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-4">Your Tasks ({tasks.length})</h3>
                    {tasks.length === 0 ? (
                        <div className="text-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12 mx-auto text-gray-400 mb-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 18 4.5H6a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 6 19.5Z" />
                            </svg>
                            <p className="text-gray-400">No tasks yet. Add one above!</p>
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {tasks.map((task, index) => (
                                <div
                                    key={task.id}
                                    className={`border-2 border-[var(--border)] rounded-xl px-4 py-3 flex items-center justify-between transition-all duration-200 hover:border-[var(--primary)]/50 ${
                                        task.completed ? 'bg-[var(--hover)]' : 'bg-[var(--card)]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`w-6 h-6 rounded-full border-2 border-[var(--primary)] flex items-center justify-center transition-all duration-200 ${
                                                task.completed ? 'bg-[var(--primary)]' : 'hover:bg-[var(--primary)]/20'
                                            }`}
                                        >
                                            {task.completed && (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" className="size-4">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            )}
                                        </button>
                                        <p className={`text-[var(--text)] transition-all duration-200 ${
                                            task.completed ? 'line-through text-gray-400' : ''
                                        }`}>
                                            {task.title}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-0.5 bg-[var(--border)] my-3"/>

                {/* Stats Card */}
                <div className="border-2 border-[var(--border)] rounded-2xl px-6 py-4 min-w-80">
                    <div className="flex gap-4 items-center mb-4">
                        <div className="bg-[var(--primary)] rounded-full p-3 outline-2 outline-[var(--border)]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[var(--text)] text-xl font-semibold">Tasks Completed</p>
                            <p className="text-[var(--primary)] text-4xl font-bold">{completedTasks} <span className="text-[var(--text)] text-lg">/ {tasks.length}</span></p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[var(--text)]">Progress</span>
                            <span className="text-[var(--primary)] font-semibold">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <div className="pt-2 border-t border-[var(--border)]">
                            <p className="text-[var(--text)] text-sm">
                                {completedTasks === 0 ? 'Start completing tasks to see progress!' :
                                 completedTasks === tasks.length ? 'All tasks completed! 🎉' :
                                 `Keep going! ${tasks.length - completedTasks} tasks remaining.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
