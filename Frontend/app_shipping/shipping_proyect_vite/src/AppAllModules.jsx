import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import SecurityRouter from "./navigation/NaviRoutesSecurity";
import Footer from "./share/footer/components/Footer";

// Redux imports
import { useDispatch } from "react-redux";
import { fetchShippingData } from "./redux/thunks";

export default function AppAllModules() {
  const dispatch = useDispatch();

  // Cargar los datos al montar el componente
  useEffect(() => {
    dispatch(fetchShippingData());
  }, [dispatch]);

  return (
    <>
      <div id="div-app">
        <h1>Main App - All Modules</h1>

        {/* Rutas principales controladas por el enrutador */}
        <RouterProvider router={SecurityRouter} />

        <div id="div-footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
