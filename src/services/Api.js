import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://shubham-ss-api.herokuapp.com/api`
  })
}
