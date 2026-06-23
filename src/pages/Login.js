import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert("Invalid email or password");
        return;
      }

      const data = await response.json();

      // Save user session (token + user info)
      localStorage.setItem("user", JSON.stringify(data));

      alert("Login successful");
      navigate("/notes");

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Server not reachable.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "50px" }}>
      <h2>Login</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
}

