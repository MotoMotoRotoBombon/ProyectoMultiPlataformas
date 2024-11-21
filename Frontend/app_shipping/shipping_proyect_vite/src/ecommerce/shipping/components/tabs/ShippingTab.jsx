import { Box } from "@mui/material";
import { useState } from "react";
import ShippingNavTab from "../tabs/ShippingNavTab";
import InfoAdTab from "../tables/InfoAdTable";
import ProductTable from "../tables/ProductTable";
import ShippingsTable from "../tables/ShippingsTable";

export default function ShippingTab() {
  const [currentNameTabInShippingTab, setCurrentNameTabInShippingTab] = useState("TABLA DE ENVÍOS");
  const [reloadShippings, setReloadShippings] = useState(false);

  const handleTabChange = (tabName) => {
    setCurrentNameTabInShippingTab(tabName);
    if (tabName === "TABLA DE ENVÍOS") {
      setReloadShippings((prev) => !prev); // Forzar recarga solo para "TABLA DE ENVÍOS"
    }
  };

  return (
    <Box>
      <ShippingNavTab setCurrentNameTabInShippingTab={handleTabChange} />

      {currentNameTabInShippingTab === "TABLA DE ENVÍOS" && <ShippingsTable key={reloadShippings} />}
      {currentNameTabInShippingTab === "INFO ADICIONAL" && <InfoAdTab />}
      {currentNameTabInShippingTab === "PRODUCTOS" && <ProductTable />}
    </Box>
  );
}
