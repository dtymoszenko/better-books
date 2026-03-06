import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function AppLayout({ title, children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={styles.shell}>
      {sidebarOpen && <Sidebar />}

      <div style={styles.main}>
        <Header title={title} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: "#f5f5f5",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "1.5rem",
  },
};
