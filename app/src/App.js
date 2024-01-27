import React, { useState, useEffect } from "react";
import userService from "./services/UserService";
import Auth from "./Auth/Auth";

function App() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminStatus = await userService.isAdmin();
        const loginStatus = await userService.isLoggedIn();
        setIsAdmin(adminStatus);
        setIsLoggedIn(loginStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return <Auth isAdmin={isAdmin} isLoggedIn={isLoggedIn} />;
}

export default App;
