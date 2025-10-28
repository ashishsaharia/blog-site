import React, { useState } from 'react';
import { Upload, X, FileText, Calendar, Eye } from 'lucide-react';
import HomePageHeader from '../components/HomePageHeader';
import HomeNavigationMenu from '../components/HomeNavigationMenu';

export default function NewsletterPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newsletters, setNewsletters] = useState([
    {
      id: 1,
      title: "The Future of Web Development",
      description: "Exploring the latest trends in web technologies, from AI integration to edge computing and beyond.",
      date: "Oct 20, 2025",
      views: 1234,
      file: null
    },
    {
      id: 2,
      title: "Design Systems Masterclass",
      description: "A comprehensive guide to building scalable design systems that work across multiple platforms.",
      date: "Oct 15, 2025",
      views: 892,
      file: null
    },
    {
      id: 3,
      title: "JavaScript Deep Dive",
      description: "Understanding closures, async programming, and advanced patterns in modern JavaScript development.",
      date: "Oct 8, 2025",
      views: 2145,
      file: null
    }
  ]);

  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null
  });

  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadData({ ...uploadData, file });
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = () => {
    if (!uploadData.title || !uploadData.description || !uploadData.file) {
      alert('Please fill all fields');
      return;
    }

    const newNewsletter = {
      id: newsletters.length + 1,
      title: uploadData.title,
      description: uploadData.description,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 0,
      file: uploadData.file
    };

    setNewsletters([newNewsletter, ...newsletters]);
    setUploadData({ title: '', description: '', file: null });
    setShowUploadModal(false);
  };

  const handleNewsletterClick = (newsletter) => {
    if (newsletter.file) {
      const fileURL = URL.createObjectURL(newsletter.file);
      window.open(fileURL, '_blank');
    } else {
      alert('Newsletter file not available');
    }
  };

  return (
    <div className="newsletter-page">
      {/* Header */}
      {/* <header className="newsletter-header">
        <div className="newsletter-header-container">
          <div className="newsletter-header-content">
            <a href="#" className="logo">Medium</a>
            <div className="newsletter-header-actions">
              <button className="btn-upload" onClick={() => setShowUploadModal(true)}>
                <Upload size={16} />
                <span>Upload Newsletter</span>
              </button>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="Profile"
                className="newsletter-profile-avatar"
              />
            </div>
          </div>
        </div>
      </header> */}

      <HomePageHeader onMenuClick={() => setIsNavOpen(!isNavOpen)} />
        <div className={`homeNavigationMenu ${isNavOpen ? "" : "closed"}`}>
    <HomeNavigationMenu isOpen={isNavOpen} />
    </div>  


      {/* Main Content */}
      <div className="newsletter-main">
        <div className="newsletter-container">
<div className="newsletter-header-actions">
              <button className="btn-upload" onClick={() => setShowUploadModal(true)}>
                <Upload size={16} />
                <span>Upload Newsletter</span>
              </button>
              {/* <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="Profile"
                className="newsletter-profile-avatar"
              /> */}
            </div>
          <div className="newsletter-hero">
            <h1 className="newsletter-title">Newsletters</h1>
            <p className="newsletter-subtitle">
              Stay updated with our latest insights, stories, and articles delivered directly to you.
            </p>
          </div>

          {/* Newsletter Grid */}
          <div className="newsletter-grid">
            {newsletters.map((newsletter) => (
              <article 
                key={newsletter.id} 
                className="newsletter-card"
                onClick={() => handleNewsletterClick(newsletter)}
              >
                <div className="newsletter-card-icon">
                  <FileText size={32} />
                </div>
                <h3 className="newsletter-card-title">{newsletter.title}</h3>
                <p className="newsletter-card-description">{newsletter.description}</p>
                <div className="newsletter-card-meta">
                  <div className="newsletter-meta-item">
                    <Calendar size={14} />
                    <span>{newsletter.date}</span>
                  </div>
                  <div className="newsletter-meta-item">
                    <Eye size={14} />
                    <span>{newsletter.views.toLocaleString()} views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {newsletters.length === 0 && (
            <div className="newsletter-empty">
              <FileText size={64} strokeWidth={1} />
              <h3>No newsletters yet</h3>
              <p>Upload your first newsletter to get started</p>
              <button className="btn-upload-empty" onClick={() => setShowUploadModal(true)}>
                Upload Newsletter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="upload-modal-header">
              <h2 className="upload-modal-title">Upload Newsletter</h2>
              <button className="upload-close-btn" onClick={() => setShowUploadModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="upload-modal-body">
              <div className="upload-form-group">
                <label className="upload-label">Newsletter Title</label>
                <input
                  type="text"
                  className="upload-input"
                  placeholder="Enter newsletter title..."
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                />
              </div>

              <div className="upload-form-group">
                <label className="upload-label">Description</label>
                <textarea
                  className="upload-textarea"
                  placeholder="Brief description of the newsletter..."
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="upload-form-group">
                <label className="upload-label">Upload PDF</label>
                <div className="upload-file-area">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    id="file-upload"
                    className="upload-file-input"
                  />
                  <label htmlFor="file-upload" className="upload-file-label">
                    <Upload size={24} />
                    <span>{uploadData.file ? uploadData.file.name : 'Choose PDF file'}</span>
                    <span className="upload-file-hint">PDF files only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="upload-modal-footer">
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button className="btn-upload-final" onClick={handleUpload}>
                Upload Newsletter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}