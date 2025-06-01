import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import TaskPage from "./pages/TaskPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Periksa autentikasi dari localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [user, setUser] = useState(() => {
    // Ambil data user dari localStorage jika ada
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  // Sync state dengan localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      setIsLoggedIn(isAuth);
      
      if (isAuth) {
        try {
          const userData = localStorage.getItem("user");
          setUser(userData ? JSON.parse(userData) : null);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <MainLayout 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}
      />
    </Router>
  );
};

const MainLayout = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
  const location = useLocation();
  const noSidebarRoutes = ["/login", "/register"];
  const isNoSidebar = noSidebarRoutes.includes(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Keep for backward compatibility
    
    setIsLoggedIn(false);
    setUser(null);
    
    // Redirect to login
    window.location.href = "/login";
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <div className="flex min-h-screen">
      {!isNoSidebar && isLoggedIn && (
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onLogout={handleLogout}
          user={user}
        />
      )}
      <main
        className={`flex-grow min-h-screen transition-all duration-300 ${
          !isNoSidebar && isLoggedIn 
            ? (isSidebarOpen ? "ml-16 p-6" : "ml-16 p-6") 
            : "p-0 m-0"
        }`}
      >
        <Switch>
          <Route path="/login">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )}
          </Route>
          
          <Route path="/register">
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <RegisterPage onRegister={handleLogin} />
            )}
          </Route>
          
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute path="/tasks" component={TaskPage} />
          <ProtectedRoute path="/categories" component={CategoryPage} />
          
          <Route path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;