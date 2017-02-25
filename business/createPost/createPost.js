// @flow

import GetPostList from './getPostList'
import GetMarkovChain from './getMarkovChain'

export default (socket: Object) => {
  socket.on('twitterBot/createPost', async (props: Object) => {
    if(!props.screen_name) {
      socket.emit('twitterBot/createPost/error', {
        message: 'No screen_name parameter present'
      });
    }
    else {
      try {
        const tweets = await GetPostList(props)
        const sentence = await GetMarkovChain(tweets)
        socket.emit('twitterBot/createPost/complete',{
          sentence: sentence
        });
      }
      catch(error) {
        socket.emit('twitterBot/createPost/error', error);
      }
    }
  });
};
