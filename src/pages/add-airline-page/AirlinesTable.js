import React, { Component } from "react";
import { getAirlines } from "../../services/airline-service";
import Airline from "./Airline";

export class AirlinesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airlines: [],
    };
    this.child = React.createRef();
  }

  componentDidMount() {
    this.loadAirlines();
  }

  loadAirlines = () => {
    getAirlines()
      .then((resp) => {
        this.setState({
          airlines: resp.data,
        });
      })
      .catch((e) => console.log(e));
  };

  handleEditAirline = (airline) => (e) => {
    this.child.current.setState({
      edit: true,
      ...airline,
    });
  };

  render() {
    return (
      <>
        <Airline ref={this.child} refreshTable={this.loadAirlines} />
        <div className="container">
          <br />
          <div className="py-5 text-center">
            <h2>Airlines</h2>
          </div>
          <div className="col-md-12 order-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Postal code</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {this.state.airlines.map((airline, i) => {
                  return (
                    airline && (
                      <tr key={i}>
                        <td>{airline.id}</td>
                        <td>{airline.name}</td>
                        <td>{airline.location?.address}</td>
                        <td>{airline.location?.city}</td>
                        <td>{airline.location?.postalCode}</td>
                        <td>{airline.location?.country}</td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-info save-btn"
                            onClick={this.handleEditAirline(airline)}
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

export default AirlinesTable;
