import React, { useState } from 'react';
import styled from 'styled-components';
import DetectionModal from '../components/DetectionModal'; // 모달 컴포넌트

const sampleRecords = [
  {
    id: 1,
    videoThumbnail: '/images/thumbnail1.jpg',
    videoName: 'MT20240729-01',
    detectionDateTime: '2024-07-29 14:30',
    detectionType: '승가',
    decision: '미확인',
    videoDuration: 120, // 2분
  },
  {
    id: 2,
    videoThumbnail: '/images/thumbnail2.jpg',
    videoName: 'MT20240729-02',
    detectionDateTime: '2024-07-29 15:00',
    detectionType: '승가',
    decision: 'Y',
    videoDuration: 150, // 2분 30초
  },
  {
    id: 3,
    videoThumbnail: '/images/thumbnail3.jpg',
    videoName: 'MT20240730-01',
    detectionDateTime: '2024-07-30 14:30',
    detectionType: '승가',
    decision: 'Y',
    videoDuration: 95, // 1분 35초
  },
  {
    id: 4,
    videoThumbnail: '/images/thumbnail4.jpg',
    videoName: 'MT20240730-02',
    detectionDateTime: '2024-07-30 15:00',
    detectionType: '승가',
    decision: 'N',
    videoDuration: 180, // 3분
  },
  // 추가적인 탐지 기록을 여기에 추가
];

function DetectionRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleBoxClick = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <DetectionRecordsContainer>
      <RecordsGrid>
        {sampleRecords.map((record) => (
          <RecordBox key={record.id} onClick={() => handleBoxClick(record)}>
            <Thumbnail src={record.videoThumbnail} alt={record.videoName} />
            <Info>
              <VideoName>{record.videoName}</VideoName>
              <DateTime>{record.detectionDateTime}</DateTime>
              <DetectionType>{record.detectionType}</DetectionType>
              <Duration>{formatDuration(record.videoDuration)}</Duration>
              <Decision>{record.decision}</Decision>
            </Info>
          </RecordBox>
        ))}
      </RecordsGrid>
      {selectedRecord && (
        <DetectionModal record={selectedRecord} onClose={handleCloseModal} />
      )}
    </DetectionRecordsContainer>
  );
}

export default DetectionRecords;

const DetectionRecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  max-height: 700px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 50px auto;
  overflow-y: auto;

  @media (max-width:768px){
    width: 80%;
  }
`;

const RecordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RecordBox = styled.div`
  display: flex;
  width: 350px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #f0f0f0;
    color: black;
  }
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
  border-style: none;
  border-radius: 8px;
`;

const Info = styled.div`
  width: 300px;
  padding: 10px;
`;

const VideoName = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const DateTime = styled.p`
  font-size: 14px;
  color: #555;
`;

const DetectionType = styled.p`
  font-size: 14px;
  color: #888;
`;

const Duration = styled.p`
  font-size: 14px;
  color: #000;
  font-weight: bold;

  .dark-mode & {
    color: #888;
  }
`;
const Decision = styled.p`
  font-size: 16px;
  font-weight: bold;
`