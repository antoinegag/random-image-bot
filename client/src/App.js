import React from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container className="pt-2">
        <Route exact path="/" component={Home} />
        <Route path="/edit/:id" component={Edit} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
