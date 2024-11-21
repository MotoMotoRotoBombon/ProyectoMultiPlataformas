import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SearchModal from "../modals/SearchModal"; // Modal para búsqueda

const TrackingColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID Instituto", size: 150 },
  { accessorKey: "NumeroGuia", header: "Número de Guía", size: 200 },
  { accessorKey: "IdRepartidorOK", header: "ID Repartidor", size: 200 },
  { accessorKey: "NombreRepartidor", header: "Nombre Repartidor", size: 200 },
  { accessorKey: "Alias", header: "Alias", size: 200 },
  {
    accessorFn: (row) =>
      row.seguimiento?.[0]?.Ubicacion || "Sin ubicación registrada",
    header: "Ubicación",
    size: 200,
  },
  {
    accessorFn: (row) =>
      row.seguimiento?.[0]?.FechaReg || "Sin fecha registrada",
    header: "Fecha Registro",
    size: 200,
  },
  {
    accessorFn: (row) =>
      row.seguimiento?.[0]?.UsuarioReg || "Sin usuario registrado",
    header: "Usuario Registro",
    size: 200,
  },
];

const TrackingTable = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Función para obtener todos los rastreos
  const fetchAllTrackings = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/instituto/rastreos`
      );
      if (response.data) {
        // Formatear datos para incluir los rastreos directamente
        const formattedData = response.data.flatMap((item) =>
          item.rastreos.map((tracking) => ({
            ...tracking,
            IdInstitutoOK: item.IdInstitutoOK,
          }))
        );
        setTrackingData(formattedData);
      } else {
        setTrackingData([]);
      }
    } catch (error) {
      console.error("Error al obtener rastreos:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar rastreos por ID de Instituto
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/rastreos/instituto/${instituteId}`
      );
      if (response.data && response.data.rastreos) {
        const formattedData = response.data.rastreos.map((tracking) => ({
          ...tracking,
          IdInstitutoOK: response.data.IdInstitutoOK,
        }));
        setTrackingData(formattedData);
      } else {
        setTrackingData([]);
        alert("No se encontraron rastreos para el Instituto especificado.");
      }
    } catch (error) {
      console.error("Error al buscar rastreos por Instituto:", error);
      alert("Hubo un error al buscar los rastreos. Intenta nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchAllTrackings(); // Cargar todos los rastreos al inicio
  }, []);

  return (
    <Box>
      {/* Modal de búsqueda */}
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearchByInstitute}
      />

      {/* Tabla */}
      <MaterialReactTable
        columns={TrackingColumns}
        data={trackingData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Buscar por Instituto">
              <IconButton
                color="info"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default TrackingTable;
