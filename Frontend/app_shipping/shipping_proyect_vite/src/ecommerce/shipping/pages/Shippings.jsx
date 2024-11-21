import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ShippingNavTab from "../components/tabs/ShippingNavTab";
import InfoAdTable from "../components/tables/InfoAdTable";
import ProductTable from "../components/tables/ProductTable";
import ShippingsTable from "../components/tables/ShippingsTable";
import EnviosTable from "../components/tables/EnviosTable";
import RastreoTable from "../components/tables/RastreoTable";
import { getAllShippings } from "../services/remote/get/GetAllShippings";

export default function Shippings() {
  const [currentTab, setCurrentTab] = useState("TABLA DE ENVÍOS");
  const [shippingsData, setShippingsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <Box>
      <ShippingNavTab setCurrentNameTabInShippingTab={handleTabChange} />
      {loading && <div>Cargando datos...</div>}
      {!loading && currentTab === "TABLA DE ENVÍOS" && <ShippingsTable data={shippingsData} />}
      {!loading && currentTab === "INFO ADICIONAL" && <InfoAdTable data={shippingsData.map((d) => d.info_ad).flat()} />}
      {!loading && currentTab === "PRODUCTOS" && <ProductTable data={shippingsData.map((d) => d.envios).flat()} />}
      {!loading && currentTab === "ENVIOS" && <EnviosTable data={shippingsData.map((d) => d.envios).flat()} />}
      {!loading && currentTab === "RASTREO" && <RastreoTable data={shippingsData.map((d) => d.envios).flat()} />}
    </Box>
  );
}
