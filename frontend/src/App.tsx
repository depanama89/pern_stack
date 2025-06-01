// import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signup";
// import RootLayout from './components/layout/RootLayout'
import Dashbaord from "./pages/dashbaord";
import AccountPage from "./pages/accountPage";
import Settings from "./pages/settings";
import Transactions from "./pages/transactions";
import useStore from "./store";
// import type { User } from "./model/user";
// import { useState } from "react";
import { Toaster } from "sonner";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
// import Test  from "./pages/test"

const ProtectedRoot = () => {
  const { user } = useStore((state) => state);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[cal(h-screen-100px)]">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  // const [loggedInUser, setLoggedInUser] = useState<User | null>();
  const theme = useStore((state) => state.theme);
  console.log(theme);

  //  useEffect(() => {
  //   const root = document.documentElement;
  //   if (theme === 'dark') {
  //     root.classList.add('dark');
  //     root.style.colorScheme = 'dark';
  //   } else {
  //     root.classList.remove('dark');
  //     root.style.colorScheme = 'light';
  //   }
  // }, [theme]);
  useEffect(() => {
    if (theme == "dark") {
      console.log(theme);
      
      document.body.classList.add("dark");
      // document.body.classList.remove("light");
    } else {
      console.log(theme);
      document.body.classList.remove("dark");
      // document.body.classList.add("light");
    }
  }, [theme]);

  return (
    <main >
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoot />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashbaord />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accounts" element={<AccountPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </div>
      <Toaster
        className="toaster-group"
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            toast: "bg-neutral-800 text-white border-0", // Style global
            success: "bg-green-600", // Style pour les succès
            error: "bg-red-600", // Style pour les erreurs
          },
        }}
        duration={4000}
      />
    </main>
  );
}

export default App;
