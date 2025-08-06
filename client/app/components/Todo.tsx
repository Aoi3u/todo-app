import React, { useState } from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/useTodos";
import { API_URL } from "@/constants/url";

type TodoProps = {
    todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const { todos, isLoading, error, mutate } = useTodos();

    const handleEdit = async () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            const response = await fetch(
                `http://localhost:8080/todos/${todo.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: editedTitle }),
                }
            );

            if (response.ok) {
                const editedTodo = await response.json();
                const updatedTodos = todos.map((item: TodoType) =>
                    item.id === todo.id ? editedTodo : item
                );
                mutate(updatedTodos);
                setEditedTitle("");
            }
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8080/todos/${todo.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const deletedTodo = await response.json();
            const updatedTodos = todos.map((item: TodoType) =>
                item.id === todo.id ? deletedTodo : item
            );
            mutate(updatedTodos);
        }
    };

    const toggleTodoCompletion = async (id: number, isCompleted: boolean) => {
        const response = await fetch(`${API_URL}/todos/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isCompleted: !isCompleted }),
        });

        if (response.ok) {
            const toggledTodo = await response.json();
            const updatedTodos = todos.map((item: TodoType) =>
                item.id === todo.id ? toggledTodo : item
            );
            mutate(updatedTodos);
        }
    };

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <div className="p-6 hover:bg-gray-50/50 transition-all duration-200">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                            <input
                                id={`todo-${todo.id}`}
                                name={`todo-${todo.id}`}
                                type="checkbox"
                                checked={todo.isCompleted}
                                className="h-5 w-5 text-gray-600 bg-white border-2 border-gray-300 rounded-md focus:ring-gray-400 focus:ring-2 focus:ring-offset-0 transition-all duration-200 cursor-pointer hover:border-gray-400"
                                onChange={() =>
                                    toggleTodoCompletion(
                                        todo.id,
                                        todo.isCompleted
                                    )
                                }
                            />
                        </div>

                        <div className={`flex-1 ${todo.isCompleted ? "line-through" : ""}`}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) =>
                                        setEditedTitle(e.target.value)
                                    }
                                    className="w-full text-lg font-medium text-gray-800 bg-transparent border-none outline-none focus:outline-none px-0 py-1 border-b-2 border-gray-300 focus:border-gray-600 transition-colors duration-200"
                                    autoFocus
                                />
                            ) : (
                                <label
                                    htmlFor={`todo-${todo.id}`}
                                    className="block text-lg font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200 cursor-pointer select-none"
                                >
                                    {todo.title}
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="p-2 text-gray-600 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 group"
                            title={isEditing ? "保存" : "編集"}
                            onClick={handleEdit}
                        >
                            {isEditing ? (
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            )}
                        </button>

                        <button
                            className="p-2 text-gray-500 hover:text-white hover:bg-gray-500 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 group"
                            title="削除"
                            onClick={handleDelete}
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
