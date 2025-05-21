import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <LoginForm />
      </main>
    </>
  );
}
