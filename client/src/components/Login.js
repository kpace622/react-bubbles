import React, {useState} from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState('Lambda School');
  const [password, setPassword] = useState('i<3Lambd4');

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', {username, password})
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        history.push('/bubble-page')
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.error('invalid', err)
      })
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
