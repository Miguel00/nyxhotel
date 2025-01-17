export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  console.log("auth-header.js")
  if (user && user.token) {
    // console.log(user.token)
    return { Authorization: 'Bearer ' + user.token,  }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
