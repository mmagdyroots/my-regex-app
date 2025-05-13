import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter  } from "react-router-dom";
import MasterLayout from "./components/MasterLayout/MasterLayout.jsx";
import FullApp from "./components/FullApp/FullApp.jsx";
import DemoApp from "./components/DemoApp/DemoApp.jsx";
import DemoAppLocalization from "./components/DemoAppLocalization/DemoAppLocalization.jsx";
import DemoAppUnits from "./components/DemoAppUnits/DemoAppUnits.jsx";
import DemoAppTrRole from "./components/DemoAppTrRole/DemoAppTrRole.jsx";

export default function App() {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<DemoApp />} />
          <Route path="/fullApp" element={<FullApp />} />
          <Route path="/demoAppLocalization" element={<DemoAppLocalization />} />
          <Route path="/demoAppUnits" element={<DemoAppUnits />} />
          <Route path="/demoAppTrRole" element={<DemoAppTrRole />} />
        </Route>
      </Routes>
    </HashRouter >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);