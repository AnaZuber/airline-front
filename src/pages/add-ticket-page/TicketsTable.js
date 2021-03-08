import React, { Component } from "react";
import { getTickets } from "../../services/ticket-service";
import Ticket from "./Ticket";
import moment from "moment";

class TicketsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
    this.child = React.createRef();
  }

  componentDidMount() {
    this.loadTickets();
  }

  loadTickets = () => {
    getTickets()
      .then((resp) => {
        this.setState({
          tickets: resp.data,
        });
      })
      .catch((e) => console.log(e));
  };

  handleEditTicket = (ticket) => (e) => {
    this.child.current.setState({
      edit: true,
      ...ticket,
    });
  };

  render() {
    return (
      <>
        <Ticket ref={this.child} refreshTable={this.loadTickets} />
        <div className="container">
          <br />
          <div className="py-5 text-center">
            <h2>Tickets</h2>
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
                {this.state.tickets.map(
                  (ticket, i) =>
                    ticket && (
                      <tr key={i}>
                        <td>{ticket.id}</td>
                        <td>{ticket.price}</td>
                        <td>{ticket.seatsAvailable}</td>
                        <td>{ticket.flightClass}</td>
                        <td>{ticket.luggageWeight}</td>
                        <td>
                          {ticket.flight?.departureDestination?.city},{" "}
                          {ticket.flight?.departureDestination?.country}
                        </td>
                        <td>
                          {ticket.flight?.arrivalDestination?.city},{" "}
                          {ticket.flight?.arrivalDestination?.country}
                        </td>

                        <td>
                          {moment(ticket.flight?.departureDate).format("lll")}
                        </td>
                        <td>
                          {moment(ticket.flight?.arrivalDate).format("lll")}
                        </td>
                        <td>{ticket.flight?.airline?.name}</td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-info save-btn"
                            onClick={this.handleEditTicket(ticket)}
                          >
                            Edit
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

export default TicketsTable;
