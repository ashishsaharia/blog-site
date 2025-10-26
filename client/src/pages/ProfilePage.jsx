import React, { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('home');

  const articles = [
    {
      id: 1,
      title: "Understanding React Server Components",
      excerpt: "A deep dive into the new React Server Components and how they change the way we build applications. Learn about the architecture, benefits, and practical implementation strategies.",
      date: "Oct 20",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "The Art of Writing Clean Code",
      excerpt: "Best practices and principles that will help you write maintainable and scalable code that your team will love. Discover the key patterns that separate good code from great code.",
      date: "Oct 15",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      excerpt: "Learn how to design and implement RESTful APIs that can handle millions of requests per day. A comprehensive guide to performance optimization and best practices.",
      date: "Oct 8",
      readTime: "10 min read",
    }
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <a href="#" className="logo">Medium</a>
            <div className="header-nav">
              <a href="#" className="header-link">Write</a>
              <a href="#" className="header-link">Sign In</a>
              <button className="btn-primary">Get started</button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-header">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                alt="Alex Johnson"
                className="profile-image"
              />
              <div className="profile-info">
                <h2 className="profile-name">Alex Johnson</h2>
                <p className="profile-bio">
                  Software Engineer & Technical Writer
                </p>
                <div className="profile-actions">
                  <button className="btn-follow">Follow</button>
                  <span className="followers-count">2.4K Followers</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <div className="tabs-list">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`tab ${activeTab === 'home' ? 'active' : ''}`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                >
                  About
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'home' && (
              <div className="articles-list">
                {articles.map((article) => (
                  <article key={article.id} className="article-item">
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-meta">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="about-content">
                <p className="about-text">
                  Hi! I'm Alex, a software engineer with over 8 years of experience building web applications. 
                  I'm passionate about creating clean, efficient code and sharing what I learn with the developer community.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}