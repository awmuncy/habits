import jwt_decode from 'jwt-decode';

export default () => {

  let localToken = localStorage.getItem('mySecretToken') || null;
  if (localToken === null && window.location.pathname !== '/login') {
    window.location.assign('/login');
  }
  localStorage.setItem('user', 'Guest');
  if (localToken) {

    let detokenizedUser = jwt_decode(localToken);
    localStorage.setItem('user', detokenizedUser.name);
    localStorage.setItem('id', detokenizedUser.id);
  }

  return !(localToken === null && window.location.pathname !== '/login');

};
