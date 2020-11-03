import axios from 'axios';

export default axios.create({
  // baseURL: window.location.href,
  baseURL: 'http://159.69.76.159:3000',
  headers : {
      'Authorization' : 'Basic QXp1cmXEaWFtb45kOmh1bnRlcjO='
  }
});