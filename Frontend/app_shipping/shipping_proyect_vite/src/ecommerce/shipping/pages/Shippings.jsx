import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Box, AppBar, Tab, Tabs, Typography, Paper } from "@mui/material";
import ShippingNavTab from "../components/tabs/ShippingNavTab"; // Este es un componente de navegación de pestañas.
import InfoAdTable from "../components/tables/InfoAdTable"; // Tabla de información adicional.
import ProductTable from "../components/tables/ProductTable"; // Tabla de productos.
import ShippingsTable from "../components/tables/ShippingsTable"; // Tabla de envíos.
import EnviosTable from "../components/tables/EnviosTable"; // Tabla de envíos (detalle).
import RastreoTable from "../components/tables/RastreoTable"; // Tabla para rastreo de envíos.
import { getAllShippings } from "../services/remote/get/GetAllShippings"; // Función para obtener los datos de los envíos.

export default function Shippings() {
  const [currentTab, setCurrentTab] = useState("TABLA DE ENVÍOS"); // Estado para la pestaña actual seleccionada.
  const [shippingsData, setShippingsData] = useState([]); // Datos de los envíos.
  const [loading, setLoading] = useState(true); // Estado de carga de datos.

  // Usamos useEffect para obtener los datos al cargar el componente.
=======
import { Box } from "@mui/material";
import ShippingNavTab from "../components/tabs/ShippingNavTab";
import InfoAdTable from "../components/tables/InfoAdTable";
import ProductTable from "../components/tables/ProductTable";
import ShippingsTable from "../components/tables/ShippingsTable";
import EnviosTable from "../components/tables/EnviosTable";
import RastreoTable from "../components/tables/RastreoTable";
import EditShippingModal from "../components/modals/EditShippingModal"; 
import { getAllShippings } from "../services/remote/get/GetAllShippings";

export default function Shippings() {
  const [currentTab, setCurrentTab] = useState("TABLA DE ENVÍOS");
  const [shippingsData, setShippingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Control del modal de edición
  const [selectedShipping, setSelectedShipping] = useState(null); // Envío seleccionado para edición

  // Cargar datos de envíos al montar el componente
>>>>>>> 330604c0c882693917eed60d1a8319feb859958a
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Cargando datos...");
        const data = await getAllShippings(); // Llamada a la API para obtener los envíos.
        console.log("Datos cargados en Shippings.jsx:", data);
        setShippingsData(data); // Establecer los datos en el estado.
      } catch (error) {
        console.error("Error al cargar los datos:", error); // Manejo de errores en caso de fallo en la carga.
      } finally {
        setLoading(false); // Establecer estado de carga en false al terminar de cargar.
      }
    }
    fetchData(); // Llamamos la función de obtención de datos.
  }, []); // Dependencia vacía para que solo se ejecute una vez al cargar el componente.

  // Manejar el cambio de pestañas
  const handleTabChange = (tabName) => {
    setCurrentTab(tabName); // Cambiar la pestaña actual.
  };

  // Manejar la edición de un envío
  const handleEditShipping = (shipping) => {
    setSelectedShipping(shipping); // Asigna el envío seleccionado
    setIsEditModalOpen(true); // Abre el modal de edición
  };

  // Guardar los cambios realizados en el modal
  const handleSaveEditedShipping = (updatedShipping) => {
    setShippingsData((prevData) =>
      prevData.map((shipping) =>
        shipping.IdInstitutoOK === updatedShipping.IdInstitutoOK
          ? updatedShipping
          : shipping
      )
    );
    setIsEditModalOpen(false); // Cierra el modal
  };

  return (
<<<<<<< HEAD
    <Box sx={{ backgroundColor: "#232F3E", minHeight: "100vh", paddingBottom: "20px" }}>
      {/* Encabezado estilo dock de Apple con color de fondo y logo */}
      <AppBar position="sticky" sx={{ backgroundColor: "#FF9900", boxShadow: "none", padding: "10px 0" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="path_to_amazon_logo.png" alt="Amazon Logo" style={{ height: "40px", marginRight: "10px" }} />
          <Typography variant="h6" sx={{ color: "white" }}>Shippings Dashboard</Typography>
        </Box>
      </AppBar>

      {/* Navegación de las pestañas */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "20px" }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => handleTabChange(newValue)}
          textColor="primary"  // Cambiar el color del texto de las pestañas
          indicatorColor="primary"  // Cambiar el color del indicador de la pestaña activa
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#FF9900",  // Establecer color naranja primitivo para el indicador
            },
            "& .MuiTab-root": {
              color: "white",  // Color del texto de las pestañas (puedes cambiar a naranja si lo prefieres)
              fontWeight: "bold",
            },
            "& .Mui-selected": {
              color: "#FF9900",  // Cambiar el color de la pestaña activa a naranja primitivo
            },
          }}
        >
          <Tab label="TABLA DE ENVÍOS" value="TABLA DE ENVÍOS" />
          <Tab label="INFO ADICIONAL" value="INFO ADICIONAL" />
          <Tab label="PRODUCTOS" value="PRODUCTOS" />
          <Tab label="ENVIOS" value="ENVIOS" />
          <Tab label="RASTREO" value="RASTREO" />
        </Tabs>
      </Box>

      {loading && <div style={{ color: "white", textAlign: "center" }}>Cargando datos...</div>} {/* Mensaje de carga */}

      {/* Renderizar la tabla correspondiente según la pestaña seleccionada */}
      <Paper sx={{ backgroundColor: "#FF9900", padding: "20px", marginTop: "20px" }}>
        {!loading && currentTab === "TABLA DE ENVÍOS" && <ShippingsTable data={shippingsData} />}
        {!loading && currentTab === "INFO ADICIONAL" && <InfoAdTable data={shippingsData.map((d) => d.info_ad).flat()} />}
        {!loading && currentTab === "PRODUCTOS" && <ProductTable data={shippingsData.map((d) => d.envios).flat()} />}
        {!loading && currentTab === "ENVIOS" && <EnviosTable data={shippingsData.map((d) => d.envios).flat()} />}
        {!loading && currentTab === "RASTREO" && <RastreoTable data={shippingsData.map((d) => d.envios).flat()} />}
      </Paper>
