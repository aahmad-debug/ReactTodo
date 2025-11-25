interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggle: (id: number) => void;
  remove: (id: number) => void;
}

function TodoItem({ todo, toggle, remove }: TodoItemProps) {
  return (
    <li className="todo-item">
      <div className="todo-left">
        <div
          className={`circle ${todo.completed ? "checked" : ""}`}
          onClick={() => toggle(todo.id)}
        />
        <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
          {todo.text}
        </span>
      </div>

      <img
        src="todo-app-main/images/icon-cross.svg"
        className="delete"
        alt="Delete"
        onClick={() => remove(todo.id)}
      />
    </li>
  );
}

export default TodoItem;
