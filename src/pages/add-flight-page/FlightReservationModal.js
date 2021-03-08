import React, { Component } from "react";
import { getTicketsByFlightId } from "../../services/ticket-service";
import { buyTicket } from "../../services/customer-ticket-service";

export class FlightReservationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      tickets: [],
    };
    this.user = JSON.parse(localStorage.getItem("user")).user;
  }

  handleConfirm = (e) => {
    e.preventDefault();

    this.props.onConfirm();

    this.toggle();
  };

  handleClose = (e) => {
    e.preventDefault();
    this.toggle();
  };

  handleClickBuyTicket = (id) => () => {
    buyTicket(this.user.id, id);
    this.toggle();
  };

  toggle = () => {
    const { toggled } = this.state;

    this.setState({
      toggled: !toggled,
    });
  };

  loadTickets = (flightId) => {
    getTicketsByFlightId(flightId)
      .then((resp) => {
        this.setState({
          tickets: resp.data,
        });
      })
      .catch((e) => console.log(e));
  };

  render() {
    const { toggled } = this.state;
    return (
      <div
        className={toggled ? "modal fade show d-block" : "modal fade"}
        id="exampleModalCenter"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Flight Class</th>
                      <th scope="col">Price</th>
                      <th scope="col">Luggage Weight</th>
                      <th scope="col">Seats Available</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tickets.map(
                      (ticket, i) =>
                        ticket && (
                          <tr key={i}>
                            <td>{ticket.id}</td>
                            <td>{ticket.flightClass}</td>
                            <td>{ticket.price}</td>
                            <td>{ticket.luggageWeight}</td>
                            <td>{ticket.seatsAvailable}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-success save-btn"
                                onClick={this.handleClickBuyTicket(ticket.id)}
                              >
                                Buy
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={this.toggle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
