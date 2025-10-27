import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePageHeader from "../components/HomePageHeader";
import HomeNavigationMenu from "../components/HomeNavigationMenu";
import MediumPostCard from "../components/blog";
import axios from "axios";

const SkeletonPostCard = () => (
  <div className="skeleton-post-card">
    <div className="skeleton-thumbnail"></div>
    <div className="skeleton-lines">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line long"></div>
    </div>
  </div>
);

const HomePage = () => {
  const postsPath = "http://localhost:5000/posts/getposts";
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const createUserIfNotExists = async (user) => {
    try {
      await axios.post("http://localhost:5000/auth/createUser", {
        name: user.name,
        email: user.email,
        username: user.nickname || user.email.split("@")[0],
        profileImage: user.picture,
      });
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/");
      } else {
        createUserIfNotExists(user);
      }
    }
  }, [isLoading, isAuthenticated, navigate, user]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await axios.get(postsPath);
        setPosts(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []); // fetch only once

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="homeLayout">
      <HomePageHeader onMenuClick={() => setIsNavOpen(!isNavOpen)} />
      <div className="homeContentArea">
        <HomeNavigationMenu isOpen={isNavOpen} />
        <main className="homeMainContent">
          {loadingPosts ? (
            <>
              <SkeletonPostCard />
              <SkeletonPostCard />
              <SkeletonPostCard />
            </>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <MediumPostCard
                key={post.id}
                publication="Your Blog"
                author={post.author?.name || "Unknown"}
                verified={true}
                title={post.title}
                subtitle={post.content?.slice(0, 120) + "..."}
                date={new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                views={`${post._count.likes} likes`}
                comments={`${post._count.comments} comments`}
                thumbnailSrc={post.author?.profileImage || "https://via.placeholder.com/150"}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

