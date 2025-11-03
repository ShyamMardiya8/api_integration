import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUp from "./screens/signup";
import Login from "./screens/Login";
import Table from "./components/Table";
import { HashRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <SignUp /> */}
      {/* <Login /> */}
      {/* <Table /> */}
      <HashRouter>
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route path={path} element={<Component />} />
          ))}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
