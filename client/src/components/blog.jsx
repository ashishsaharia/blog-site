import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bookmark, CircleMinus, MoreHorizontal, Plus, BadgeCheck, MessageCircle, Eye, Heart } from "lucide-react";
// import "./MediumPostCard.css"; // Import the CSS file

function MediumPostCard({
  publication,
  author,
  verified = false,
  title,
  subtitle,
  date,
  views,
  initialComments = 80,
  initialLikes = 0,
  thumbnailSrc,
  className,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [commentCount, setCommentCount] = useState(initialComments);
  const [bookmarked, setBookmarked] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    setShowLikeAnimation(true);
    setTimeout(() => setShowLikeAnimation(false), 600);
  };

  const handleComment = () => {
    setCommentCount(commentCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <article className={`post-card ${className || ""}`} aria-label={title}>
      <div className="post-card-content">
        <div className="post-card-text">
          <div className="post-card-byline">
            <Avatar className="avatar-small">
              <AvatarImage alt={`${publication} logo`} />
              <AvatarFallback>Ww</AvatarFallback>
            </Avatar>
            <span className="byline-text">
              In {publication} by {author}
            </span>
            {verified && <BadgeCheck className="badge-verified" aria-label="Verified" />}
          </div>

          <h2 className="post-card-title">{title}</h2>

          {subtitle && <p className="post-card-subtitle">{subtitle}</p>}

          <div className="post-card-meta">
            <button onClick={handleLike} className="meta-button" aria-label={liked ? "Unlike" : "Like"}>
              <Heart className={`heart-icon ${liked ? "liked" : ""} ${showLikeAnimation ? "animate-like" : ""}`} />
              <span>{likeCount}</span>
            </button>

            <time className="meta-time">{date}</time>

            {typeof views !== "undefined" && (
              <span className="meta-views">
                <Eye className="meta-icon" />
                {views}
              </span>
            )}

            <button onClick={handleComment} className="meta-button" aria-label="Add comment">
              <MessageCircle className="meta-icon" />
              <span>{commentCount}</span>
            </button>
          </div>
        </div>

        {thumbnailSrc && (
          <img src={thumbnailSrc} alt={`Thumbnail for ${title}`} className="post-card-thumbnail" />
        )}
      </div>
      <div className="post-card-actions">
        <Button variant="ghost" size="icon" aria-label="Mute" className="action-button">
          <CircleMinus className="action-icon" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Add to list" className="action-button">
          <Plus className="action-icon" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Bookmark"
          onClick={handleBookmark}
          className={`action-button ${bookmarked ? "bookmarked" : ""}`}
        >
          <Bookmark className={`action-icon ${bookmarked ? "bookmarked-icon" : ""}`} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="More options" className="action-button">
          <MoreHorizontal className="action-icon" />
        </Button>
      </div>
    </article>
  );
}

export default MediumPostCard;
