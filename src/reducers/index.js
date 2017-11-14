import { combineReducers } from 'redux';
import { GET_POSTS } from '../actions';
import * as ReadableAPI from '../ReadableAPI';

function posts(state = {}, action) {
  const { posts } = action

  switch(action.type) {
    case GET_POSTS :
      return posts;
    default:
      return state;
  }
}

function categories(state = {}, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories
})
