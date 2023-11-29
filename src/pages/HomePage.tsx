import React from 'react';
import {getAuth, signOut} from 'firebase/auth';
import Noticias from './Noticias';
export interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = (props) => {
    const auth = getAuth();
    return(
        <div>
            <p>Home Page</p>
            <Noticias />
            <button onClick={() => signOut(auth)}>
                Sign Out
            </button>
        </div>
    );
}

export default HomePage;