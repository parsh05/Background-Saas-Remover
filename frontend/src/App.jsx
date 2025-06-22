import Menubar from "./components/Menubar";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import UserSyncHandler from "./components/UserSyncHandler";
import Result from "./pages/Result";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import BuyCredits from './pages/BuyCredits';

function App() {
  return (
    <div>
      <UserSyncHandler />
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<BuyCredits />} />
        <Route
          path="/result"
          element={
            <>
              <SignedIn>
                <Result />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
