import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // auth logic will go here
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>BetterBooks</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign in
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: 380,
  },
  logo: {
    margin: 0,
    fontSize: "1.6rem",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    margin: "0.4rem 0 1.8rem",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#333",
  },
  input: {
    padding: "0.6rem 0.75rem",
    borderRadius: 6,
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.7rem",
    borderRadius: 6,
    border: "none",
    background: "#1a1a1a",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  footer: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#666",
  },
  link: {
    color: "#1a1a1a",
    fontWeight: 600,
  },
};
