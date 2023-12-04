import React, { useEffect, useState } from 'react';
import {getAuth, signOut} from 'firebase/auth';
import Noticias from './Noticias';
import NoticiasGuardadas from './NoticiasGuardadas';
import { Button } from 'react-bootstrap';
import e from 'express';
export interface IHomePageProps {}



const HomePage: React.FC<IHomePageProps> = (props) => {
    const auth = getAuth();
    const [mostrarNoticiasGuardadas, setMostrarNoticiasGuardadas] = useState(false);

    const toggleMostrarNoticiasGuardadas = () => {
        setMostrarNoticiasGuardadas((prevMostrarNoticiasGuardadas) => !prevMostrarNoticiasGuardadas);
    };

    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <p style={{fontSize:"30px", fontWeight:"bold"}}>{mostrarNoticiasGuardadas ? 'Noticias Guardadas' : 'Noticias'}</p>
            <Button onClick={toggleMostrarNoticiasGuardadas}>
                {mostrarNoticiasGuardadas ? 'Ocultar noticias guardadas' : 'Mis noticias guardadas'}
            </Button>
            {mostrarNoticiasGuardadas ? <NoticiasGuardadas /> : <Noticias />}
            <button onClick={() => signOut(auth)}>
                Sign Out
            </button>
        </div>
    );
};

export default HomePage;