import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthRoute =
    router.pathname === "/" || router.pathname === "/register";
  const isProtectedRoute =
    ["/dashboard", "/cart", "/orders", "/profile"].includes(router.pathname) ||
    router.pathname.startsWith("/products/");

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token && isAuthRoute) {
      router.push("/dashboard");
    } else if (!token && isProtectedRoute) {
      router.push("/");
    }
    setIsLoading(false);
  }, [router, isAuthRoute, isProtectedRoute]);

  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && !isAuthRoute && <Navbar />}
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
