import FormInput from '../../../components/form-input/FormInput';
import './Login.css';
import { useState, Fragment } from 'react';



const Login = () => {

    const [credentials, setCredentials] = useState({ username: "", password: "", confirmPassword: "", email: ""});
    const inputFields = [

        {
            name: "email", 
            type: "text",
            placeholder: "Email",
            label: "Email"
        },
        {
            name: "password", 
            type: "password",
            placeholder: "Password",
            label: "Password"
        },

    ]
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>, cred: string) => {
        const credType = cred as "username" | "password" | "confirmPassword" | "email";
        const newCreds = {...credentials};
        newCreds[credType] = e.target.value;
        setCredentials(newCreds);
    }

    return (
        <div>
            <div className="container">
                <div className="header">Welcome!</div>

                <div className="content">
                    {inputFields.map((item, i) => (
                        <Fragment key={i}>
                            <FormInput 
                                label
                                content={item.label} 
                                autoComplete={item.type == 'password' ? 'new-password' : 'off'}
                                type={item.type}
                                placeholder={item.placeholder}
                                name={item.name}
                                onChange={(e) => handleDataChange(e, item.name)}
                            />
                        </Fragment>

                    ))}

                    <button className="login-button">
                        Log In
                    </button>

                    <div className="login-con">
                        <p className="owns-account">Don't have an account?</p>
                        <p className="redirect-auth-link" onClick={() => window.location.replace("/auth/register")}>
                            Register
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;