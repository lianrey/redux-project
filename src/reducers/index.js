import { combineReducers } from 'redux';
import { GET_POSTS, GET_CATEGORIES, GET_SELECTIONS, ADD_POST, DELETE_POST } from '../actions';

function posts(state = [], action) {
  const { posts } = action

  switch(action.type) {
    case GET_POSTS:
      return posts;
    case ADD_POST:
      return[
        ... state,
        posts
      ]
    case DELETE_POST:
      var currentPosts = state.filter(p => { return p.id !== posts});
      return currentPosts;
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

const initSelection = {
  category: null,
  sortType: null
}

function selection(state = initSelection, action) {
  const { category, sortType } = action

  switch(action.type) {
    case GET_SELECTIONS:
      return {...state, category, sortType };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories,
  selection
})
