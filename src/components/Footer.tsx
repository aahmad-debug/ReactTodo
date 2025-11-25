interface FooterProps {
  itemsLeft: string;
  filter: "all" | "active" | "completed";
  setFilter: (value: "all" | "active" | "completed") => void;
  clearCompleted: () => void;
}

function Footer({ itemsLeft, filter, setFilter, clearCompleted }: FooterProps) {
  return (
    <div className="footer">
      <span id="items-left">{itemsLeft}</span>

      <div className="filters">
        <button
          className={`filter ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`filter ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={`filter ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <button className="aaa" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default Footer;
