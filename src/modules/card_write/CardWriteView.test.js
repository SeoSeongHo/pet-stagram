import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CardWriteView from './CardWriteView'
//import { MainPageActions } from './loginState'

describe('CardWriteView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CardWriteView />);
    expect(wrapper.length).toBe(1);
  });
});