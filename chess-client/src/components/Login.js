import React, { Component } from 'react'
import { InputGroup, InputGroupText, InputGroupAddon,Col,Row,Container, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import {clearError,authenticate} from '../actions/'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => {
      dispatch(clearError())
    },
    authenticate: (nickname,password) => {
      dispatch(authenticate(nickname,password))
    },
  }
}

class Login extends Component {
  state = {
    nickname: '',
    password: '',
  }

  static propTypes = {
    authenticate:PropTypes.func,
    clearError:PropTypes.func,
  }

  onNicknameChanged = e => {
    const {props:{clearError}} = this
    clearError()
    this.setState({ nickname: e.target.value })
  }

  onPasswordChanged = e => {
    const {props:{clearError}} = this
    clearError()
    this.setState({ password: e.target.value })
  }

  onLoginSubmitted = e => {
    e.preventDefault()
    const {props:{authenticate}} = this
    clearError()
    const { nickname, password } = this.state
    authenticate(nickname, password)
  }

  render() {

    return  <Container className="mainContainer login__container">
      <Row>
    <Col xs="12" md="3">
        <form onSubmit={this.onLoginSubmitted}>
          <Row className="mb-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Nickname</InputGroupText>
            </InputGroupAddon>
            <Input autoFocus placeholder="nickname"  onChange={this.onNicknameChanged} />
          </InputGroup>
          </Row>
          <Row className="mb-2">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Password</InputGroupText>
              </InputGroupAddon>
              <Input  type="password"  placeholder="password"  onChange={this.onPasswordChanged} />
            </InputGroup>
          </Row>
          <Row>
          <button type="submit">Login</button>
          </Row>
        </form>
    </Col>
      </Row>
      </Container>

  }
}

export default connect(null,mapDispatchToProps)(Login)