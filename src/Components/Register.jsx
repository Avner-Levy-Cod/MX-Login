import { useState } from "react";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";

export default function Register() {
  const [username, setUserName] = useState("");

  return (
    <>
      <div>Register</div>;
      <span className="p-float-label">
        <InputText
          id="inputtext"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="inputtext">InputText</label>
      </span>
    </>
  );
}
