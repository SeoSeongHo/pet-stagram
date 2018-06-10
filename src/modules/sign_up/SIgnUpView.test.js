import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SIgnUpView from './SIgnUpView'
//import { MainPageActions } from './loginState'

describe('signUpView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SIgnUpView />);
    expect(wrapper.length).toBe(1);
  });
});