import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-details-container">
      <div className="post-details">
        <img src={`/uploads/${post.photo || 'basic.png'}`} alt={post.title} className="post-details-image" />
        <h1 className="post-details-title">{post.title}</h1>
        <p className="post-details-content">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
