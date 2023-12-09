import React from 'react';

const Competition = () => {
  return (
    <div className="border" style={{ marginLeft: "0px", marginBottom: "-20px", marginTop: "0px",minWidth: "800px", borderRadius: "3px", height: "170px", width: "1100px", paddingLeft: "300px", position: "relative" }}>
      <div style={{ position: "absolute", left: "0", top: "0", height: "100%", width: "5px", backgroundColor: "black" }}></div>
      <img
        src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" // Replace with your image path
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
        Female Veterans pitch competition
      </span>
      <span
        style={{
          position: "absolute",
          top: "89px",
          left: "180px",
          fontSize: "20px",
        }}
      >
        Funding Amount: <b>$20000</b>
      </span>
      <span
        style={{
          position: "absolute",
          top: "114px",
          left: "180px",
          fontSize: "20px",
        }}
      >
        Equity Taken: <b>True</b>
      </span>
      <span
        style={{
          position: "absolute",
          top: "44px",
          left: "860px",
          fontSize: "20px",
        }}
      >
        Competition Type: <b>Pitch</b>
      </span>
      <span
        style={{
          position: "absolute",
          top: "84px",
          left: "860px",
          fontSize: "20px",
        }}
      >
        Equity Taken: <b>15%</b>
      </span>
      <div
        style={{
          position: "absolute",
          left: "830px",
          top: "0",
          height: "100%",
          width: "1px",
          backgroundColor: "lightgray",
        }}
      ></div>
    </div>
  );
};

export default Competition;