import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePageHeader from "../components/HomePageHeader";
import HomeNavigationMenu from "../components/HomeNavigationMenu";
import axios from "axios"; // for API calls

const HomePage = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Function to create the user in your backend
  const createUserIfNotExists = async (user) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/createUser", {
        name: user.name,
        email: user.email,
        username: user.nickname || user.email.split("@")[0],
        profileImage: user.picture,
      });

      console.log("User creation response:", response.data);
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };

  // Redirect and auto-create user
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/"); // redirect to HeroPage if not logged in
      } else {
        createUserIfNotExists(user); // create user automatically if authenticated
      }
    }
  }, [isLoading, isAuthenticated, navigate, user]);

  if (isLoading) return <div>Loading....</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="homeLayout">
      <HomePageHeader onMenuClick={() => setIsNavOpen(!isNavOpen)} />
      <div className="homeContentArea">
        <HomeNavigationMenu isOpen={isNavOpen} />
        <main className="homeMainContent">
          {/* Add your feed or articles here */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
