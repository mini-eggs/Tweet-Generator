
import Twitter from 'twitter'
import TwitterCredentials from '../../../../keys/twitter';

const client = new Twitter(TwitterCredentials);
  
const defaultParams = { 
  count: 200,
  exclude_replies: true,
  contributor_details: false,
  include_rts: false,
  trim_user: true
}

const getSingleTweetList = (client, props, last) => {

  const params = props
  if(last) {
    params.max_id = last
  }

  return new Promise((resolve, reject) => {

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

      if (error) {
        reject(error)
      }

      else {
        const data = {
          tweets: tweets.map(tweet => tweet.text)
        }
        if(tweets[tweets.length - 1]) {
          data.last = tweets[tweets.length - 1].id
        }
        resolve(data)
      }

    })
  })
}

export default (props) => {

  const params = Object.assign({}, defaultParams, props)

  let tweets = []
  let moreTweets = true
  let last = null

  return new Promise( async (resolve, reject) => {

    while(moreTweets) {

      try {
        const tweetData = await getSingleTweetList(client, params, last)
        if(tweetData.last) {
          tweets = tweets.concat(tweetData.tweets)
          last = tweetData.last
        }
        else {
          moreTweets = false
          resolve(tweets)
        }
      }

      catch(err) {
        moreTweets = false
        resolve(tweets)
      }

    }
  })
}
