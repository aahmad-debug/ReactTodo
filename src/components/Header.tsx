interface HeaderProps {
  themeIcon: string;
  toggleTheme: () => void;
}

function Header({ themeIcon, toggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <h1>
        TODO
        <img src="todo-app-main/images/favicon-32x32.png" alt="logo" />
      </h1>

      <img
        src={`todo-app-main/images/${themeIcon}`}
        alt="toggle theme"
        id="theme-toggle"
        onClick={toggleTheme}
      />
    </header>
  );
}

export default Header;
