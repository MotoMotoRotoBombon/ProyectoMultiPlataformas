import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import axios from "axios";
import PlaylistAddCheckIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteShippingModal from "../modals/DeleteShippingModal"; // Usamos este modal
import SearchModal from "../modals/SearchModal";

const InfoAdColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID del Instituto", size: 150 },
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Función para cargar toda la tabla de InfoAd
  const fetchAllInfoAd = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad`
      );

      if (response.data) {
        const processedData = response.data.flatMap((entry) =>
          entry.info_ad.map((infoAd) => ({
            ...infoAd,
            IdInstitutoOK: entry.IdInstitutoOK,
          }))
        );
        setInfoAdData(processedData);
      } else {
        setInfoAdData([]);
      }
    } catch (error) {
      console.error("Error al cargar todos los registros de InfoAd:", error);
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar por instituto específico
  const handleSearchByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad/${instituteId}`
      );

      if (response.data && response.data.info_ad) {
        const processedData = response.data.info_ad.map((infoAd) => ({
          ...infoAd,
          IdInstitutoOK: response.data.IdInstitutoOK,
        }));
        setInfoAdData(processedData);
      } else {
        setInfoAdData([]);
        alert("No se encontraron resultados para el Instituto especificado.");
      }
    } catch (error) {
      console.error("Error al buscar información por IdInstitutoOK:", error);
      alert("Hubo un error al buscar información. Intenta nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para eliminar Info Adicional
  const handleDeleteInfoAd = async () => {
    try {
      if (!selectedRow) {
        alert("Por favor, selecciona una fila para eliminar.");
        return;
      }

      const { IdInstitutoOK } = selectedRow; // Obtiene el ID del instituto seleccionado

      await axios.delete(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/info-ad/${IdInstitutoOK}`
      );

      // Elimina la fila de la tabla
      setInfoAdData((prevData) =>
        prevData.filter((row) => row.IdInstitutoOK !== IdInstitutoOK)
      );

      alert(`Información adicional del Instituto ${IdInstitutoOK} eliminada correctamente.`);
      setSelectedRow(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar Info Adicional:", error);
      alert("Hubo un error al eliminar la información. Intenta nuevamente.");
    }
  };

  // Cargar todos los registros al montar el componente
  useEffect(() => {
    fetchAllInfoAd();
  }, []);

  return (
    <Box>
      {/* Modal de eliminación */}
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteInfoAd}
        selectedRow={selectedRow}
      />

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
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => setSelectedRow(row.original), // Seleccionar fila al hacer clic
          style: {
            backgroundColor:
              selectedRow?.IdInstitutoOK === row.original.IdInstitutoOK
                ? "#d1e7ff"
                : "white",
            cursor: "pointer",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            {/* Botón para abrir modal de búsqueda */}
            <Tooltip title="Buscar por Instituto">
              <IconButton
                color="info"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Botón para eliminar */}
            <Tooltip title="Eliminar registro seleccionado">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!selectedRow}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
             {/* Botón para cargar todos */}
             <Tooltip title="Cargar todos los registros">
              <IconButton color="primary" onClick={fetchAllInfoAd}>
                <PlaylistAddCheckIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default InfoAdTable;
