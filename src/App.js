import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleadduser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    
    // post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then (res => res.json())
    .then(data => {
      // console.log(data);

      const newusers = [...users, data];
      setUsers(newusers);
    })

  }

  return (
    <div className="App">
      <h1>This is my won data : {users.length}</h1>
      <form onSubmit={handleadduser}>
        <input type="text" name='name' placeholder='Name' />
        <input type="email" name='email' placeholder='Email' />
        <input type="submit" value="Add Users" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> Id: {user.id} Name: {user.name} email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
