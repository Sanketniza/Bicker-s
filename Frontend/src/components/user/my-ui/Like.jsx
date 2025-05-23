import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import PropTypes from 'prop-types';

// Add styling with styled-components
const StyledWrapper = styled.div`
  width: 280px;

  .tool-box {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .btn-close {
    background: none;
    border: none;
    color: #666;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #fff;
    }
  }

  .text-content {
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  .icons-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .icons {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .like-text-content, .dislike-text-content {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .input-box {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .svgs {
    width: 30px;
    height: 50px;
    transition: transform 0.3s, fill 0.3s;
    fill: #666;
  }

  #icon-like-solid, #icon-dislike-solid {
    display: none;
    fill: #4CAF50;
  }

  #icon-dislike-solid {
    fill: #F44336;
    transform: rotate(180deg);
  }

  .input-box:checked ~ #icon-like-solid,
  .input-box:checked ~ #icon-dislike-solid {
    display: block;
  }

  .input-box:checked ~ #icon-like-regular,
  .input-box:checked ~ #icon-dislike-regular {
    display: none;
  }

  .input-box:checked ~ .fireworks .checked-like-fx,
  .input-box:checked ~ .fireworks .checked-dislike-fx {
    animation: fireworks 0.5s ease-out;
  }

  @keyframes fireworks {
    0% { transform: scale(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .fireworks {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .checked-like-fx, .checked-dislike-fx {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;




const Like = ({ className, productId }) => {
    const { id } = useParams(); // product ID from URL
    const actualProductId = productId || id; // Use passed productId or URL parameter

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCounts = async () => {
            if (!actualProductId) {
                console.error("No product ID available");
                return;
            }
        
        try {
            setIsLoading(true);
                const response = await axios.get(`http://localhost:8000/api/v1/like/count/${actualProductId}`, {
                withCredentials: true
            });
            
            if (response.data.success) {
                setLikeCount(response.data.likes);
                setDislikeCount(response.data.dislikes);
                setIsLike(response.data.isLike);
                setIsDislike(response.data.isDislike);
            }
        } catch (error) {
            console.error("Error fetching like/dislike count:", error);
            toast.error("Couldn't fetch reaction counts");
        } finally {
                setIsLoading(false);
            }
        };

        fetchCounts();
    }, [actualProductId]);

  const handleLike = async () => {
        if (!actualProductId) {
            console.error("No product ID available");
            toast.error("Product ID is missing");
            return;
        }

        try {
            setIsLoading(true);
            const action = isLike ? 'remove' : 'like';
            
            const response = await axios.post('http://localhost:8000/api/v1/like/toggle', 
                { productId: actualProductId, type: action }, // Using 'type' instead of 'action'
                { withCredentials: true }
            );
            
            if (response.data.success) {
                setLikeCount(response.data.likes);
                setDislikeCount(response.data.dislikes);
                setIsLike(response.data.isLike);
                setIsDislike(response.data.isDislike);
                toast.success(
                    response.data.message || "Reaction processed successfully!",
                    {
                        style: {
                            color: '#10B981',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#10B981',
                            padding: '10px 20px'
                        }
                    }
                );
            } else {
                toast.error(response.data.message || "Failed to process reaction");
            }
        } catch (error) {
                console.error("Like action failed:", error);
                toast.error("Failed to process reaction");
            } finally {
            setIsLoading(false);
        }
    };

  const handleDislike = async () => {

        if (!actualProductId) {
            console.error("No product ID available");
            toast.error("Product ID is missing");
            return;

        }

        try {
            setIsLoading(true);
            const action = isDislike ? 'remove' : 'dislike';
            
            const response = await axios.post('http://localhost:8000/api/v1/like/toggle', 
                { productId: actualProductId, type: action }, // Using 'type' instead of 'action'
                { withCredentials: true }
            );
            
            if (response.data.success) {
                setLikeCount(response.data.likes);
                setDislikeCount(response.data.dislikes);
                setIsLike(response.data.isLike);
                setIsDislike(response.data.isDislike);
                toast.success(
                    response.data.message || "Reaction processed successfully!",
                    {
                        style: {
                            color: '#ef4444',
                            backgroundColor: '#09090B',
                            fontSize: '20px',
                            borderColor: '#ef4444',
                            padding: '10px 20px'
                        }
                    }
                );
            } else {
                toast.error(response.data.message || "Failed to process reaction");
            }
        } catch (error) {
                console.error("Dislike action failed:", error);
                toast.error("Failed to process reaction");
            } finally {
            setIsLoading(false);
        }
    };



  return (
        <StyledWrapper className={className}>
            <div className="like-dislike-container">
                

                <p className="text-content">What did you think<br />of this post?</p>                

                <div className="icons-box">
                    <div className="icons">
                        <label 
                        className="btn-label" 
                        htmlFor="like-checkbox"
                        style={{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                        >
                        <input 
                            className="input-box" 
                            id="like-checkbox" 
                            type="checkbox" 
                            onChange={handleLike}
                            checked={isLike}
                            disabled={isLoading}
                        />
                        <svg className="svgs" id="icon-like-solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ fill: isLike ? '#4CAF50' : '#666' }}>
                            <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                        </svg>
                        <svg className="svgs" id="icon-like-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ fill: '#666' }}>
                            <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                        </svg>
                        <div className="fireworks">
                            <div className="checked-like-fx" />
                        </div>
                        <span className="like-text-content" style={{ color: isLike ? '#4CAF50' : '#666' }}>{likeCount}</span>
                        </label>
                    </div>

                    <div className="icons">
                        <label 
                        className="btn-label" 
                        htmlFor="dislike-checkbox"
                        style={{ opacity: isLoading ? 0.5 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                        >
                        <input 
                            className="input-box" 
                            id="dislike-checkbox" 
                            type="checkbox" 
                            onChange={handleDislike}
                            checked={isDislike}
                            disabled={isLoading}
                        />
                        <div className="fireworks">
                            <div className="checked-dislike-fx" />
                        </div>
                        <svg className="svgs" id="icon-dislike-solid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ fill: isDislike ? '#F44336' : '#666', transform: 'rotate(180deg)' }}>
                            <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                        </svg>
                        <svg className="svgs" id="icon-dislike-regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ fill: '#666', transform: 'rotate(180deg)' }}>
                            <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                        </svg>
                        <span className="dislike-text-content" style={{ color: isDislike ? '#F44336' : '#666' }}>{dislikeCount}</span>
                        </label>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

Like.defaultProps = {
    className: '',
};

Like.propTypes = {
    className: PropTypes.string,
    productId: PropTypes.string,
};

export default Like;