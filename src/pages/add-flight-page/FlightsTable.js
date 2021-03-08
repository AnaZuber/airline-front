import React, { Component } from "react";
import moment from "moment";
import { FlightReservationModal } from "./FlightReservationModal";

class FlightsTable extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
  }

  toggleModal = (flightId) => () => {
    this.modal.current.toggle();
    this.modal.current.loadTickets(flightId);
  };

  render() {
    const { role, isSearch } = this.props;

    const isAdminOrWorker = role === 0 || role === 1;

    const shouldRenderEdit = isAdminOrWorker && !isSearch;
    const shouldRenderBuy = !isAdminOrWorker;
    return (
      <>
        <FlightReservationModal ref={this.modal} />
        <div className="container">
          <br />
          <div className="py-5 text-center">
            <h2>Flights</h2>
          </div>
          <div className="col-md-12 order-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Departure destination</th>
                  <th scope="col">Arrival destination</th>
                  <th scope="col">Departure date</th>
                  <th scope="col">Arrival date</th>
                  <th scope="col">Airline</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.flights &&
                  this.props.flights.map(
                    (flight, i) =>
                      flight && (
                        <tr key={i}>
                          <td>{flight.id}</td>
                          <td>
                            {flight.departureDestination?.city},{" "}
                            {flight.departureDestination?.country}
                          </td>
                          <td>
                            {flight.arrivalDestination?.city},{" "}
                            {flight.arrivalDestination?.country}
                          </td>
                          <td>{moment(flight.departureDate).format("lll")}</td>
                          <td>{moment(flight.arrivalDate).format("lll")}</td>
                          <td>{flight.airline?.name}</td>
                          <td>
                            {shouldRenderEdit && (
                              <button
                                type="button"
                                className="btn btn-info save-btn"
                                onClick={this.props.handleEditFlight(flight)}
                              >
                                Edit
                              </button>
                            )}
                            {shouldRenderBuy && (
                              <button
                                type="button"
                                className="btn btn-info save-btn"
                                onClick={this.toggleModal(flight.id)}
                              >
                                Buy Ticket
                              </button>
                            )}
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

export default FlightsTable;