=======
    <Box>
      {/* Navegación de pestañas */}
      <ShippingNavTab setCurrentNameTabInShippingTab={handleTabChange} />

      {/* Mostrar un mensaje de carga si los datos están siendo obtenidos */}
      {loading && <div>Cargando datos...</div>}

      {/* Renderizar la tabla correspondiente según la pestaña seleccionada */}
      {!loading && currentTab === "TABLA DE ENVÍOS" && (
        <ShippingsTable data={shippingsData} onEdit={handleEditShipping} />
      )}
      {!loading && currentTab === "INFO ADICIONAL" && (
        <InfoAdTable data={shippingsData.map((d) => d.info_ad).flat()} />
      )}
      {!loading && currentTab === "PRODUCTOS" && (
        <ProductTable data={shippingsData.map((d) => d.envios).flat()} />
      )}
      {!loading && currentTab === "ENVIOS" && (
        <EnviosTable
          data={shippingsData.map((d) => d.envios).flat()}
          onEdit={handleEditShipping}
        />
      )}
      {!loading && currentTab === "RASTREO" && (
        <RastreoTable data={shippingsData.map((d) => d.envios).flat()} />
      )}

      {/* Modal de edición */}
      <EditShippingModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)} // Cierra el modal
        shippingData={selectedShipping} // Pasa los datos del envío seleccionado
        onSave={handleSaveEditedShipping} // Lógica para guardar los cambios
      />
>>>>>>> 330604c0c882693917eed60d1a8319feb859958a
    </Box>
  );
}


