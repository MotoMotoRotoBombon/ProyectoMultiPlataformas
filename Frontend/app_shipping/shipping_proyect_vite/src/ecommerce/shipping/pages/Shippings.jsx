import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ShippingNavTab from "../components/tabs/ShippingNavTab";
import InfoAdTable from "../components/tables/InfoAdTable";
import AddressesTable from "../components/tables/AddressesTable";
import ShippingsTable from "../components/tables/ShippingsTable";
import { getAllShippings } from "../services/remote/get/GetAllShippings";

export default function Shippings() {
  const [currentTab, setCurrentTab] = useState("TABLA DE ENVÍOS");
  const [shippingsData, setShippingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllShippings();
        setShippingsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <Box>
      <ShippingNavTab setCurrentNameTabInShippingTab={handleTabChange} />

      {currentTab === "TABLA DE ENVÍOS" && <ShippingsTable />}
      {currentTab === "INFO ADICIONAL" && <InfoAdTable data={shippingsData.map((d) => d.info_ad).flat()} />}
      {currentTab === "DOMICILIOS" && <AddressesTable data={shippingsData.map((d) => d.envios).flat()} />}
    </Box>
  );
}
