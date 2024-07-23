import axios from 'axios';

const API_URL = 'https://a7a4-2806-10be-8-2ebf-a118-39d-5ce4-b5d8.ngrok-free.app/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'users/login', {
        email: user.username,
        password: user.password
      })
      .then(response => {
        console.log(response.data.token)
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  // createReservation(user) {
  //   // console.log("auth.service:1", user)
  //   return axios.post(API_URL + 'reservations', user).then(res => {
  //     console.log("res auth.service: ", res)
  //   });
  // }
}

export default new AuthService();
