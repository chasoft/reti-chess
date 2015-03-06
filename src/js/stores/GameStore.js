'use strict';

const AppDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('eventemitter2').EventEmitter2; 
const GameConstants = require('../constants/GameConstants');
const Immutable = require('immutable');
const {List, Map, Set} = Immutable;
const CHANGE_EVENT = 'change';
  
var _gameOver = Map({
  status: false,
  type: null,
  winner: null
});
var _moves = List();

var GameStore = Object.assign({}, EventEmitter.prototype, {
  getState() {
    return {
      gameOver: _gameOver,
      moves: _moves
    };
  }
});

function rematch() {
  _gameOver = _gameOver
    .set('status', false)
    .set('winner', null)
    .set('type', null);
}

function gameOver(options) {
  _gameOver = _gameOver
    .set('status', true)
    .set('winner', options.winner)
    .set('type', options.type);
}

AppDispatcher.register(payload => {
  var action = payload.action;

  switch (action.actionType) {

    case GameConstants.REMATCH:
      rematch();
      break;

    case GameConstants.GAME_OVER:
      gameOver(action.options);
      break;

    default:
      return true;
  }

  GameStore.emit(CHANGE_EVENT);
  return true;
});

module.exports = GameStore;