
import FormInput from '../../../components/form-input/FormInput';
import './Register.css';
import { useState, Fragment, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha"



const Register = () => {

    const [credentials, setCredentials] = useState({ username: "", password: "", confirmPassword: "", email: ""});
    const captchaRef = useRef<ReCAPTCHA>(null);

    const inputFields = [
        {
            name: "username", 
            type: "text",
            placeholder: "Username",
            label: "Username"
        },
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

        {
            name: "confirmPassword", 
            type: "password",
            placeholder: "Confirm Password",
            label: "Confirm Password"
        },
    ]
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>, cred: string) => {
        const credType = cred as "username" | "password" | "confirmPassword" | "email";
        const newCreds = {...credentials};
        newCreds[credType] = e.target.value;
        setCredentials(newCreds);
    }

    const handleRegisterButton = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const token = captchaRef.current?.getValue();
        console.log(token);
        captchaRef.current?.reset();

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

                    <div className="recaptcha">
                        <ReCAPTCHA ref={captchaRef} className='recaptcha' sitekey="6LcnhdYnAAAAAKtDeZdiwtrw4wkj_aU6IWTsroQp" />
                    </div>
                    <button onClick={handleRegisterButton} className="register-button">
                        Join Us
                    </button>


                    <div className="login-con">
                        <p className="owns-account">Already have an account?</p>
                        <p className="redirect-auth-link" onClick={() => window.location.replace("/auth/login")}>
                            Sign In
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register;