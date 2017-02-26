import MarkovChain from "markov-ultra"
import * as _ from 'lodash'
import Rimraf from 'rimraf'

export default (texts) => {
  const directory = __dirname + '/markovChain'
  let found = false
  return new Promise((resolve, reject) => {
    Rimraf(directory, () => {
      const markov = new MarkovChain(directory);
      _.shuffle(texts).forEach(text => {
        markov.learn(text)
      })
      while(!found) {
        const sentence = decodeURI(markov.generate())
        if(
          !(sentence.indexOf('http') > -1 || sentence.indexOf('://') > -1)
          &&
          !texts.includes(sentence)
        ) {
          found = true
          resolve(sentence)
        }
      }
    })
  })
}
