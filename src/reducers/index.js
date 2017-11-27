import { combineReducers } from 'redux';
import { GET_POSTS, GET_CATEGORIES, GET_SELECTIONS, ADD_POST, DELETE_POST, UPDATE_VOTES } from '../actions';

function posts(state = [], action) {
  const { posts, id, voteType } = action

  switch(action.type) {
    case GET_POSTS:
      return posts;
    case ADD_POST:
      return[
        ...state,
        posts
      ];
    case DELETE_POST:
      var currentPosts = state.filter(p => { return p.id !== posts});
      return currentPosts;
    case UPDATE_VOTES:
      var currentPostsV = state.filter(p => {
        if(p.id === id){
          if(!p.voteScore) p.voteScore = 0;
          if(voteType === 'upVote')
            p.voteScore++
          else
            p.voteScore--;
        }
        return p;
      });
      return currentPostsV;
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
