import React, { Component } from "react";
import {
  getTicketsByCustomerId,
  cancelReservation,
} from "../../services/customer-ticket-service";
import moment from "moment";

class ReservationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerTickets: [],
    };
    this.user = JSON.parse(localStorage.getItem("user"))?.user;
  }

  componentDidMount() {
    this.loadTickets();
  }

  loadTickets = () => {
    getTicketsByCustomerId(this.user.id)
      .then((resp) => {
        this.setState({
          customerTickets: resp.data,
        });
      })
      .catch((e) => console.log(e));
  };

  handleClickCancelReservation = (customerTicketId) => () => {
    const callback = () => this.loadTickets();
    cancelReservation(customerTicketId, callback);
  };

  render() {
    return (
      <>
        <div className="container">
          <br />
          <div className="py-5 text-center">
            <h2>My Reservations</h2>
          </div>
          <div className="col-md-12 order-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Price</th>
                  <th scope="col">Seats Available</th>
                  <th scope="col">Flight Class</th>
                  <th scope="col">Luggage weight</th>
                  <th scope="col">Departure destination</th>
                  <th scope="col">Arrival destination</th>
                  <th scope="col">Departure date</th>
                  <th scope="col">Arrival date</th>
                  <th scope="col">Airline</th>
                </tr>
              </thead>
              <tbody>
                {this.state.customerTickets.map(
                  (customerTicket, i) =>
                    customerTicket && (
                      <tr key={i}>
                        <td>{customerTicket.id}</td>
                        <td>{customerTicket.ticket.price}</td>
                        <td>{customerTicket.ticket.seatsAvailable}</td>
                        <td>{customerTicket.ticket.flightClass}</td>
                        <td>{customerTicket.ticket.luggageWeight}</td>
                        <td>
                          {
                            customerTicket.ticket.flight?.departureDestination
                              ?.city
                          }
                          ,{" "}
                          {
                            customerTicket.ticket.flight?.departureDestination
                              ?.country
                          }
                        </td>
                        <td>
                          {
                            customerTicket.ticket.flight?.arrivalDestination
                              ?.city
                          }
                          ,{" "}
                          {
                            customerTicket.ticket.flight?.arrivalDestination
                              ?.country
                          }
                        </td>

                        <td>
                          {moment(
                            customerTicket.ticket.flight?.departureDate
                          ).format("lll")}
                        </td>
                        <td>
                          {moment(
                            customerTicket.ticket.flight?.arrivalDate
                          ).format("lll")}
                        </td>
                        <td>{customerTicket.ticket.flight?.airline?.name}</td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-info save-btn"
                            onClick={this.handleClickCancelReservation(
                              customerTicket.id
                            )}
                          >
                            Cancel reservation
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default ReservationTable;
