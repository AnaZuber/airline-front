import React, { Component } from "react";
import { getLocations } from "../../services/location-service";
import Location from "./Location";

class LocationsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
    };
    this.child = React.createRef();
  }

  componentDidMount() {
    this.loadLocations();
  }

  loadLocations = () => {
    getLocations()
      .then((resp) => {
        this.setState({
          locations: resp.data,
        });
      })
      .catch((e) => console.log(e));
  };

  handleEditLocation = (location) => (e) => {
    this.child.current.setState({
      edit: true,
      ...location,
    });
  };

  render() {
    return (
      <>
        <Location ref={this.child} refreshTable={this.loadLocations} />
        <div className="container">
          <br />
          <div className="py-5 text-center">
            <h2>Locations</h2>
          </div>
          <div className="col-md-12 order-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Postal Code</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {this.state.locations.map((location, i) => {
                  return (
                    location && (
                      <tr key={i}>
                        <td>{location.id}</td>
                        <td>{location.address}</td>
                        <td>{location.city}</td>
                        <td>{location.postalCode}</td>
                        <td>{location.country}</td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-info save-btn"
                            onClick={this.handleEditLocation(location)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default LocationsTable;
