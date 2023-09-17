import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { isUserLoggedIn } from '../../utils';
import './style.css'

function MainLayout({children}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn()) {
            navigate('/login');
        }
    }, [])

    return (
        <main className='main-container'>
            {children}
        </main>
    );
}
  
export default MainLayout;