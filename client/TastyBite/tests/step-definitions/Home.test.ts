import React from "react";
import ReactDOM from "react-dom";
// import { render } from "@testing-library/react";
// indicamos que Home es un componente de React
import Home from "../../src/components/Home";
import { render, screen, userEvent } from '../utils/test-utils'


describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });
});