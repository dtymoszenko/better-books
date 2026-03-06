import AppLayout from "../components/layout/AppLayout";

const PLACEHOLDER_CARDS = ["Book Title A", "Book Title B", "Book Title C", "Book Title D"];

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardCover} />
      <div style={styles.cardLabel}>{label}</div>
      <div style={styles.cardMeta}>Author placeholder</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <AppLayout title="Home">
      <Section title="Currently Reading">
        <div style={styles.cardRow}>
          {PLACEHOLDER_CARDS.slice(0, 2).map((label) => (
            <PlaceholderCard key={label} label={label} />
          ))}
        </div>
      </Section>

      <Section title="Want to Read">
        <div style={styles.cardRow}>
          {PLACEHOLDER_CARDS.map((label) => (
            <PlaceholderCard key={label} label={label} />
          ))}
        </div>
      </Section>

      <Section title="Recently Finished">
        <div style={styles.cardRow}>
          {PLACEHOLDER_CARDS.slice(0, 3).map((label) => (
            <PlaceholderCard key={label} label={label} />
          ))}
        </div>
      </Section>
    </AppLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    margin: "0 0 0.875rem",
    color: "#111",
  },
  cardRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  card: {
    width: 140,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    cursor: "pointer",
  },
  cardCover: {
    width: 140,
    height: 200,
    background: "#e0e0e0",
    borderRadius: 6,
  },
  cardLabel: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#111",
  },
  cardMeta: {
    fontSize: "0.8rem",
    color: "#666",
  },
};
