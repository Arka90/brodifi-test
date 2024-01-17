import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/login/Login";
import Signup from "./component/signup/Signup";
import Applayout from "./component/appLayout/Applayout";

import { useState } from "react";
import Home from "./component/home/Home";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: user ? (
            <Home user={user} setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          ),
        },
        { path: "/login", element: <Login setUser={setUser} /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
