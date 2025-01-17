import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PartList from "./components/PartList";
import Bikes from "./views/Bikes";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Menu,
} from "@mui/material";
import BikeConfigurator from "./views/BikeConfigurator";
import Cart from "./views/Cart";

function App() {
  const [menuTypesOpened, setMenuTypesOpened] = useState(false);

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bicycle Shop
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/bikes">
              Bikes
            </Button>
            <Menu open={menuTypesOpened}></Menu>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <main>
            <Routes>
              <Route path="/" element={<Bikes />} />
              <Route path="/bikes" element={<BikeConfigurator />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </Container>
      </div>
    </Router>
  );
}

export default App;
