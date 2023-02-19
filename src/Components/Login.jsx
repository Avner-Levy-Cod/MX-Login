import "../CSS/login.css";

import { Form, Button, NavLink, FloatingLabel } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Login(props) {
  const pwRef = useRef(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [showEyeSlash, setShowEyeSlash] = useState(false);

  const alphanum_regex = /[^0-9a-z@._-]/gi;
  // const [username, setUserName] = useState("");
  // const [pw, setPw] = useState("");
  const [username, setUserName] = useState("");
  const [pw, setPw] = useState("");

  var status;

  class UserEvent {
    constructor(event, userId, userName, status) {
      this.event = event;
      this.userId = userId;
      this.userName = userName;
      this.status = status;
    }
  }

  (async function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", process.env.REACT_APP_DATA_ID);

  const scriptLoaded = (instance) => {
    setPageLoaded(true);

    if (instance) {
      setShowSpinner(true);
      try {
        window.iapiLogin(username, pw, 1, "es-mx", 0);
      } catch (error) {
        console.log(error);
        setMessage("Algo salió mal. Por favor contacte a su administrador");
        setShowSpinner(false);
      }

      try {
        window.iapiSetCallout(window.iapiCALLOUT_LOGIN, function (response) {
          // console.log("response >>>> ", response);
          var push = {};

          if (response.errorCode === 0) {
            status = "Success";
            push = {
              event: "Login",
              userId: response.username.userId,
              userName: response.username.userName,
              status: status,
            };
            setMessage("");
            // window.location.href = props.homepage_url;
          } else {
            status = "Failed";
            push = {
              event: "Login",
              message: response.playerMessage,
              errorCode: response.errorCode,
              attemptedUser: username,
              status: status,
            };
            setMessage(response.playerMessage);
            setShowSpinner(false);
          }

          console.log(push);

          if (
            status === "Failed" ||
            (status === "Success" && props.homepage_url.includes("casino"))
          )
            window.dataLayer.push(push);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const focusHandler = () => {
    setMessage("");
    setShowEye(true);
  };
  const blurHandler = (target) => {
    setShowEye(true);
    setShowEyeSlash(false);
  };

  const eyeClickHandler = () => {
    setShowEye(!showEye);
    setShowEyeSlash(!showEyeSlash);
  };

  const disableHandler = () => {
    if (showSpinner) return true;
    else return !(username && pw.length >= 3);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_LOGIN;
    script.async = true;
    script.onload = () => scriptLoaded();

    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="Auth-form-container">
        <Form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">¡Bienvenido de Nuevo!</h3>

            <FloatingLabel
              controlId="floatUsername"
              label="Usuario ó Correo Electrónico"
              className={`${username && "filled"}`}
            >
              <Form.Control
                onChange={(e) =>
                  setUserName(e.target.value.replace(alphanum_regex, ""))
                }
                onFocus={() => setMessage("")}
                // onBlur={() => (username === "" ? setFocusUsername(true) : null)}
                type="text"
                placeholder="a"
                value={username}
                maxLength={256}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatPw"
              label="Contraseña"
              className={`${pw && "filled"}`}
            >
              {/* <div style={{ display: "flex" }}> */}
              <Form.Control
                onChange={(e) => setPw(e.target.value)}
                onFocus={focusHandler}
                onBlur={(e) => blurHandler(e.target)}
                type={showEye ? "password" : showEyeSlash ? "text" : "password"}
                autoComplete="off"
                placeholder="aa"
                value={pw}
                ref={pwRef}
                maxLength={32}
              />

              {!showEye && !showEyeSlash ? null : showEye && pw.length > 0 ? (
                <i
                  onClick={(e) => eyeClickHandler(e.target)}
                  className="pi pi-eye"
                />
              ) : showEyeSlash ? (
                <i
                  onClick={(e) => eyeClickHandler(e.target)}
                  className="pi pi-eye-slash"
                />
              ) : null}
            </FloatingLabel>

            <p className="mt-3 error">{message}</p>
            <Form.Check defaultChecked label="Recuérdame" />
          </div>
          <div className="d-grid gap-2 mt-3 buttons">
            {showSpinner ? (
              <ClipLoader
                cssOverride={{
                  // position: "relative ",
                  margin: "auto",
                  marginTop: "-10px",
                }}
                color="#79c000"
              />
            ) : (
              <Button
                disabled={disableHandler()}
                type="button"
                className="btn btn-primary iniciar"
                onClick={(evt) => scriptLoaded(evt._reactName)}
              >
                Iniciar sesión
              </Button>
            )}
          </div>
          <NavLink
            className="olvido"
            href="https://www.codere.mx/contrasena-olvidada"
          >
            ¿Olvido su Contraseña o Usuario?
          </NavLink>
        </Form>
      </div>
      <div className="reg_div">
        <p style={{ color: "#fff" }}>¿Aún no tiene una cuenta?</p>
        <Button
          href={props.registroUrl}
          type="button"
          className="btn btn-primary registro_v2"
        >
          Regístrate Ahora
        </Button>
      </div>
    </>
  );
}
