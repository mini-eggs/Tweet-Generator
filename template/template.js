import Fs from 'fs'
import Path from 'path'

import {
  Complete,
  Failure,
  ApplicationDirectory
} from '../../shared/'

export default (req, res) => {
  const path = Path.join(ApplicationDirectory ,'twitterBot', 'template')
  res.sendFile(path + '/index.html')
}