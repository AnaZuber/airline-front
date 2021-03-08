import React, { Component } from "react";
import { addAirline, editAirline } from "../../services/airline-service";
import { getLocations } from "../../services/location-service";

const initialState = {
  id: 0,
  edit: false,
  name: "",
  locations: [],
  location: {
    id: 0,
  },
};

class Airline extends Component {
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
  }
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleLocationChange = (e) => {
    this.setState({
      location: {
        id: e.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const callback = () => {
      this.props.refreshTable();
      this.setState({
        ...initialState,
        locations: [...this.state.locations],
      });
    };

    const { name, location } = this.state;
    if (name) {
      const airline = {
        id: this.state.id,
        name: name,
        location: location,
      };
      this.state.edit
        ? editAirline(airline, callback)
        : addAirline(airline, callback);
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
          <h2>Add airline</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleNameChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <select
                className="form-control"
                value={this.state.location?.id}
                onChange={this.handleLocationChange}
              >
                <option value={0}>Location</option>
                {this.state.locations.map((location, i) => (
                  <option value={location.id} key={i}>
                    {location.address}, {location.city}, {location.postalCode},{" "}
                    {location.country}
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

export default Airline;
