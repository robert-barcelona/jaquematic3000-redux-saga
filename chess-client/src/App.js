import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Register from './components/Register'
import Main from './components/Main'
import Login from './components/Login'
import Games from './components/Games'
import socketIOClient from 'socket.io-client';
import * as log from 'loglevel'

import logic from "./logic"
import NavBar from "./components/NavBar"
import Invite from "./components/Invite"
import {UncontrolledAlert} from 'reactstrap'
import {connect} from 'react-redux';

import {
  getCurrentGames,
  respondToGameRequest,
  getUsersForString,
  clearError,
  onError,
  acknowledgeGameOver,
  requestGame,
  authenticate,
  logout,
  gameMove,
} from './actions'

import NotificationSystem from 'react-notification-system';

class App extends Component {

  // socket = null

  _notificationSystem = null

  _notificationStyle = {
    NotificationItem: { // Override the notification item
      DefaultStyle: {
        borderRadius: '3px',
        fontSize: '15px',
      },
      info: {
        color: '#ff002d',
        background: 'rgba(60,60,65,0.7',
        borderTop: '3px solid #a5a5a5',
        WebkitBoxShadow: '1px 1px 1px 1px rgba(30,30,30,0.9)',
        MozBoxShadow: '1px 1px 1px 1px rgba(30,30,30,0.9)',
        boxShadow: '1px 1px 1px 1px rgba(30,30,30,0.9)',
      }
    }
  }

  onAddNotification = message => {
    this._notificationSystem.addNotification({
      message,
      autoDismiss: 10,
      level: 'info'
    });
  }

  // needToUpdateGamesFlagFromSocketIO = false

  constructor(props) {
    let nickname, token

    super(props)
    log.setLevel('silent')
    this.set = {}
    if (sessionStorage.getItem('nickname')) // we are returning from a page refresh
    {
      nickname = sessionStorage.getItem('nickname')
      token = sessionStorage.getItem('token')
     // if (!this.socket) this.setupSocketListeners(nickname, token)  // add socket listeners again
    }
  }

  clearError = () => this.props.dispatch(clearError())

  onError = e => this.props.dispatch(onError(e))

  onAcknowledgeGameOver = (nickname, gameID) => {
    log.debug(`APP.JS: onAcknowledgeGameOver: NICKNAME: ${nickname}, GAMEID: ${gameID}, THIS.PROPS.NICKNAME: ${this.props.nickname}`)
    const {props: {dispatch, token}} = this
    this.clearError()
    dispatch(acknowledgeGameOver(nickname, gameID, token))
  }

  componentDidMount() {
    log.debug(`in app.js, props =`)
    log.debug(this.props)
    const {props: {nickname, token, dispatch}} = this
    this.clearError()
    if (this.isLoggedIn()) this.getCurrentGamesForUser(nickname, token)
    this._notificationSystem = this.refs.notificationSystem;
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    sessionStorage.setItem('currentGames', JSON.stringify(this.props.currentGames))
    sessionStorage.setItem('nickname', JSON.stringify(this.props.currenicknamentGames))
    sessionStorage.setItem('token', JSON.stringify(this.props.token))
    sessionStorage.setItem('users', JSON.stringify(this.props.users))
  }

  getCurrentGamesForUser = (nickname, token) => {
    log.debug(`APP.JS: getCurrentGamesForUser: NICKNAME: ${nickname}, ,  THIS.PROPS.NICKNAME: ${this.props.nickname}`)
    this.props.dispatch(getCurrentGames(nickname, token))
  }

  getUsersForString = (str, token) => {
    log.debug(`APP.JS: getUsersForString: STR: ${str},  ,  THIS.PROPS.NICKNAME: ${this.props.nickname}`)
    const {props: {dispatch, nickname}} = this
    dispatch(getUsersForString(nickname, str, token))
  }

  onRespondToGameRequest = (destination, gameID, answer) => {
    log.debug(`APP.JS: onRespondToGameRequest: DESTINATION: ${destination}, GAMEID: ${gameID}, ANSWER: ${answer}, THIS.PROPS.NICKNAME: ${this.props.nickname}`)

    const {props: {nickname, token, dispatch}} = this
    this.clearError()
    dispatch(respondToGameRequest(nickname, destination, gameID, answer, token))
  }

  onRequestGame = (destination) => {
    log.debug(`APP.JS: onRequestGame: DESTINATION: ${destination},  THIS.PROPS.NICKNAME: ${this.props.nickname}`)
    const {props: {dispatch, nickname, token}} = this
    this.clearError()
    dispatch(requestGame(nickname, destination, token))
  }


  onGameMove = (move, gameID) => {
    log.debug(`APP.JS: onGameMove: move: ${JSON.stringify(move)},  GAMEID: ${gameID}, ,  THIS.PROPS.NICKNAME: ${this.props.nickname}`)

    const {props: {nickname, dispatch, token}} = this
    this.clearError()
    dispatch(gameMove(nickname,move,gameID,token))
  }

  onInviteUser = user => {
    log.debug(`APP.JS: onInviteUser: USER: ${user}, THIS.PROPS.NICKNAME: ${this.props.nickname}`)

    const {props: {nickname, dispatch,token}} = this
    this.clearError()
    dispatch(requestGame(nickname,user,token))
  }


  isLoggedIn() {
    return !!this.props.nickname
  }

  onLogout = () => {
    log.debug(`APP.JS: onLogout:`)

    const {props:{dispatch}} = this
    dispatch(logout())
    // this.setState({nickname: '', token: '', users: [], currentGames: []})
    sessionStorage.clear()
    //if (this.socket) this.socket.close()
  }

  render() {
    const {nickname, users, error, token} = this.props
    const {currentGames} = this.props
    log.debug(`APP.JS: render: NICKNAME: ${nickname},`)

    return <div className="app__main">
      <NotificationSystem ref="notificationSystem" style={this._notificationStyle}/>

      <header>
        <NavBar nickname={nickname} isLoggedIn={this.isLoggedIn()} onLogout={this.onLogout}/>
      </header>
      {error &&
      <UncontrolledAlert className="app__mainAlert" color="dark"><i className="fas fa-lg fa-angry"></i>&nbsp; {error}
      </UncontrolledAlert>}
      <main>
        <Switch>
          <Route exact path="/" render={() => <Main/>}/>
          <Route path="/main" render={() => <Main/>}/>
          <Route path="/register" render={() => this.isLoggedIn() ? <Redirect to="/main"/> : <Register
            onError={this.onError}
            clearError={this.clearError}

          />}/>

          <Route path="/games" render={() => this.isLoggedIn() ?
            <Games
              onError={this.onError}
              clearError={this.clearError}
              onAcknowledgeGameOver={this.onAcknowledgeGameOver}
              onGameMove={this.onGameMove}
              currentGames={currentGames}
              onRespondToGameRequest={this.onRespondToGameRequest}
              nickname={nickname}
            /> : <Redirect to="/main"/>}/>
          <Route path="/invite" render={() => this.isLoggedIn() ?
            <Invite

              onUserClick={this.onInviteUser}
              currentGames={currentGames}
              allUsers={users}
              nickname={nickname}
              onUserSearchByString={term => this.getUsersForString(term, token)}
            /> : <Redirect to="/main"/>}/>
          <Route path="/login" render={() => this.isLoggedIn() ? <Redirect to="/main"/> :
            <Login
              authenticate={authenticate}
            />}/>
        </Switch>
      </main>
      <footer>
      </footer>
    </div>
  }
}

export default withRouter(connect(state => state)(App));
