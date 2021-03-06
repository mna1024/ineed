import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./NavBar.css";

const GOOGLE_CLIENT_ID = "942346034916-b4mth5m9bhtvlnpuppa4djfu0olrdj0i.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className = "Bar">
    <nav className="NavBar-container">
      <img className="NavBar-logo-image" src="../../../favicon.png"/>
      <div className="NavBar-title-part1 u-inlineBlock">i</div>
      <div className="NavBar-title-part2 u-inlineBlock">need</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        
        <Link to={`/`} className="NavBar-link">
          Home
        </Link>
        
        {userId && (
          <Link to={`/profile/`} className="NavBar-link">
            Profile
          </Link>
        )}
        {userId && (
          <Link to={`/feed/`} className="NavBar-link">
            Feed
          </Link>
        )}
        {userId && (
          <Link to={`/new-post/`} className="NavBar-link">
            New Post
          </Link>
        )}
        {userId && (
          <Link to={`/messages/`} className="NavBar-link">
            Messages
          </Link>
        )}
        <div className="NavBar-link u-inlineBlock">
          {userId ? (
              <Link to={`/`} className="NavBar-link" >
                <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={handleLogout}
                onFailure={
                  (err) => {

                  }
                }
                />
              </Link>
          ) : (null)}
        </div>
        {!userId && (
          <Link to={`/login/`} className="NavBar-link">
            Login
          </Link>
        )}
      </div>
    </nav>
    </div>
  );
}

export default NavBar