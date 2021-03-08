import React, { Component } from "react";
import logo from "./images/Logo.png";
import booking from "./images/booking.jpg";
import cancel from "./images/cancel.jpg";
import dog from "./images/dog.jpg";
import seat from "./images/seat.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <section className="jumbotron text-center">
          <div className="text-center">
            <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
              <div className="row">
                <div className="col-md-6 px-0">
                  <h1 className="display-4 font-italic">Airlines A.Z</h1>
                  <p className="lead my-3">
                    Airlines offers the possibility of faster easier and simpler
                    ticket reservations.
                  </p>
                </div>
                <div className="col-md-6 px-0">
                  <img
                    float="right"
                    className="rounded-circle"
                    src={logo}
                    alt="logo"
                    width="200"
                    height="200"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="row mb-2">
          <div className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">How to book a ticket?</h3>
                <p className="card-text mb-auto">
                  On the "Search" or "Flight" button select the destination, and
                  then press "buy" . Then choose one of the offered tickets. The
                  list of reserved tickets is on the button of "My reservation".
                </p>
              </div>
              <img
                className="rounded-circle"
                src={booking}
                alt="ticket"
                width="140"
                height="140"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">How to cancel reservation?</h3>
                <p className="card-text mb-auto">
                  On the button of "My reservation" there is a list of
                  reservations from where you can remove the reserved ticket.
                </p>
              </div>
              <img
                className="rounded-circle"
                src={cancel}
                alt="reservation"
                width="140"
                height="140"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">Advance seat reservation?</h3>
                <p className="card-text mb-auto">
                  Reservation of advance seats is not possible, it is only
                  possible to select a class.
                </p>
              </div>
              <img
                className="rounded-circle"
                src={seat}
                alt="seat"
                width="140"
                height="140"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">Travelling with pets</h3>
                <p className="card-text mb-auto">
                  If you have a pet for more information you will need to
                  contact the airline that provides that flight.
                </p>
              </div>
              <img
                className="rounded-circle"
                src={dog}
                alt="pet"
                width="140"
                height="140"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
