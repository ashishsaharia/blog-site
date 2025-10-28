import React, { useState, useRef, useEffect } from 'react';
import { Plus, Image, Code, Link2, Bold, Italic, ListOrdered, List, Quote, Minus } from 'lucide-react';
import HomePageHeader from '../components/HomePageHeader';
import HomeNavigationMenu from '../components/HomeNavigationMenu';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPublishMenu, setShowPublishMenu] = useState(false);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);
    const [isNavOpen, setIsNavOpen] = useState(true);


  useEffect(() => {
    console.log('Insert menu state:', showInsertMenu);
  }, [showInsertMenu]);

  const handlePublish = () => {
    setShowPublishMenu(true);
  };

  const toggleInsertMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle clicked, current state:', showInsertMenu);
    setShowInsertMenu(prev => !prev);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageMarkdown = `\n![Image](${event.target.result})\n`;
        setContent(prev => prev + imageMarkdown);
      };
      reader.readAsDataURL(file);
    }
    setShowInsertMenu(false);
  };

  const insertDivider = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Insert divider clicked');
    setContent(prev => prev + '\n---\n');
    setShowInsertMenu(false);
  };

  const insertCodeBlock = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Insert code block clicked');
    setContent(prev => prev + '\n```\n// Your code here\n```\n');
    setShowInsertMenu(false);
  };

  // Convert markdown to HTML for preview
  const renderMarkdown = (text) => {
    let html = text;
    
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    
    // Code inline
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br/>');
    
    return html;
  };

  const applyFormat = (format) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText === '') return;

    let formattedText = '';
    let newCursorPos = end;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = end + 4;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = end + 2;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          formattedText = `[${selectedText}](${url})`;
          newCursorPos = end + url.length + 4;
        } else {
          return;
        }
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        newCursorPos = end + 2;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        newCursorPos = end + 2;
        break;
      case 'ol':
        formattedText = `1. ${selectedText}`;
        newCursorPos = end + 3;
        break;
      case 'ul':
        formattedText = `- ${selectedText}`;
        newCursorPos = end + 2;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);

    // Set cursor position after format
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="create-post-page">
      {/* Header */}
      {/* <header className="create-header">
        <div className="create-header-container">
          <div className="create-header-content">
            <a href="#" className="logo">Medium</a>
            <div className="create-header-actions">
              <button className="btn-publish" onClick={handlePublish}>
                Publish
              </button>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                alt="Profile"
                className="create-profile-avatar"
              />
            </div>
          </div>
        </div>
      </header> */}

      <HomePageHeader onMenuClick={() => setIsNavOpen(!isNavOpen)} />
        <div className={`homeNavigationMenu ${isNavOpen ? "" : "closed"}`}>
    <HomeNavigationMenu isOpen={isNavOpen} />
    </div> 


      {/* Editor Container */}
      <div className="editor-container">
        <div className="editor-content">
    <div className="create-header-actions">
              <button className="btn-publish" onClick={handlePublish}>
                Publish
              </button>
  
            </div>
          {/* Title Input */}
          <textarea
            className="editor-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows="1"
          />

          {/* Content Input */}
          <textarea
            ref={contentRef}
            className="editor-body"
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Floating Toolbar */}
          <div className="floating-toolbar">
            <button 
              type="button"
              className={`toolbar-btn ${showInsertMenu ? 'active' : ''}`}
              title="Insert"
              onClick={toggleInsertMenu}
            >
              {showInsertMenu ? <Minus size={20} /> : <Plus size={20} />}
            </button>

            {/* Insert Menu Dropdown */}
            {showInsertMenu && (
              <div className="insert-menu">
                <button 
                  type="button"
                  className="insert-menu-item"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Image button clicked');
                    fileInputRef.current?.click();
                    setShowInsertMenu(false);
                  }}
                >
                  <Image size={18} />
                  <span>Image</span>
                </button>
                <button 
                  type="button"
                  className="insert-menu-item"
                  onClick={insertDivider}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12" />
                  </svg>
                  <span>Divider</span>
                </button>
                <button 
                  type="button"
                  className="insert-menu-item"
                  onClick={insertCodeBlock}
                >
                  <Code size={18} />
                  <span>Code Block</span>
                </button>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Side Toolbar */}
        <div className="side-toolbar">
          <button 
            className="side-toolbar-btn" 
            title="Bold (Select text first)"
            onClick={() => applyFormat('bold')}
          >
            <Bold size={18} />
          </button>
          <button 
            className="side-toolbar-btn" 
            title="Italic (Select text first)"
            onClick={() => applyFormat('italic')}
          >
            <Italic size={18} />
          </button>
          <button 
            className="side-toolbar-btn" 
            title="Link (Select text first)"
            onClick={() => applyFormat('link')}
          >
            <Link2 size={18} />
          </button>
          <button 
            className="side-toolbar-btn" 
            title="Ordered List (Select text first)"
            onClick={() => applyFormat('ol')}
          >
            <ListOrdered size={18} />
          </button>
          <button 
            className="side-toolbar-btn" 
            title="Bullet List (Select text first)"
            onClick={() => applyFormat('ul')}
          >
            <List size={18} />
          </button>
          <button 
            className="side-toolbar-btn" 
            title="Quote (Select text first)"
            onClick={() => applyFormat('quote')}
          >
            <Quote size={18} />
          </button>
          <button 
            className="side-toolbar-btn" 
            title="Code (Select text first)"
            onClick={() => applyFormat('code')}
          >
            <Code size={18} />
          </button>
        </div>

        {/* Formatting Guide */}
        <div className="formatting-guide">
          <p className="guide-text">
            💡 <strong>Tip:</strong> Select text first, then click formatting buttons
          </p>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishMenu && (
        <div className="publish-overlay" onClick={() => setShowPublishMenu(false)}>
          <div className="publish-modal" onClick={(e) => e.stopPropagation()}>
            <div className="publish-modal-header">
              <h2 className="publish-modal-title">Story Preview</h2>
              <button 
                className="publish-close-btn"
                onClick={() => setShowPublishMenu(false)}
              >
                ×
              </button>
            </div>

            <div className="publish-modal-body">
              <div className="publish-preview">
                <div className="publish-preview-label">Preview</div>
                <div className="publish-preview-content">
                  <h3 className="publish-preview-title">
                    {title || 'Add a title'}
                  </h3>
                  <div 
                    className="publish-preview-excerpt"
                    dangerouslySetInnerHTML={{ 
                      __html: content 
                        ? renderMarkdown(content.slice(0, 200))
                        : 'Add content to see preview...'
                    }}
                  />
                </div>
              </div>

              <div className="publish-form">
                <div className="publish-form-group">
                  <label className="publish-label">
                    Add or change topics (up to 5) so readers know what your story is about
                  </label>
                  <input
                    type="text"
                    className="publish-input"
                    placeholder="Add a topic..."
                  />
                </div>

                <div className="publish-form-note">
                  <p className="publish-note-text">
                    <strong>Note:</strong> Changes here will affect how your story appears in public places like Medium's homepage and in subscribers' inboxes — not the contents of the story itself.
                  </p>
                </div>
              </div>
            </div>

            <div className="publish-modal-footer">
              <button className="btn-publish-final">
                Publish now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}