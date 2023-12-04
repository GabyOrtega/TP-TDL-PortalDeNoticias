import React from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface ILoginPageProps {}

const LoginPage: React.FC<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = React.useState(false);

    const signInWithGoogle = async () => {
        setAuthing(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(response =>{
            console.log(response.user.uid);
            navigate('/');
        })
        .catch( (error) => {
            console.log(error);
            setAuthing(false);
        })
        navigate('/');
    }
    return(
        <div>
            <p>Login Page</p>
            <button onClick={() => signInWithGoogle()} disabled={authing}>
                Sign In With Google
            </button>
        </div>
    );
};

export default LoginPage;