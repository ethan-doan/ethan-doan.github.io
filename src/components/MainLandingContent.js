import React from "react";
import "../styles/MainLandingContent.css";

function MainLandingContent({ animationPlayed }) {
  return (
    <>
      <div className="main-landing-content-container">
        {!animationPlayed && (
          <div className="navbar-placeholder" style={{ height: "5vh" }}></div>
        )}
        <img
          className="headshot"
          src={require("../images/Headshot.jpg")}
          alt="headshot"
        />
        <div className="description">
          I am a passionate, ambitious, and creative Senior at Creighton
          University. I am pursuing a Bachelor's in Computer Science and Fintech
          and am driven to discover the implementations of computer science
          towards financial markets. I am actively seeking to further my
          understanding and proficiency in these areas while building
          relationships with others.
        </div>
      </div>
      <div className="scroll-container">
        <div className="explore">
          <div className="scroll-text scroll-text-first">Explore</div>
          <div className="scroll-text scroll-text-second">Explore</div>
        </div>
      </div>
    </>
  );
}

export default MainLandingContent;
