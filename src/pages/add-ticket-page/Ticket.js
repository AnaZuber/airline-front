import React, { Component } from "react";
import { addTicket, editTicket } from "../../services/ticket-service";
import { getFlights } from "../../services/flight-service";
import moment from "moment";

const initialState = {
  id: 0,
  edit: false,
  price: "",
  seatsAvailable: "",
  luggageWeight: "",
  flightClass: "",
  flights: [],
  flight: {
    id: 0,
  },
};
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  componentDidMount() {
    getFlights()
      .then((resp) => this.setState({ flights: resp.data }))
      .catch((e) => console.log(e));
  }

  handlePriceChange = (event) => {
    this.setState({
      price: event.target.value,
    });
  };

  handleSeatsAvailableChange = (event) => {
    this.setState({
      seatsAvailable: event.target.value,
    });
  };

  handleLuggageWeighChange = (event) => {
    this.setState({
      luggageWeight: event.target.value,
    });
  };

  handleFlightClassChange = (e) => {
    this.setState({
      flightClass: e.target.value,
    });
  };

  handleFlightChange = (e) => {
    this.setState({
      flight: {
        id: e.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const callback = () => {
      this.props.refreshTable();
      this.setState({ ...initialState, flights: [...this.state.flights] });
    };
    const {
      price,
      seatsAvailable,
      luggageWeight,
      flight,
      flightClass,
    } = this.state;
    if (price && seatsAvailable && flightClass !== "") {
      const ticket = {
        id: this.state.id,
        price: price,
        seatsAvailable: seatsAvailable,
        luggageWeight: luggageWeight,
        flightClass: flightClass,
        flight: flight,
      };
      this.state.edit
        ? editTicket(ticket, callback)
        : addTicket(ticket, callback);
    } else {
      alert("Please enter all fields.");
    }
  };

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div className="py-5 text-center">
          <h2>Add ticket</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                value={this.state.price}
                onChange={this.handlePriceChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Seats available</label>
              <input
                type="text"
                className="form-control"
                placeholder="Seats available"
                value={this.state.seatsAvailable}
                onChange={this.handleSeatsAvailableChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Luggage weigh</label>
              <input
                type="text"
                className="form-control"
                placeholder="Luggage weigh"
                value={this.state.luggageWeight}
                onChange={this.handleLuggageWeighChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Flight Class</label>
              <select
                className="form-control"
                value={this.state.flightClass}
                onChange={this.handleFlightClassChange}
              >
                <option value="">Flight Class</option>
                <option value={0}>First Class</option>
                <option value={1}>Second Class</option>
                <option value={2}>Third Class</option>
              </select>
            </div>
            <div className="form-group">
              <label>Flight</label>
              <select
                className="form-control"
                value={this.state.flight?.id}
                onChange={this.handleFlightChange}
              >
                <option value={0}>Flight</option>
                {this.state.flights.map((flight, i) => (
                  <option value={flight.id} key={i}>
                    {moment(flight.departureDate).format("lll")},
                    {moment(flight.arrivalDate).format("lll")},{" "}
                    {flight.departureDestination?.city},{" "}
                    {flight.departureDestination?.country},{" "}
                    {flight.arrivalDestination?.city},{" "}
                    {flight.arrivalDestination?.country}, {flight.airline?.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Ticket;
