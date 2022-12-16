import { Inter } from "@next/font/google";

import { useState, useEffect } from "react";

import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let fetchTasks = async () => {
      try {
        let tasks = await axios.get("http://localhost:3000/api/tasks/getTasks");

        setTasks(tasks.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, [task]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/tasks/addTask", {
        title: task,
      });

      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      let newTasks = await axios.post(
        "http://localhost:3000/api/tasks/toggleTask",
        {
          id,
        }
      );

      setTasks(newTasks.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      let leavingTask = await axios.post(
        "http://localhost:3000/api/tasks/deleteTask",
        {
          id,
        }
      );

      setTasks(leavingTask.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tasks);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
        />
        <button type="submit">Add +</button>
      </form>

      <ol>
        {tasks &&
          tasks.map((item: any) => (
            <div key={item._id}>
              <li>
                <p
                  style={{
                    textDecoration: item.status && "line-through",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleTask(item._id)}
                  onDoubleClick={() => deleteTask(item._id)}
                >
                  {item.title}
                </p>
              </li>
            </div>
          ))}
      </ol>
    </div>
  );
}
