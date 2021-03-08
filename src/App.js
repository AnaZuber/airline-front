import React, { useState } from "react";
import Login from "./pages/auth-page/Login";
import Register from "./pages/auth-page/Register";
import Home from "./pages/home-page/Home";
import Info from "./pages/info-page/Info";
import Search from "./pages/search-flights-page/Search";
import { getRoleByName } from "./Role";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import LocationsTable from "./pages/add-location-page/LocationsTable";
import FlightsPage from "./pages/add-flight-page/FlightsPage";
import AirlinesTable from "./pages/add-airline-page/AirlinesTable";
import TicketsTable from "./pages/add-ticket-page/TicketsTable";
import ReservationTable from "./pages/add-ticket-page/ReservationTable";
import MyProfile from "./pages/auth-page/MyProfile";
import routes from "./RoutePaths";

const PrivateRoute = ({ path, Component, authenticated, role }) => {
  return !authenticated ? (
    <Redirect to="/login" />
  ) : (
    <Route exact path={path}>
      <Component role={role} />
    </Route>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("user") !== null
  );

  const [role, setRole] = useState(
    getRoleByName(JSON.parse(localStorage.getItem("user"))?.role)
  );

  const changeAuthStatus = (loggedIn) => {
    setLoggedIn(loggedIn);
    setRole(getRoleByName(JSON.parse(localStorage.getItem("user"))?.role));
  };

  return (
    <div>
      <BrowserRouter>
        <Header
          authenticated={loggedIn}
          setLoggedIn={changeAuthStatus}
          role={role}
        />
        <Switch>
          <Route exact path={routes.Login}>
            <Login authenticated={loggedIn} setLoggedIn={changeAuthStatus} />
          </Route>
          <Route exact path={routes.Register} component={Register} />
          <Layout>
            <PrivateRoute
              exact
              authenticated={loggedIn}
              path={routes.Home}
              Component={Home}
            />
            <PrivateRoute
              authenticated={loggedIn}
              path={routes.Locations}
              Component={LocationsTable}
            />
            <PrivateRoute
              authenticated={loggedIn}
              path={routes.Tickets}
              Component={TicketsTable}
            />
            <PrivateRoute
              authenticated={loggedIn}
              path={routes.Airlines}
              Component={AirlinesTable}
            />
            <PrivateRoute
              role={role}
              authenticated={loggedIn}
              path={routes.Flights}
              Component={FlightsPage}
            />
            <PrivateRoute
              role={role}
              authenticated={loggedIn}
              path={routes.Search}
              Component={Search}
            />
            <PrivateRoute
              authenticated={loggedIn}
              path={routes.Info}
              Component={Info}
            />
            <PrivateRoute
              authenticated={loggedIn}
              path={routes.Reservations}
              Component={ReservationTable}
            />
            <PrivateRoute
              authenticated={loggedIn}
              path={routes.EditProfile}
              Component={MyProfile}
            />
          </Layout>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
