import React from "react";
import { TodoType } from "../types";

type TodoProps = {
  todo: TodoType;
}
const Todo = ({ todo }: TodoProps) => {
    return (
        <div>
            <div className="divide-y divide-gray-100">
                <div className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    id="todo1"
                                    name="todo1"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 bg-white border-2 border-gray-300 
                  rounded-md focus:ring-indigo-500 focus:ring-2 focus:ring-offset-0
                  transition-colors duration-200 cursor-pointer"
                                />
                            </div>
                            <label
                                htmlFor="todo1"
                                className="flex-1 cursor-pointer"
                            >
                                <span
                                    className="text-lg font-medium text-gray-800 hover:text-indigo-600 
                      transition-colors duration-200"
                                >
                                    { todo.title }
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                className="p-2 text-emerald-600 hover:text-white hover:bg-emerald-500 
                rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                title="編集"
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </button>
                            <button
                                className="p-2 text-red-500 hover:text-white hover:bg-red-500 
                rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                title="削除"
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
        </div>
    );
};

export default Todo;
