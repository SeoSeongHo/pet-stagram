import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MainPageView from './mainPageView'
//import { MainPageActions } from './loginState'

describe('MainPageView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MainPageView />);
    expect(wrapper.length).toBe(1);
  });
});