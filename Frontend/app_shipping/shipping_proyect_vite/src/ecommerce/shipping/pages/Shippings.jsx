import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Cargando datos...");
        const data = await getAllShippings();
        console.log("Datos cargados en Shippings.jsx:", data);
        setShippingsData(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Manejar el cambio de pestañas
  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
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
    </Box>
  );
}


