import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggle: (id: number) => void;
  remove: (id: number) => void;
}

function TodoList({ todos, toggle, remove }: TodoListProps) {
  return (
    <ul id="todo-list" className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggle={toggle} remove={remove} />
      ))}
    </ul>
  );
}

export default TodoList;
