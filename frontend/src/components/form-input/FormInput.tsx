
import { InputHTMLAttributes } from 'react';
import './formInput.style.css'
import { FaCheckCircle } from 'react-icons/fa';

// FaExclamationCircle
// type OnErrorChange = (err: string) => unknown;
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    content: string,
    label?: boolean,
    // onErrorChange?: OnErrorChange
}

const FormInput: React.FC<IProps> = ({ content, label, name, type, ...args }) => { 

    
    return (
        <div className='input-con'>
            <input id={name} name={name} type={type} {...args} />
            <div className='status'>
            <FaCheckCircle />
                {/* { error ? (<FaCheckCircle />) : (<FaExclamationCircle />) } */}
            </div>
            {label ? (<label htmlFor={name}>{content}</label>) : ''}
            
        </div>
    )
}


export default FormInput;