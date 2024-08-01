import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/slice/authThunks";
import styles from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // O 'admin' según el caso

  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      registerUser({ email, password, role })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/Login"); // Redirigir a Home
    }
  };

  return (
    <div className={styles.containerGeneral}>
      <h2 className={styles.h1Titile}>Sign up</h2>
      <form onSubmit={handleSubmit} className={styles.container1}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className={styles.formbuttons}>
          <button type="submit">Register</button>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>
        <div>
          <p>Do you have an account?</p>
          <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
