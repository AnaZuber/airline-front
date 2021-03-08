import React, { Component } from "react";
import { addLocation, editLocation } from "../../services/location-service";

const initialState = {
  id: 0,
  edit: false,
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleCityChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  handlePostalCodeChange = (event) => {
    this.setState({
      postalCode: event.target.value,
    });
  };

  handleCountryChange = (event) => {
    this.setState({
      country: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const callback = () => {
      this.props.refreshTable();
      this.setState({
        ...initialState,
      });
    };

    const { address, city, postalCode, country } = this.state;
    if (address && city && postalCode && country) {
      const location = {
        id: this.state.id,
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      };
      this.state.edit
        ? editLocation(location, callback)
        : addLocation(location, callback);
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
          <h2>Add location</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleAddressChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={this.state.city}
                onChange={this.handleCityChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                className="form-control"
                placeholder="Postal Code"
                value={this.state.postalCode}
                onChange={this.handlePostalCodeChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={this.state.country}
                onChange={this.handleCountryChange}
                required
                autoFocus
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

export default Location;
