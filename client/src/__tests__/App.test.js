import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import React from "react";
import NavBar from "../components/Navbar";

Enzyme.configure({ adapter: new Adapter() });

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
    expect(wrapper.state().eventsPlaceHolder).toBeTruthy();
  });
});
