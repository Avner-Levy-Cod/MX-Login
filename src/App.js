import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef } from "react";
import "./App.css";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Register from "./Components/Register";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const CASINO = "https://www.codere.mx/casino?deliveryPlatform=Native";
  const SPORT = "https://apuestas.codere.mx/es_MX";
  const CASINO_REG =
    "https://www.codere.mx/registro?clientType=casino&deliveryPlatform=Native&back_url=https%3A%2F%2Fwww.codere.mx%2Fcasino%3FdeliveryPlatform%3DNative";
  const SPORT_REG =
    "https://www.codere.mx/registro?clientType=sportsbook&deliveryPlatform=Native&back_url=https%3A%2F%2Fapuestas.codere.mx%2Fes_MX";
  // var back_url, homepage_url, registroUrl;

  const [back_url, setBack_url] = useState("");
  const [homepage_url, setHomepage_url] = useState("");
  const [registroUrl, setRegistroUrl] = useState("");

  const mylocation = location.search.substring(1);
  var word,
    res = "";
  useEffect(() => {
    // Get info from queries
    if (mylocation.includes("back_url=")) word = "back_url";
    else if (mylocation.includes("clientType=")) word = "clientType";

    if (word)
      res = mylocation
        .substring(mylocation.indexOf(word) + word.length + 1)
        .split("&")[0];

    // if (document.referrer) console.log("refferer: ", document.referrer);
    // else console.log("no refferer");

    // For a Sport user:
    if (res.includes("apuestas") || res.includes("sport")) {
      if (document.referrer)
        setBack_url(document.referrer); // if we have a refferer
      else setBack_url(SPORT); // otherwise back url is the default sport page
      setHomepage_url(SPORT); // homepage is sport
      setRegistroUrl(SPORT_REG); // reg sport

      // For a Casino User
    } else if (res.includes("casino")) {
      if (document.referrer)
        setBack_url(document.referrer); // if we have a refferer
      else setBack_url(CASINO); // otherwise back url is the default casino page
      setHomepage_url(CASINO); // homepage is casino
      setRegistroUrl(CASINO_REG); // reg Casino

      // For a Non-Related User (without parameters)
    } else {
      if (document.referrer)
        setBack_url(document.referrer); // if we have a refferer
      else setBack_url(SPORT); // otherwise back url is the default sport page
      setHomepage_url(SPORT); // homepage by default is sport
      setRegistroUrl(SPORT_REG); // reg by default is sport either
    }
  }, []);
  // console.log(homepage_url);

  return (
    <>
      <Header back_url={back_url} homepage_url={homepage_url} />{" "}
      <Login homepage_url={homepage_url} registroUrl={registroUrl} />{" "}
    </>
  );
}

export default App;
