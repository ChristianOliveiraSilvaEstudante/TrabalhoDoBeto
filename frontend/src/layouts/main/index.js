import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { isUserLoggedIn } from '../../utils';
import './style.css'

function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn()) {
            navigate('/login');
        }
    }, [])

    return (
        <main></main>
    );
}
  
export default MainLayout;