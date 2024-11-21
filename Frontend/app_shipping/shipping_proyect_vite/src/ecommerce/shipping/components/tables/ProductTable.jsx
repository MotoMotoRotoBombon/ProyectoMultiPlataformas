import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage"; // Importa el nuevo ícono
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import SearchModal from "../modals/SearchModal"; // Modal para búsqueda por Instituto

const ProductColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID Instituto", size: 200 },
  { accessorKey: "IdProdServOK", header: "ID Producto", size: 200 },
  { accessorKey: "IdPresentaOK", header: "ID Presentación", size: 200 },
  { accessorKey: "DesProdServ", header: "Descripción Producto", size: 200 },
  { accessorKey: "DesPresenta", header: "Descripción Presentación", size: 200 },
  { accessorKey: "CantidadPed", header: "Cantidad Pedida", size: 100 },
  { accessorKey: "CantidadEnt", header: "Cantidad Entregada", size: 100 },
];

const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Función para cargar todos los productos
  const fetchAllProducts = async () => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/productos`
      );

      // Mapea los datos para obtener productos y asociarlos con el Instituto
      const formattedData = response.data.flatMap((entry) =>
        entry.productos.map((product) => ({
          ...product,
          IdInstitutoOK: entry.IdInstitutoOK, // Agrega el ID del Instituto a cada producto
        }))
      );

      setProductData(formattedData);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      alert("Error al cargar los productos. Intenta nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Función para buscar productos por IdInstitutoOK
  const fetchProductsByInstitute = async (instituteId) => {
    try {
      setLoadingTable(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/${instituteId}/productos`
      );

      if (response.data && response.data.productos) {
        const formattedData = response.data.productos.map((product) => ({
          ...product,
          IdInstitutoOK: response.data.IdInstitutoOK, // Agrega el ID del Instituto a cada producto
        }));
        setProductData(formattedData);
      } else {
        setProductData([]);
        alert("No se encontraron productos para el Instituto especificado.");
      }
    } catch (error) {
      console.error("Error al buscar productos por IdInstitutoOK:", error);
      alert("Hubo un error al buscar productos. Intenta nuevamente.");
    } finally {
      setLoadingTable(false);
    }
  };

  // Cargar los productos cuando el componente se monta
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <Box>
      {/* Modal de búsqueda */}
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={fetchProductsByInstitute}
      />

      {/* Tabla de productos */}
      <MaterialReactTable
        columns={ProductColumns}
        data={productData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2}>
            {/* Botón para abrir el modal de búsqueda */}
            <Tooltip title="Buscar productos por Instituto">
              <IconButton
                color="info"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Botón para cargar todos los productos */}
            <Tooltip title="Cargar todos los productos">
              <IconButton color="primary" onClick={fetchAllProducts}>
                <PlaylistAddCheckIcon  />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default ProductTable;
