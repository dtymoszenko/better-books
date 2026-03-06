const NAV_ITEMS = [
  { label: "Placeholder 1" },
  { label: "Placeholder 2" },
  { label: "Placeholder 3" },
  { label: "Placeholder 4" },
  { label: "Placeholder 5" },
];

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoArea}>
        <span style={styles.logoText}>BetterBooks</span>
      </div>

      <nav style={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button key={item.label} style={styles.navItem}>
            <span style={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 240,
    flexShrink: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e5e5e5",
    background: "#fff",
  },
  logoArea: {
    height: 56,
    display: "flex",
    alignItems: "center",
    padding: "0 1.25rem",
    borderBottom: "1px solid #e5e5e5",
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1rem",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "0.75rem 0.5rem",
    gap: "0.125rem",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.6rem 0.75rem",
    borderRadius: 6,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    fontSize: "0.9rem",
  },
  navLabel: {
    color: "#333",
  },
};
