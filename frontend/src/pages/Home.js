import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const nextSlide = () => {
    if (currentSlide < posts.length - 5) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="slider-container">
        <div className="slider">
          <div className="slide">
            <img src="/images/image1.png" alt="Slide 1" />
          </div>
          <div className="slide">
            <img src="/images/image2.png" alt="Slide 2" />
          </div>
          <div className="slide">
            <img src="/images/image3.jpg" alt="Slide 3" />
          </div>
        </div>
      </div>
      <div className="categories-container">
        <Link to="/category1">카테고리1</Link>
        <Link to="/category2">카테고리2</Link>
        <Link to="/category3">카테고리3</Link>
        <Link to="/category4">카테고리4</Link>
      </div>
      <div className="home-container">
        <div className='posts-slider'>
          <button className='arrow-button' onClick={prevSlide}>&lt;</button>
          <div className='posts-container' style={{ transform: `translateX(-${currentSlide * 200}px)` }}>
            {posts.slice(currentSlide, currentSlide + 4).map(post => (
              <div key={post.id} className='post'>
                <Link to={`/post/${post.id}`}>
                  <img src={`http://localhost:3001${post.photo_url || '/uploads/basic.png'}`} alt={post.title} className="post-image" />
                  <div className="post-title">{post.title}</div>
                </Link>
              </div>
            ))}
          </div>
          <button className='arrow-button' onClick={nextSlide}>&gt;</button>
        </div>
      </div>
    </>
  );
};

export default Home;
