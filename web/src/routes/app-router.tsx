import { DashboardLayout } from "@layouts/dashboard-layout";
import SigninPage from "@pages/signin-page";
import SignupPage from "@pages/signup-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard for authenticated users */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
