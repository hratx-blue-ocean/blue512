import { shallow } from "enzyme";
import React from "react";
import NavBar from "../components/Navbar";

describe("Top level App component", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<NavBar />);
  });
  test("it renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
});
