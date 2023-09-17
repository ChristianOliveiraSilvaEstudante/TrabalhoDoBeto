import AuthLayout from "../../layouts/auth";
import Card from "../../components/card";

function Page() {
  return (
    <AuthLayout>
      <Card>
        <h1>Sign Up</h1>

        <input placeholder="teste" />
        <input placeholder="teste" />

        <button>Logar</button>
      </Card>
    </AuthLayout>
  );
}
  
export default Page;