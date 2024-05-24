// ProfilePage.js
import React, { useState } from 'react';
//import './ProfilePage.css';
import profilePhoto from '../samples/room3.jpg';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="profile-page">
      <ProfileHeader />
      <ProfileStats />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'posts' ? <Posts /> : <Collaborations />}
    </div>
  );
};

const ProfileHeader = () => {
    const [followers, setFollowers] = useState(123);
    const [isFollowing, setIsFollowing] = useState(false);
  
    const handleFollow = () => {
      if (isFollowing) {
        setFollowers(followers - 1);
      } else {
        setFollowers(followers + 1);
      }
      setIsFollowing(!isFollowing);
    };
  
    return (
      <div className="profile-header">
        <img src={profilePhoto} alt="Profile" className="profile-photo" />
        <button onClick={handleFollow} className="follow-button">
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    );
  };

const ProfileStats = () => {
    const [followers, setFollowers] = useState(123);
    return (
    <div className="profile-stats">
      <div className="stat">
        <strong>123</strong>
        <br/>
        <span>Followers</span>
      </div>
      <div className="stat">
        <strong>456</strong>
        <br/>
        <span>Following</span>
      </div>
      <div className="stat">
        <strong>789</strong>
        <br/>
        <span>Posts</span>
      </div>
    </div>
  );
};

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="profile-tabs">
      <nav>
        <button onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'active' : ''}>
          My Posts
        </button>
        <button onClick={() => setActiveTab('collaborations')} className={activeTab === 'collaborations' ? 'active' : ''}>
          Collaborations
        </button>
      </nav>
    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([...Array(15).keys()]); // Example posts
  const [visiblePosts, setVisiblePosts] = useState(5);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  return (
    <div className="posts">
      {posts.slice(0, visiblePosts).map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {visiblePosts < posts.length && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

const Collaborations = () => {
  const [posts, setPosts] = useState([
    { id: 1, collaborators: ['Alice', 'Bob'] },
    { id: 2, collaborators: ['Charlie'] },
    
  ]); 
  const [visiblePosts, setVisiblePosts] = useState(5);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  return (
    <div className="posts">
      {posts.slice(0, visiblePosts).map((post, index) => (
        <Post key={index} post={post} />
      ))}
      {visiblePosts < posts.length && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

const Post = ({ post }) => {
    const { content, collaborators } = post; // Destructure the post object to extract content and collaborators
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
  
    const addComment = () => {
      setComments([...comments, newComment]);
      setNewComment('');
    };
  
    const handleLike = () => {
      if (hasLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setHasLiked(!hasLiked);
    };
  
    return (
      <div className="post">
        <div className="post-content">{content}</div> {/* Render the post content */}
        <div className="post-actions">
          <button onClick={handleLike} className={hasLiked ? 'liked' : 'unliked'}>
            {hasLiked ? 'Liked' : 'Like'} {likes}
          </button>
          <button onClick={() => setShowComments(!showComments)}>
            Comments {comments.length}
          </button>
        </div>
        {showComments && (
          <div className="comments-section">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                {comment}
              </div>
            ))}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={addComment}>Post Comment</button>
          </div>
        )}
        {collaborators && (
          <div className="collaborators">
            Collaborated with:{' '}
            {collaborators.map((collaborator, index) => (
              <a href={`/profile/${collaborator}`} key={index} className="collaborator-link">
                {collaborator}
                {index < collaborators.length - 1 ? ', ' : ''}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

export default ProfilePage;
