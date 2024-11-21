import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import axios from "axios";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "../modals/SearchModal";

const InfoAdColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID del Instituto", size: 150 }, // Mostrar el ID del Instituto
  { accessorKey: "Etiqueta", header: "Etiqueta", size: 200 },
  { accessorKey: "Valor", header: "Valor", size: 200 },
  { accessorKey: "Secuencia", header: "Secuencia", size: 50 },
  { accessorKey: "detail_row.Activo", header: "Activo", size: 50 },
  {
    accessorFn: (row) =>
      row.detail_row?.detail_row_reg?.[0]?.FechaReg || "Sin registro",
    header: "Fecha Registro",
    size: 200,
  },
  {
    accessorFn: (row) =>
      row.detail_row?.detail_row_reg?.[0]?.UsuarioReg || "Sin registro",
    header: "Usuario Registro",
    size: 150,
  },
];

const InfoAdTable = () => {
  const [infoAdData, setInfoAdData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Función para cargar toda la tabla de InfoAd
  const fetchAllInfoAd = async () => {
    try {
      setLoadingTable(true); // Activa el indicador de carga
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad`
      );

      if (response.data) {
        // Asegúrate de incluir IdInstitutoOK en cada entrada de info_ad
        const processedData = response.data.flatMap((entry) =>
          entry.info_ad.map((infoAd) => ({
            ...infoAd,
            IdInstitutoOK: entry.IdInstitutoOK, // Incluye el ID del Instituto
          }))
        );
        setInfoAdData(processedData); // Actualiza el estado con los datos procesados
      } else {
        setInfoAdData([]); // Si no hay datos, limpia la tabla
      }
    } catch (error) {
      console.error("Error al cargar todos los registros de InfoAd:", error);
    } finally {
      setLoadingTable(false); // Desactiva el indicador de carga
    }
  };

  // Función para buscar por instituto específico
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true); // Activa el indicador de carga
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad/${instituteId}`
      );

      if (response.data && response.data.info_ad) {
        const processedData = response.data.info_ad.map((infoAd) => ({
          ...infoAd,
          IdInstitutoOK: response.data.IdInstitutoOK, // Incluye el ID del Instituto en cada fila
        }));
        setInfoAdData(processedData); // Actualiza con los datos específicos
      } else {
        setInfoAdData([]);
        alert("No se encontraron resultados para el Instituto especificado.");
      }
    } catch (error) {
      console.error("Error al buscar información por IdInstitutoOK:", error);
      alert("Hubo un error al buscar información. Intenta nuevamente.");
    } finally {
      setLoadingTable(false); // Desactiva el indicador de carga
    }
  };

  // Cargar todos los registros al montar el componente
  useEffect(() => {
    fetchAllInfoAd();
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
        columns={InfoAdColumns}
        data={infoAdData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            {/* Botón para cargar todos */}
            <Tooltip title="Cargar todos los registros">
              <IconButton color="primary" onClick={fetchAllInfoAd}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>

            {/* Botón para abrir modal de búsqueda */}
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

export default InfoAdTable;
