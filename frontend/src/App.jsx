import Menubar from "./components/Menubar";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import UserSyncHandler from './components/UserSyncHandler';

function App() {
  return (
    <div>
      <UserSyncHandler />
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
