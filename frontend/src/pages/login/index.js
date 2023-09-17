import AuthLayout from "../../layouts/auth";
import Card from "../../components/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const onSubmit = () => {
    axios.post('http://localhost:3001/auth/login', {
      email,
      password,
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        navigate('/list')
      })
      .catch((error) => {
        console.error('Erro ao logar', error);
        alert('Erro ao logar');
      });
  }

  return (
    <AuthLayout>
      <Card>
        <h1>Login</h1>

        <section>
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <p>Não possui uma conta? <Link to='/signup'>Cadastro</Link></p>

          <button onClick={onSubmit}>Logar</button>
        </section>
      </Card>
    </AuthLayout>
  );
}
  
export default Page;