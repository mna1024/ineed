import React, { Component } from "react";
import { useEffect } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Home.css";


const Home = ({userId}) => {
  // Modified from https://codepen.io/gschier/pen/jkivt
  let TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 500;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  useEffect(() => {  
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i=0; i<elements.length; i++) {
      let toRotate = elements[i].getAttribute('data-rotate');
      let period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #292a2a }";
    document.body.appendChild(css);
  }, []);
  
  return (
    <>
      <div className="Home-img">
        <div className="Home-body-title-4 u-inlineBlock u-textCenter">
          <br></br>
          <br></br>
          <div className="Home-overlay">
            The social way to get what you need.
          </div>
          <br></br>
          <br></br>
          {!userId && (
          <Link to={`/login/`} className="Home-body-link">
            Join Our Community
          </Link>
        )}
          <br></br>
          <br></br>
        </div>
      </div>

      {!userId && (
          <section className="Home-section"> 
          <h1 className="u-textCenter">Need something? We got you.</h1>
          <br></br>
          <h1 className="u-textCenter">Join our community now to get what you need in three easy steps.</h1>
          <br></br>
       </section>
        )}

      {userId && (
          <section className="Home-section"> 
            <h1 className="u-textCenter">Need something? We got you.</h1>
            <br></br>
            <h1 className="u-textCenter">Get what you need in three easy steps.</h1>
            <br></br>
          </section>
          
      )}

     
          <section className="Home-section5 u-textCenter"> 

          <section className="Home-section4 u-inlineBlock">
              <h1 className="Home-body-title-4">1. Post</h1>
             
              <img src="../../../send.png" className="Home-img2"/>
          </section>
  
          <section className="Home-section2 u-inlineBlock">
              <h1 className="Home-body-title-4">2. Message</h1>
             
              <img src="../../../chat.png" className="Home-img2"/>
          </section>
  
          <section className="Home-section3 u-inlineBlock">
              <h1 className="Home-body-title-4">3. Meet</h1>
             
              <img src="../../../deal.png" className="Home-img2"/>
          </section>
  
       </section>
          
   

      
          <section className="Home-section">
          <h1 className="Home-body-title-1 u-textCenter">Post</h1>
         
          <br></br>
          <h1>Go to New Post and simply post whatever you need ... </h1>
          <br></br>
          <h1 className="Home-body-title-2">I need
            <span
              class="txt-rotate"
              data-period="100"
              data-rotate='[ " a 10 ft phone charger cable. ", " someone good at drawing. ", " help on physics homework. "]'></span>
          </h1>
          <br></br>
          <h1 className="u-flex-alignCenter">... along with anything you'll offer in return ...</h1>
            <br></br>
            <h1 className="Home-body-title-3">I offer
              <span
                class="txt-rotate"
                data-period="100"
                data-rotate='[ " $10 on Venmo. ", " two cups of boba :)  ", " free hugs <3  "]'></span>
          </h1>
          <br></br>
          <h1 className="u-flex-alignCenter">... and possibly additional details like when and where people can meet you.</h1>
        </section>
     

      
          <section className="Home-section">
          <h1 className="Home-body-title-1 u-textCenter">Message</h1>
         
          <br></br>
          <h1>Want to respond to someone's offer in your feed?</h1>
          <br></br>
          <h1>
            Let them know in Messages! 
          </h1>
          <br></br>
          <h1>
            Get to Messages by clicking Message on their post or Messages in the navigation bar. This is the perfect place to work out details
            like when and where to meet someone. 
          </h1>
          <br></br>
          <h1>
            Messages also features All Chat, a groupchat of all Ineed users, where you can get to know the people who may accept your future offers.
          </h1>
          <br></br>
          <div className="u-textCenter">
            <img src="../../../blue_boy_typing_nothought.gif" className="Home-img2"/>
          </div>
        </section> 


    
          <section className="Home-section">
          <h1 className="Home-body-title-1 u-textCenter">Meet</h1>
         
          <br></br>
          <h1>After working out any details in Messages, meet up to seal the deal and get what you need! If you're lucky, you might even get a new friend as a bonus.</h1>
          <br></br>
          <div className="u-textCenter">
            <img src="../../../handshake.gif" className="Home-img2"/>
          </div>
          <br></br>
          {!userId && (
            <h1  className="u-textCenter"><Link to={`/login/`} className="Home-body-link2">
            Login
          </Link> to get started!
          </h1>
          )}
          {userId && (
            <h1  className="u-textCenter">Now it's time to make a <Link to={`/new-post/`} className="Home-body-link2">
            New Post
          </Link>!
          </h1>
          )}
        </section>   
    </>
  );
};

export default Home;
