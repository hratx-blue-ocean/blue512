import { shallow } from "enzyme";
import App from "../App";
import React from "react";
import NavBar from "../components/Navbar";

describe("Top level App component", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  test("it renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  test("it has a single NavBar child", () => {
    expect(wrapper.find(NavBar)).toHaveLength(1);
  });
  test("it has the correct state shape", () => {
    expect(wrapper.state().eventsPlaceHolder).toBeInstanceOf(Object);
  });
});
