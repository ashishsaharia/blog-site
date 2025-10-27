import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePageHeader from "../components/HomePageHeader";
import HomeNavigationMenu from "../components/HomeNavigationMenu";
import  MediumPostCard  from "../components/blog";
import axios from "axios";

const HomePage = () => {
	const postsPath = "http://localhost:5000/posts/getposts";
	const navigate = useNavigate();
	const [isNavOpen, setIsNavOpen] = useState(true);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [pageNo, setPageNo] = useState(1);
	const [postLimit, setPostLimit] = useState(10);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	// Create user in backend if not exists
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

	// Fetch posts
	useEffect(() => {
		const controller = new AbortController();

		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					`${postsPath}?page=${pageNo}&limit=${postLimit}`,
					{ signal: controller.signal }
				);
				setPosts(response.data.data);
			} catch (err) {
				if (axios.isCancel(err)) {
					console.log("Request cancelled:", err.message);
				} else if (err.name === "CanceledError") {
					console.log("Request aborted");
				} else {
					setError(err.message);
				}
			}
		};

		fetchPosts();
		return () => controller.abort();
	}, [pageNo, postLimit]);

	// Auth redirect + user creation
	useEffect(() => {
		if (!isLoading) {
			if (!isAuthenticated) {
				navigate("/");
			} else {
				createUserIfNotExists(user);
			}
		}
	}, [isLoading, isAuthenticated, navigate, user]);

	if (isLoading) return <div>Loading....</div>;
	if (!isAuthenticated) return null;
	if (error) return <div>Error: {error}</div>;

	console.log("Posts:", posts);

	return (
		<div className="homeLayout">
		<HomePageHeader onMenuClick={() => setIsNavOpen(!isNavOpen)} />
		<div className="homeContentArea">
		<HomeNavigationMenu isOpen={isNavOpen} />
		<main className="homeMainContent">
		{posts.length > 0 ? (
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
		<div className="pagination">
		<button disabled={pageNo === 1} onClick={() => setPageNo(pageNo - 1)}>Previous</button>
		<button onClick={() => setPageNo(pageNo + 1)}>Next</button>
		</div>

		</div>
	);
};

export default HomePage;

