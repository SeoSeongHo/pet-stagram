import React from 'react';
import { shallow, mount, render } from 'enzyme';
//import renderer from 'react-test-renderer';
import LoginView from './loginView'
import { LoginActions } from './loginState'


describe('LoginView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LoginView />);
    expect(wrapper.length).toBe(1);
  });

  // check LoginView has 2 inputs : username and password
  it('has 2 inputs', () => {
    const wrapper = mount(<LoginView />);
    expect(wrapper.find('input').length).toBe(2);
  });

  // check username change
  it('username should be changed', () => {
    const wrapper = mount(<LoginView />);
    const mockedEvent = { target: { value: 'username@test.com' } };
    wrapper.find('input').at(0).simulate('change', mockedEvent);
    expect(wrapper.state().username).toBe('username@test.com');
  });

  // check password change
  it('password should be changed', () => {
    const wrapper = mount(<LoginView />);
    const mockedEvent = { target: { value: 'password123' } };
    wrapper.find('input').at(1).simulate('change', mockedEvent);
    expect(wrapper.state().password).toBe('password123');
  });

  // sign in pressed
  describe('LoginView, sign in pressed', () => {
    it('onLoginPressed called', () => {
      const wrapper = mount(<LoginView />);
      const instance = wrapper.instance();
      jest.spyOn(instance, 'onLoginPressed');
      wrapper.find('button').at(0).simulate('click');

      expect(instance.onLoginPressed).toBeCalledWith();
    });
    it('sign in without username and error', () => {
      const wrapper = mount(<LoginView />);
      const instance = wrapper.instance();
      jest.spyOn(instance, 'renderLoginError');
      wrapper.find('button').at(0).simulate('click');
      
      expect(instance.renderLoginError).toBeCalledWith('enter_your_login_ID');
    });
    it('sign in without password and error', () => {
      const wrapper = mount(<LoginView />);
      const instance = wrapper.instance();
      jest.spyOn(instance, 'renderLoginError');
      const mockedUsernameEvent = { target: { value: 'username@test.com' } };
      wrapper.find('input').at(0).simulate('change', mockedUsernameEvent);
      wrapper.find('button').at(0).simulate('click');
      
      expect(instance.renderLoginError).toBeCalledWith('enter_your_password');
    });
    /*
    it('onLoginRequest called', () => {
      const wrapper = mount(<LoginView />);
      const instance = wrapper.instance();
      jest.spyOn(instance, 'onLoginRequest');
      const mockedUsernameEvent = { target: { value: 'username@test.com' } };
      const mockedPasswordEvent = { target: { value: 'password123' } };
      wrapper.find('input').at(0).simulate('change', mockedUsernameEvent);
      wrapper.find('input').at(1).simulate('change', mockedPasswordEvent);
      wrapper.find('button').at(0).simulate('click');

      expect(instance.onLoginRequest).toBeCalledWith('username@test.com','password123');
    });
    */
  });  
});