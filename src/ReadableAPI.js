const headers = {
  'Authorization': 'whatever-you-want'
}

function sortByVoteScore(a, b){
  return b.voteScore - a.voteScore;
}

function sortByTimeStamp(a, b){
  return b.timestamp - a.timestamp;
}

export const getAllPosts = (byCategory, sortType) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts`, { headers: headers } )
    .then(res => res.json())
    .then((posts) => {
      let postsArray;
      if(!byCategory) {
        postsArray = posts;
      }
      else{
        postsArray = posts.filter(p => p.category === byCategory);
      }
      if(!sortType){
        return postsArray.sort(sortByVoteScore);
      }
      else if(sortType === "voteScore"){
        return postsArray.sort(sortByVoteScore);
      }
      else{
        return postsArray.sort(sortByTimeStamp);
      }
    });

export const getAllCategories = () =>
  fetch(`${process.env.REACT_APP_BACKEND}/categories`, { headers: headers } )
    .then(res => res.json())
    .then((categories) => categories);
