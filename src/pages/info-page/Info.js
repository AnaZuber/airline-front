import React, { Component } from "react";
import payment from "./images/payment.jpg";
import maestro from "./images/maestro.png";
import mastercard from "./images/mastercard.png";
import visa from "./images/visa.png";
import paypal from "./images/paypal.jpg";
import contact from "./images/contact.jpg";
import follow from "./images/follow.png";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <section className="jumbotron text-center">
          <div className="carousel-inner">
            <h1>About us</h1>
            <h3 className="lead my-3">
              Airlines enables easier, faster and more efficient booking of
              airline tickets. We work with various airlines around the world.
              We also offer flights to international destinations in Asia,
              Australia, North America and Africa through Etihad Airways and our
              other partner airlines. We try to make it as easy as possible for
              our customers to book a ticket safely and quickly
            </h3>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="card-body">
                <img
                  className="rounded-circle"
                  src={contact}
                  alt="Contact"
                  width="140"
                  height="140"
                />
                <h2>Contact us</h2>
                <p className="card-text">
                  Phone number from Serbia: 0800 222 528 from other countries:
                  +381 11 788 47 23 email callcenter@airlines.com
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card-body">
                <img
                  className="rounded-circle"
                  src={payment}
                  alt="Payment"
                  width="140"
                  height="140"
                />
                <h2>Payments cards</h2>
                <div className="row">
                  <div className="col-xs-4">
                    <img
                      src={mastercard}
                      alt="mastercard"
                      width="55"
                      height="55"
                    />
                    <> </>
                    <img src={visa} alt="visa" width="55" height="55" />
                    <> </>
                    <img src={maestro} alt="maestro" width="55" height="55" />
                    <> </>
                    <img src={paypal} alt="paypal" width="55" height="55" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card-body">
                <img src={follow} alt="Follow us" width="140" height="140" />
                <h2>Follow us</h2>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Info;
