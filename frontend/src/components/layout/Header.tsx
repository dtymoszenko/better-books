import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header({ title, onToggleSidebar }: { title: string; onToggleSidebar: () => void }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header style={styles.header}>
      <button style={styles.menuButton} onClick={onToggleSidebar} title="Toggle sidebar">
        &#9776;
      </button>

      <span style={styles.title}>{title}</span>

      <div style={styles.profileArea}>
        <button style={styles.avatar} onClick={handleLogout} title="Click to log out">
          U
        </button>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    height: 56,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    padding: "0 1.5rem",
    borderBottom: "1px solid #e5e5e5",
    background: "#fff",
    gap: "1rem",
  },
  menuButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1.25rem",
    padding: "0.25rem",
    lineHeight: 1,
    color: "#333",
  },
  title: {
    fontWeight: 600,
    fontSize: "1rem",
    marginRight: "auto",
  },
  profileArea: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "1px solid #e5e5e5",
    background: "#f0f0f0",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
