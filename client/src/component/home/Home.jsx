import { useEffect, useState } from "react";
import "./Home.scss";

const Home = ({ user, setUser }) => {
  const userName = user.user.userName;
  const sessionStart = user.session.sessionStart;
  const sessionEnd = user.session.sessionEnd;
  const [loggedIn, setLoggedIn] = useState(false);
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const getTimeBeforeLogIn = () => {
    const timeLeft = sessionStart - Date.now();

    if (timeLeft <= 0) {
      setLoggedIn(true);
      return;
    }

    setMinutes(Math.floor((timeLeft / (60 * 1000)) % 60));
    setSeconds(Math.floor(((timeLeft / 1000) % 60) % 60));
  };

  const getTimeAfterLogIn = () => {
    const timeLeft = sessionEnd - Date.now();

    if (timeLeft <= 0) {
      setUser(null);
      return;
    }

    setMinutes(Math.floor((timeLeft / (60 * 1000)) % 60));
    setSeconds(Math.floor(((timeLeft / 1000) % 60) % 60));
  };

  useEffect(() => {
    let timmer;

    if (!loggedIn) {
      timmer = setInterval(getTimeBeforeLogIn, 1000);
      return () => clearInterval(timmer);
    } else {
      timmer = setInterval(getTimeAfterLogIn, 1000);
    }

    return () => clearInterval(timmer);
  }, [loggedIn]);

  return (
    <h3>
      {loggedIn
        ? `Hey ${userName} you will be logout in ${
            minutes < 10 ? `0${minutes}` : minutes
          } : ${seconds < 10 ? `0${seconds}` : seconds}`
        : `Hey ${userName} you are on a queue, You can use the app after ${
            minutes < 10 ? `0${minutes}` : minutes
          } : ${seconds < 10 ? `0${seconds}` : seconds}`}
    </h3>
  );
};

export default Home;
