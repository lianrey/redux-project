import { combineReducers } from 'redux';
import { GET_POSTS } from '../actions';
import * as ReadableAPI from '../ReadableAPI';

function posts(state = {}, action) {
  const { posts } = action

  switch(action.type) {
    case GET_POSTS :
      return {
        ...state,
        posts
      }
    default:
      return state;
  }
}

export default combineReducers({
  posts
})
