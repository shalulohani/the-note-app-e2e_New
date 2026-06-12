export default function Login() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input name="email" placeholder="Email" />
      <br /><br />

      <input name="password" placeholder="Password" type="password" />
      <br /><br />

      <button type="submit">Login</button>
    </div>
  );
}
