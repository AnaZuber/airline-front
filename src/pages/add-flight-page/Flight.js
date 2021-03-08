import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addFlight, editFlight } from "../../services/flight-service";
import { getLocations } from "../../services/location-service";
import { getAirlines } from "../../services/airline-service";

const initialState = {
  id: 0,
  edit: false,
  departureDate: new Date(),
  arrivalDate: new Date(),
  arrivalDestination: {
    id: 0,
  },
  departureDestination: {
    id: 0,
  },
  locations: [],
  airlines: [],
  airline: {
    id: 0,
  },
};

class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  componentDidMount() {
    getLocations()
      .then((resp) => this.setState({ locations: resp.data }))
      .catch((e) => console.log(e));
    getAirlines()
      .then((resp) => this.setState({ airlines: resp.data }))
      .catch((e) => console.log(e));
  }

  handleDepartureDateChange = (date) => {
    this.setState({
      departureDate: date,
    });
  };

  handleArrivalDateChange = (date) => {
    this.setState({
      arrivalDate: date,
    });
  };

  handleArrivalDestinationChange = (e) => {
    this.setState({
      arrivalDestination: {
        id: e.target.value,
      },
    });
  };

  handleDepartureDestinationChange = (e) => {
    this.setState({
      departureDestination: {
        id: e.target.value,
      },
    });
  };

  handleAirlineChange = (e) => {
    this.setState({
      airline: {
        id: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const callback = () => {
      this.props.refreshTable();
      this.setState({
        ...initialState,
        locations: [...this.state.locations],
        airlines: [...this.state.airlines],
      });
    };
    const {
      departureDate,
      arrivalDate,
      airline,
      departureDestination,
      arrivalDestination,
    } = this.state;
    if (departureDate && arrivalDate) {
      const flight = {
        id: this.state.id,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        airline: airline,
        departureDestination: departureDestination,
        arrivalDestination: arrivalDestination,
      };
      this.state.edit
        ? editFlight(flight, callback)
        : addFlight(flight, callback);
    } else {
      alert("Please enter all fields.");
    }
  };

  renderLocationOptions = () =>
    this.state.locations.map((location, i) => {
      return (
        <option value={location.id} key={i}>
          {location.address}, {location.city}, {location.country}
        </option>
      );
    });

  render() {
    return (
      <div className="container">
        <br />
        <div className="py-5 text-center">
          <h2>Add flight</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Departure destination</label>
              <select
                className="form-control"
                value={this.state.departureDestination?.id}
                onChange={this.handleDepartureDestinationChange}
              >
                <option value={0}>Departure destination</option>
                {this.renderLocationOptions()}
              </select>
            </div>
            <div className="form-group">
              <label>Arrival destination</label>
              <select
                className="form-control"
                value={this.state.arrivalDestination?.id}
                onChange={this.handleArrivalDestinationChange}
              >
                <option value={initialState.arrivalDestination.id}>
                  Arrival destination
                </option>
                {this.renderLocationOptions()}
              </select>
            </div>
            <div className="form-group">
              <label>Airline</label>
              <select
                className="form-control"
                value={this.state.airline?.id}
                onChange={this.handleAirlineChange}
              >
                <option value={0}>Airline</option>
                {this.state.airlines.map((airline, i) => (
                  <option value={airline.id} key={i}>
                    {airline.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Departure date</label>
              <br />
              <DatePicker
                selected={this.state.departureDate}
                onChange={this.handleDepartureDateChange}
                className="departureDate"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={20}
                timeCaption="time"
                dateFormat="d MMMM, yyyy h:mm aa"
              />
            </div>
            <div className="form-group">
              <label>Arrival date</label>
              <br />
              <DatePicker
                selected={this.state.arrivalDate}
                onChange={this.handleArrivalDateChange}
                className="departureDate"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={20}
                timeCaption="time"
                dateFormat="d MMMM, yyyy h:mm aa"
              />
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

export default Flight;
