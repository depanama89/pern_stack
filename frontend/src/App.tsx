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
import type { User } from "./model/user";
import { useState } from "react";
// import Test  from "./pages/test"


const ProtectedRoot = () => {
  const { user } = useStore((state) => state);

  console.log(user);

  return !user ? (
    <Navigate to="signin" replace={true} />
  ) : (
    <>
      <div className="min-h-[cal(h-screen-100px)]">
        <Outlet />
      </div>
    </>
  );
};

function App() {

  const [loggedInUser,setLoggedInUser]=useState<User | null>()
  return (
    <main>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Routes>
          <Route path="/signin" element={<SignIn onLoginSuccessFull={(user)=>setLoggedInUser(user)} />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/signup" element={<SignUp  onSignUpSuccessFul={(user)=>setLoggedInUser(user)}/>} />

          <Route element={<ProtectedRoot />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashbaord />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<AccountPage />} />
            <Route />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
