interface TodoInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function TodoInput({
  inputValue,
  setInputValue,
  handleKeyPress,
}: TodoInputProps) {
  return (
    <input
      id="todo-input"
      type="text"
      placeholder="Currently typing"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
}

export default TodoInput;
