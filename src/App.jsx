import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehiculos from "./pages/Vehiculos";
import Usuarios from "./pages/Usuarios";
import Insumos from "./pages/Insumos";
import Ordenes from "./pages/Ordenes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/vehiculos"
          element={
            <Layout>
              <Vehiculos />
            </Layout>
          }
        />
        <Route
          path="/usuarios"
          element={
            <Layout>
              <Usuarios />
            </Layout>
          }
        />
        <Route
          path="/insumos"
          element={
            <Layout>
              <Insumos />
            </Layout>
          }
        />
        <Route
          path="/ordenes"
          element={
            <Layout>
              <Ordenes />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
