import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import "./style.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";
type ThemeType = "light" | "dark";

const STORAGE_KEY = "todos";
const THEME_KEY = "theme";
const MAX_TASK_LENGTH = 50;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [theme, setTheme] = useState<ThemeType>("light");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTheme = (localStorage.getItem(THEME_KEY) ||
      "light") as ThemeType;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Array.isArray(parsed)) setTodos(parsed);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const itemsLeftLabel =
    activeCount + " " + (activeCount === 1 ? "item" : "items") + " left";

  const handleInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key !== "Enter") return;

    const text = inputValue.trim();
    if (!text) return;

    if (text.length > MAX_TASK_LENGTH) {
      alert(`Maximum ${MAX_TASK_LENGTH} characters allowed`);
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const toggleTodoComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const themeIcon = theme === "light" ? "icon-moon.svg" : "icon-sun.svg";

  return (
    <>
      <div className="background" />

      <main className="container">
        <Header themeIcon={themeIcon} toggleTheme={toggleTheme} />

        <section className="todo-box">
          <TodoInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyPress={handleInputKeyPress}
          />

          <TodoList
            todos={filteredTodos}
            toggle={toggleTodoComplete}
            remove={deleteTodo}
          />

          <Footer
            itemsLeft={itemsLeftLabel}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
          />
        </section>

        <p className="drag-text">Drag and drop to reorder list</p>
      </main>
    </>
  );
}

export default App;
