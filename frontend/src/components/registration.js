import React, {useState} from 'react';

const registrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password:'',
    });
    const change = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value,
        });
    };
    const submit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <label>Username<input type="text" name="username" 
                value={formData.username} onChange={change} placeholder="Enter your Username here!"></input></label>
                <br />
                <label>Email<input type="email" name="email" 
                value={formData.email} onChange={change} placeholder="Enter your email here!"></input></label>
                <br />
                <label>Password <input type="password" name="password" 
                value={formData.password} onChange={change} placeholder="Enter your password here!"></input></label>
            </form>
        </div>
    )
}