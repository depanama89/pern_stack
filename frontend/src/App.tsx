import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signup";
// import RootLayout from './components/layout/RootLayout'
import Dashbaord from "./pages/dashbaord";
import AccountPage from "./pages/accountPage";
import Settings from "./pages/settings";
import Transactions from "./pages/transactions";

const ProtectedRoot = () => {
  const user = null;

  return !user ? (
    <Navigate to="signin"  replace={true}/>
  ) : (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

function App() {
  

  return (
    <main>
      <div>
        <Routes>
          <Route element={<ProtectedRoot />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashbaord />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<AccountPage />} />
            <Route />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
