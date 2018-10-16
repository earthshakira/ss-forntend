import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://shubham-ss-api.herokuapp.com/api`
  })
}
