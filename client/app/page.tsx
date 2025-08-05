"use client";
import Todo from "./components/Todo";
import useSWR from "swr";
import { TodoType } from "./types";

async function fetcher(key: string) {
    return fetch(key).then((res) => res.json());
}

export default function Home() {
    const { data, isLoading, error } = useSWR(
        "http://localhost:8080/todos",
        fetcher
    );

    console.log(data)

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4">
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Todo<span className="text-indigo-600">List</span>
                    </h1>
                    <p className="text-gray-600">
                        今日のタスクを管理しましょう
                    </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl 
                           text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                    type="text"
                                    placeholder="新しいタスクを追加..."
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <button
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 
                         hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl 
                         transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                type="submit"
                            >
                                タスクを追加
                            </button>
                        </form>
                    </div>
                    
                    {data?.map((todo: TodoType) => (
                      <Todo key={todo.id} todo={todo} />
                    ))}

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>2件のタスク</span>
                            <span>1件完了</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
