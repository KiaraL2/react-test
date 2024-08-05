import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const DetectionModal = ({ record, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [decision, setDecision] = useState(null);

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 기록을 삭제하시겠습니까?')) {
      onClose(); 
    }
  };

  const handleDecision = (value) => {
    setDecision(value);
  };

  if (!record) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>영상 세부정보</h2>
        <DetectedVideo
          src={`/videos/${record.videoName}.mp4`}
          title="Video"
          controls
        />
        <Detail>
          <p><strong>제목:</strong> {record.videoName}</p>
          <p><strong>일자:</strong> {record.detectionDateTime}</p>
          <p><strong>영상 길이:</strong> 5분 30초</p>
          <p><strong>탐지 유형:</strong> {record.detectionType}</p>
          <p><strong>탐지 카메라:</strong> 카메라 1</p>
        </Detail>
        <Decision>
          <p>승가 여부 결정:</p>
          <ButtonGroup>
            <DecisionButton
              active={decision === 'Y'}
              onClick={() => handleDecision('Y')}
            >
              Y
            </DecisionButton>
            <DecisionButton
              active={decision === 'N'}
              onClick={() => handleDecision('N')}
            >
              N
            </DecisionButton>
          </ButtonGroup>
        </Decision>
        <Actions>
          <ActionButton onClick={handleSave} disabled={isSaved}>
            {isSaved ? '저장됨' : '동영상 저장'}
          </ActionButton>
          <ActionButton onClick={handleDelete}>기록 삭제</ActionButton>
        </Actions>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default DetectionModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 10px; 
  width: 80%;
  max-width: 600px;
  max-height: 80vh; 
  overflow-y: auto; 
  position: relative;
  color: #000;

  body.dark-mode & {
    background: #333;
    color: #e0e0e0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000;

  body.dark-mode & {
    color: #e0e0e0;
  }
`;

const DetectedVideo = styled.video`
  width: 100%;
  height: 200 ;
  
`;
const Detail = styled.div`
  margin: 10px 0; 
`;

const Decision = styled.div`
  margin: 10px 0; 
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const DecisionButton = styled.button`
  padding: 8px 16px; 
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#007bff')};
  font-size: 14px; 
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#f1f1f1')};
  }

  body.dark-mode & {
    border-color: #444;
    background-color: ${(props) => (props.active ? '#0056b3' : '#333')};
    color: ${(props) => (props.active ? '#fff' : '#bbb')};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px; 
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px; 
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  body.dark-mode & {
    background-color: #0056b3;
  }
`;