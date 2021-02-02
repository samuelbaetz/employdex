import axios from 'axios'

export default {
    getPeople: function(){
      return axios.get('https://randomuser.me/api/?results=50&seed=heybaby')
    }
}