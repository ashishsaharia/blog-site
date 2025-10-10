import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')  // Example endpoint from backend
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;

