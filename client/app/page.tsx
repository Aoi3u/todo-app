"use client";
import Todo from "./components/Todo";
import useSWR from "swr";
import { TodoType } from "./types";
import React, { useRef } from "react";

async function fetcher(key: string) {
    return fetch(key).then((res) => res.json());
}

export default function Home() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { data, isLoading, error, mutate } = useSWR(
        "http://localhost:8080/todos",
        fetcher
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: inputRef.current?.value,
                isCompleted: false,
            }),
        });

        if (response.ok) {
          const newTodo = await response.json();
          mutate([...data, newTodo]);
          inputRef.current!.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
            <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Todo<span className="text-gray-700">List</span>
                    </h1>
                    <p className="text-gray-600">タスクを管理しましょう</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl 
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-gray-400 focus:border-gray-300 transition-all duration-300"
                                    type="text"
                                    placeholder="新しいタスクを追加..."
                                    ref={inputRef}
                                />
                            </div>
                            <button
                                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 
                         hover:to-black text-white font-medium py-3 px-6 rounded-2xl 
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                type="submit"
                            >
                                タスクを追加
                            </button>
                        </form>
                    </div>

                    {data?.map((todo: TodoType) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}

                    <div className="p-6 bg-gray-50/70 border-t border-gray-100">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>{data?.length || 0}件のタスク</span>
                            <span>
                                {data?.filter(
                                    (todo: TodoType) => todo.isCompleted
                                ).length || 0}
                                件完了
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
