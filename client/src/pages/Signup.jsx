import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import Cart from "../components/Cart";

function Signup(props) {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const [inputFocus, setInputFocus] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: { ...formState },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-container">
      <Link to="/login" className="back-link">← Go to Login</Link>

      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <div className="form-group-z">
          <label htmlFor="firstName" className="label-z">First Name:</label>
          <input
            className={`input-z ${inputFocus ? 'focused' : ''}`}
            placeholder="First Name"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        </div>
        <div className="form-group-z">
          <label htmlFor="lastName" className="label-z">Last Name:</label>
          <input
            className={`input-z ${inputFocus ? 'focused' : ''}`}
            placeholder="Last Name"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        </div>
        <div className="form-group-z">
          <label htmlFor="email" className="label-z">Email:</label>
          <input
            className={`input-z ${inputFocus ? 'focused' : ''}`}
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        </div>
        <div className="form-group-z">
          <label htmlFor="password" className="label-z">Password:</label>
          <input
            className={`input-z ${inputFocus ? 'focused' : ''}`}
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        </div>
        <div className="form-group-z">
          <button type="submit" className="submit-button-z">Submit</button>
        </div>
      </form>
      <Cart />
    </div>
  );
}

export default Signup;