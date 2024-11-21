import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Icono para buscar todos
import axios from "axios";
import SearchModal from "../modals/SearchModal"; // Modal para buscar por IdInstitutoOK

// Definimos las columnas de la tabla
const EnviosColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID del Instituto", size: 150 },
  { accessorKey: "IdDomicilioOK", header: "ID Domicilio OK", size: 200 },
  { accessorKey: "IdPaqueteriaOK", header: "ID Paquetería OK", size: 200 },
  { accessorKey: "IdTipoMetodoEnvio", header: "Tipo Método Envío", size: 200 },
  { accessorKey: "CostoEnvio", header: "Costo Envío", size: 100 },
];

const EnviosTable = () => {
  const [enviosData, setEnviosData] = useState([]); // Datos para la tabla
  const [loadingTable, setLoadingTable] = useState(false); // Estado de carga
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Modal de búsqueda abierto

  // Función para obtener todos los envíos
  const fetchAllEnvios = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/instituto/envios`
      );
      setEnviosData(
        response.data.flatMap((institute) =>
          institute.envios.map((envio) => ({
            IdInstitutoOK: institute.IdInstitutoOK,
            ...envio,
          }))
        )
      );
    } catch (error) {
      console.error("Error al obtener todos los envíos:", error);
      alert("Hubo un problema al cargar los envíos. Intente nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar envíos por IdInstitutoOK
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/envios/instituto/${instituteId}`
      );
      if (response.data && response.data.envios) {
        setEnviosData(
          response.data.envios.map((envio) => ({
            IdInstitutoOK: response.data.IdInstitutoOK,
            ...envio,
          }))
        );
      } else {
        setEnviosData([]);
        alert("No se encontraron envíos para el Instituto especificado.");
      }
    } catch (error) {
      console.error("Error al buscar envíos por IdInstitutoOK:", error);
      alert("Hubo un problema al buscar los envíos. Intente nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Cargar todos los envíos al cargar el componente
  useEffect(() => {
    fetchAllEnvios();
  }, []);

  return (
    <Box>
      {/* Modal para buscar por IdInstitutoOK */}
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchByInstitute}
      />

      {/* Tabla de MaterialReactTable */}
      <MaterialReactTable
        columns={EnviosColumns}
        data={enviosData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            {/* Botón para buscar todos los envíos */}
            <Tooltip title="Cargar todos los envíos">
              <IconButton color="primary" onClick={fetchAllEnvios}>
                <ListAltIcon />
              </IconButton>
            </Tooltip>

            {/* Botón para abrir el modal de búsqueda */}
            <Tooltip title="Buscar por Instituto">
              <IconButton color="info" onClick={() => setIsSearchModalOpen(true)}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default EnviosTable;
