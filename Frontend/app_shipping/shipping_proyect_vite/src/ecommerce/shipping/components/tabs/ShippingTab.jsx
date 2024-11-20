import { Box } from "@mui/material";
import { useState } from "react";
import ShippingNavTab from "../tabs/ShippingNavTab";
import InfoAdTab from "../tabs/InfoAdTab";
import AddressesTab from "../tabs/AddressesTab";
import ShippingsTable from "../tables/ShippingsTable";

export default function ShippingTab() {
  // Estados para manejar la pestaña activa y el control de recarga de envíos
  const [currentNameTabInShippingTab, setCurrentNameTabInShippingTab] = useState("TABLA DE ENVÍOS");
  const [reloadShippings, setReloadShippings] = useState(false);

  // Función para manejar el cambio de pestañas
  const handleTabChange = (tabName) => {
    setCurrentNameTabInShippingTab(tabName);
    // Si regresamos a la pestaña "TABLA DE ENVÍOS", forzamos recargar los datos
    if (tabName === "TABLA DE ENVÍOS") {
      setReloadShippings((prev) => !prev); // Cambia el estado para forzar recarga
    }
  };

  return (
    <Box>
      {/* Componente de navegación por pestañas */}
      <ShippingNavTab setCurrentNameTabInShippingTab={handleTabChange} />

      {/* Renderizado dinámico según la pestaña activa */}
      {currentNameTabInShippingTab === "TABLA DE ENVÍOS" && <ShippingsTable key={reloadShippings} />}
      {currentNameTabInShippingTab === "INFO ADICIONAL" && <InfoAdTab />}
      {currentNameTabInShippingTab === "DOMICILIOS" && <AddressesTab />}
    </Box>
  );
}
