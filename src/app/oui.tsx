import React from 'react';

const GridLayout = () => {
  return (
    <div className="container">
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index} className="item"></div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 60px;
          padding-left: 140px;
          padding-right: 140px;
          width: 100vw;
          height: 100dvh;
          position: fixed;
          pointer-events: none;
        }
        .item {
          background-color: #4caf50;
          color: white;
          flex: 1;
          text-align: center;
          font-size: 20px;
          border: 2px solid #fff;
          border-radius: 5px;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default GridLayout;
