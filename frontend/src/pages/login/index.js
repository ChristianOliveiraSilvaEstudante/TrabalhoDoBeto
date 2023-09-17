import AuthLayout from "../../layouts/auth";
import Card from "../../components/card";
import { useState } from "react";

function Page() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    
  }

  return (
    <AuthLayout>
      <Card>
        <h1>Login</h1>

        <section>
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={onSubmit}>Logar</button>
        </section>
      </Card>
    </AuthLayout>
  );
}
  
export default Page;