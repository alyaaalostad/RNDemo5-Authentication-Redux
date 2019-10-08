import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";
import { login, logout, signup, checkForExpiredToken } from "../redux/actions";
// Actions
// import { login } from "./redux/actions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = keyValue => {
    this.setState(keyValue);
  };
  componentDidMount = () => {
    this.props.checkForToken();
  };
  handleSubmit = () => {
    alert("Check my code the states are empty");
  };
  handlelogin = () => {
    this.props.login(this.state);
  };

  handlelogout = () => {
    this.props.logout();
  };
  handleSignup = () => {
    this.props.signup(this.state);
  };

  render() {
    const { username, password } = this.state;
    console.log(this.state);
    if (this.state.user) {
      return (
        <Container>
          <Header />
          <Content>
            <Button onPress={this.handlelogout}>
              <Text>Logout {this.state.user.username}</Text>
            </Button>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header />
          <Content>
            <Form>
              <Item>
                <Input
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChangeText={username =>
                    this.handleChange({ username: username })
                  }
                />
              </Item>
              <Item last>
                <Input
                  value={password}
                  placeholder="Password"
                  secureTextEntry
                  name="password"
                  onChangeText={password =>
                    this.handleChange({ password: password })
                  }
                />
              </Item>
              <Button onPress={this.handlelogin}>
                <Text>Login</Text>
              </Button>
              <Button onPress={this.handleSignup}>
                <Text>Sign Up</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => {
  return {
    login: userData => dispatch(login(userData)),
    logout: () => dispatch(logout()),
    signup: userData => dispatch(signup(userData)),
    checkForToken: navigation => dispatch(checkForExpiredToken(navigation))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
