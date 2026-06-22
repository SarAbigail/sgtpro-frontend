// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="container mt-4">
//       <h1>Dashboard SGTpro</h1>

//       <div className="row mt-4">
//         <div className="col-md-3">
//           <button
//             className="btn btn-primary w-100"
//             onClick={() => navigate("/vehiculos")}
//           >
//             Vehículos
//           </button>
//         </div>
//       </div>

//       <button className="btn btn-danger mt-4" onClick={logout}>
//         Cerrar Sesión
//       </button>
//     </div>
//   );
// }

// export default Dashboard;

import Layout from "../components/Layout";

function Dashboard() {
  return (
    <Layout>
      <h2>Dashboard SGTpro</h2>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Vehículos</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Usuarios</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3">
            <h5>Insumos</h5>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
