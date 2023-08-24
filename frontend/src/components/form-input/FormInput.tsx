
import { InputHTMLAttributes } from 'react';
import './formInput.style.css'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    content: string,
    label?: boolean,
}

const FormInput: React.FC<IProps> = ({ content, label, name, type, ...args }) => { 

    return (
        <div className='input-con'>
            <input id={name} name={name} type={type} {...args} />
            {label ? (<label htmlFor={name}>{content}</label>) : ''}
        </div>
    )
}


export default FormInput;