import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const NotificationDropdown = ({ isOpen, closeDropdown }) => {
  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event) => {
        if (!event.target.closest('.notification-dropdown')) {
          closeDropdown();
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen, closeDropdown]);

  const notifications = [
    {
      videoName: 'MT20240729-01',
      detectionDateTime: '2024-07-29 14:23',
      detectionType: '승가(MT)',
    },
    {
      videoName: 'MT20240729-02',
      detectionDateTime: '2024-07-29 15:12',
      detectionType: '승가(MT)',
    },
    {
      videoName: 'MT20240729-02',
      detectionDateTime: '2024-07-29 15:12',
      detectionType: '승가(MT)',
    },
  ];

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <NotificationMenu className="notification-dropdown">
      <h3>{notifications.length > 0 ? `새로운 알림이 ${notifications.length}개 있습니다!` : '알림이 없습니다.'}</h3>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index}>
              <p><strong>영상 이름:</strong> {notification.videoName}</p>
              <p><strong>탐지 일자 및 시간:</strong> {notification.detectionDateTime}</p>
              <p><strong>탐지 유형:</strong> {notification.detectionType}</p>
            </li>
          ))
        ) : (
          <li>알림이 없습니다.</li>
        )}
      </ul>
    </NotificationMenu>,
    document.body
  );
};

export default NotificationDropdown;

const NotificationMenu = styled.div`
  position: fixed;
  top: 75px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  max-height: 300px;
  overflow-y: auto;

  h3 {
    
  }

  p {
    font-weight: bold;
    font-size: 14px;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px 0;

      &:hover{
        background-color: #e0e0e0;
      }

      p {
        margin: 5px 5px;
      }
    }
  }

  /* 다크 모드 스타일 */
  body.dark-mode & {
    background-color: #333;
    color: #e0e0e0;
    border-color: #444;

    p {
      color: #e0e0e0;
    }

    ul li {
      border-bottom-color: #444;
    }
  }
  @media (max-width:768px){
    top: 120px;
  }
`;