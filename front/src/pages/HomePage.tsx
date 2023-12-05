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
<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1rem" }}>

<div style={{ backgroundColor: '#E6E6FA', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', width: '100%' }}>
    <p style={{ fontSize: "36px", fontWeight: "bold", color: '#800080', margin: 0 }}>Noticias</p>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <Button style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2', marginRight: '1rem' }} onClick={toggleMostrarNoticiasGuardadas}>
        <span role="img" aria-label="Mis Noticias">📰</span>
    </Button>

    <Button style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }} onClick={() => signOut(auth)}>
        <span role="img" aria-label="Cerrar Sesión">🚪</span>
    </Button>
</div>
<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        {/* Noticias más pequeñas y en dos columnas */}
        <div style={{ marginBottom: '1rem', width:'100%'}}>
        {mostrarNoticiasGuardadas ? <NoticiasGuardadas /> : <Noticias />}
        </div>
    </div>

</div>

    );
};

export default HomePage;