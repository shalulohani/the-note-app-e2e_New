import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // ✅ Logout logic
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  // 🎨 Styling block (your existing styles)
  const styles = {
    logoutButton: {
      padding: "12px 24px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "6px",
    },
    notesButton: {
      padding: "12px 24px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      marginRight: "10px",
    },
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>
      <p>Welcome to your personal notes dashboard</p>

      <button
        onClick={() => navigate("/notes")}
        style={styles.notesButton}
      >
        Go to Notes
      </button>

      <button
        onClick={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
