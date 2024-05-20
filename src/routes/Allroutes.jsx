import { Routes, Route } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Signuppage from "../pages/Signuppage";
import Mapcomponent from "../pages/Mapcomponent";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/mapcomponent" element={<Mapcomponent />} />
      </Routes>
    </div>
  );
};

export default Allroutes;
