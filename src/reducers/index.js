import { combineReducers } from 'redux';
import { GET_POSTS, GET_CATEGORIES } from '../actions';
import * as ReadableAPI from '../ReadableAPI';

function posts(state = [], action) {
  const { posts } = action

  switch(action.type) {
    case GET_POSTS:
      return posts;
    default:
      return state;
  }
}

function categories(state = [], action) {
  const { categories } = action

  switch(action.type) {
    case GET_CATEGORIES:
      return categories.categories;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories
})
