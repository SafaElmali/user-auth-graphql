import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../graphql/mutations';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AutContext';

const Signup = () => {
    const authContext = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const [saveUser] = useMutation(SIGN_UP, {
        onError: (error) => {
            console.log(error)
        },
        onCompleted: (data) => {
            setName('');
            setEmail('');
            setPassword('');
            console.log(data);
            console.log("Redirecting to login page");
            authContext.setAuthState((data.createUser));
            setTimeout(() => {
                setRedirectToDashboard(true);
            }, 1500)
        }
    })
    const handleSignup = (event) => {
        event.preventDefault();

        saveUser({ variables: { name, email, password } })
    }

    return (
        <>
            {redirectToDashboard && <Redirect to="/dashboard" />}
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="name" value={name} onChange={({ target }) => setName(target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="email" value={email} onChange={({ target }) => setEmail(target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>Signup</button>
            </form>
        </>
    )
}

export default Signup;