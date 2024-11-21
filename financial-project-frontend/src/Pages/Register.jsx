import Signup from '../Components/forms/SignupForm';
import NavBar from '../Components/NavBar';

export default function Register() {
    return (
        <>
            <NavBar/>
            <div className='flex flex-col items-center bg-slate-100 min-h-screen'>
                <div className='mt-20 flex flex-col'>
                    <Signup/>
                </div>
            </div>
        </>
    )
}