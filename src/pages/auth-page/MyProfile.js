import React, { Component } from "react";
import { editProfile } from "../../services/auth-service";
import { getLocations } from "../../services/location-service";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.user = JSON.parse(localStorage.getItem("user")).user;
    this.state = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      cardNumber: this.user.cardNumber || "",
      locations: [],
      location: this.user.location ? this.user.location.id : "",
    };
  }

  componentDidMount() {
    getLocations()
      .then((resp) => this.setState({ locations: resp.data }))
      .catch((e) => console.log(e));
  }

  handleFirstNameChange = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastNameChange = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleCardNumberChange = (event) => {
    this.setState({
      cardNumber: event.target.value,
    });
  };

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    editProfile(this.state);
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
          <h2>Edit profile</h2>
        </div>
        <div className="col-md-12 order-md-1">
          <form className="needs-validation" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                id="inputfirstName"
                className="form-control"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
                required
                autoFocus
              />
            </div>
            <div className="user-box">
              <label>Last name</label>
              <input
                type="text"
                id="inputlastName"
                className="form-control"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Card number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Card number"
                value={this.state.cardNumber}
                onChange={this.handleCardNumberChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <select
                className="form-control"
                value={this.state.location}
                onChange={this.handleLocationChange}
              >
                <option value="">Location</option>
                {this.renderLocationOptions()}
              </select>
            </div>
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MyProfile;
