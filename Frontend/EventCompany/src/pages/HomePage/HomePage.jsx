import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center", color: "gold" }}>Upcoming events</h1>
      <div className={styles.grid}>
        <div className={styles.events}>
          <h2 style={{ color: "gold", marginTop: 0 }}>Concerts</h2>
          <h2 style={{ color: "gold", marginTop: 0 }}>Sports</h2>
          <h2 style={{ color: "gold", marginTop: 0 }}>Exhibitions</h2>
          <h2 style={{ color: "gold", marginTop: 0 }}>Cinema</h2>
          <h2 style={{ color: "gold", marginTop: 0 }}>Festivals</h2>
        </div>
        <a href="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Event"
            className={styles.image}
          />
        </a>
      </div>
    </div>
  );
}
