import React from 'react';

const Competition = ({
  backgroundColor,
  imageSrc,
  competitionTitle,
  fundingAmount,
  equityTaken,
  competitionType,
  equityPercentage
}) => {
  return (
    <div className="border" style={{
      marginLeft: "0px",
      marginBottom: "70px",
      marginTop: "-60px",
      minWidth: "800px",
      borderRadius: "3px",
      height: "170px",
      width: "1100px",
      paddingLeft: "300px",
      position: "relative",
      backgroundColor: "#ffffff"
    }}>
     
      <div style={{ position: "absolute", left: "0", top: "0", height: "100%", width: "5px", backgroundColor: backgroundColor  }}></div>
      <img
        src={imageSrc} 
        alt="Sample Image"
        style={{
          position: "absolute",
          left: "18px",
          top: "17px",
          width: "126px",
          height: "126px",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "180px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {competitionTitle} 
      </span>
      <span
        style={{
          position: "absolute",
          top: "89px",
          left: "180px",
          fontSize: "20px",
        }}
      >
        Funding Amount: <b>{fundingAmount}</b> 
      </span>
      
      <span
        style={{
          position: "absolute",
          top: "44px",
          left: "810px",
          fontSize: "20px",
        }}
      >
        Competition Type: <b>{competitionType}</b> 
      </span>
      <span
        style={{
          position: "absolute",
          top: "84px",
          left: "810px",
          fontSize: "20px",
        }}
      >
        Equity Taken: <b>{equityPercentage}</b> 
      </span>

      <span
        style={{
          position: "absolute",
          top: "114px",
          left: "180px",
          fontSize: "20px",
        }}
      >
        Equity Taken: <b>{equityTaken}</b>
      </span>
      
    </div>
  );
};

export default Competition;