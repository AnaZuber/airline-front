import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { search } from "../../services/search-service";
import { getLocations } from "../../services/location-service";
import FlightsTable from "../add-flight-page/FlightsTable";

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
  flights: [],
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);
    this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
  }

  componentDidMount() {
    getLocations()
      .then((resp) => this.setState({ locations: resp.data }))
      .catch((e) => console.log(e));
  }

  handleDepartureDateChange(date) {
    this.setState({
      departureDate: date,
    });
  }

  handleArrivalDateChange(date) {
    this.setState({
      arrivalDate: date,
    });
  }

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

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      departureDestination,
      arrivalDestination,
      departureDate,
      arrivalDate,
    } = this.state;
    search(departureDestination, arrivalDestination, departureDate, arrivalDate)
      .then((resp) => {
        this.setState({
          flights: resp.data,
        });
      })
      .catch((e) => {
        alert("Search error");
      });
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
    const { role } = this.props;
    return (
      <div className="container">
        <br />
        <div className="py-5 text-center">
          <h2>Search Flights</h2>
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
              Search
            </button>
          </form>
        </div>
        <FlightsTable
          flights={this.state.flights}
          role={role}
          isSearch={true}
        />
      </div>
    );
  }
}

export default Search;
