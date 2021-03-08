import React from "react";
import Flight from "./Flight";
import FlightsTable from "./FlightsTable";
import { getFlights } from "../../services/flight-service";
import moment from "moment";

export default class FlightsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
    };
    this.child = React.createRef();
  }

  componentDidMount() {
    this.loadFlights();
  }

  loadFlights = () => {
    getFlights()
      .then((resp) => {
        this.setState({
          flights: resp.data,
        });
      })
      .catch((e) => console.log(e));
  };

  handleEditFlight = (flight) => (e) => {
    this.child.current.setState({
      edit: true,
      ...flight,
      departureDate: moment(flight.departureDate).toDate(),
      arrivalDate: moment(flight.arrivalDate).toDate(),
    });
  };

  render() {
    const { role } = this.props;
    const isAdminOrWorker = role === 0 || role === 1;
    return (
      <>
        {isAdminOrWorker && (
          <Flight ref={this.child} refreshTable={this.loadFlights} />
        )}
        <FlightsTable
          role={role}
          flights={this.state.flights}
          handleEditFlight={this.handleEditFlight}
        />
      </>
    );
  }
}
