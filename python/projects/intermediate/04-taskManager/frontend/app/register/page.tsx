import RegisterForm from "../../components/RegisterForm";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <RegisterForm />
      </main>
    </>
  );
}
