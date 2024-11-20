import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllShippings } from "../../services/remote/get/GetAllShippings";
import { addShipping } from "../../services/remote/post/AddShipping";
import { deleteShipping } from "../../services/remote/del/DeleteShipping"; // Función de eliminación
import AddShippingModal from "../modals/AddShippingModal";
import DeleteShippingModal from "../modals/DeleteShippingModal"; // Modal de eliminación

const ShippingsColumns = [
  { accessorKey: "IdInstitutoOK", header: "Instituto OK", size: 50 },
  { accessorKey: "IdNegocioOK", header: "Negocio OK", size: 50 },
  { accessorKey: "IdEntregaOK", header: "ID Entrega OK", size: 100 },
  { accessorKey: "IdEntregaBK", header: "ID Entrega BK", size: 50 },
  { accessorKey: "IdOrdenOK", header: "ID Orden OK", size: 100 },
];

const ShippingsTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [ShippingsData, setShippingsData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const AllShippingsData = await getAllShippings();
        setShippingsData(AllShippingsData);
        setLoadingTable(false);
      } catch (error) {
        console.error("Error al obtener los envíos:", error);
        setLoadingTable(false);
      }
    }
    fetchData();
  }, []);

  const handleAddShipping = async (newShipping) => {
    try {
      const addedShipping = await addShipping(newShipping);
      setShippingsData((prevData) => [...prevData, addedShipping]);
      setSnackbar({
        open: true,
        message: "Envío agregado exitosamente",
        severity: "success",
      });
    } catch (error) {
      console.error("Error al agregar el envío:", error);
      setSnackbar({
        open: true,
        message: "Error al agregar el envío",
        severity: "error",
      });
    }
  };

  const handleDeleteShipping = async (IdInstitutoOK) => {
    try {
      const response = await deleteShipping(IdInstitutoOK);
      setShippingsData((prevData) =>
        prevData.filter((shipping) => shipping.IdInstitutoOK !== IdInstitutoOK)
      );
      setSnackbar({
        open: true,
        message: "Envío eliminado exitosamente",
        severity: "success",
      });
    } catch (error) {
      console.error("Error al eliminar el envío:", error);
      setSnackbar({
        open: true,
        message: "Error al eliminar el envío",
        severity: "error",
      });
    }
  };

  return (
    <Box>
      {/* Modales */}
      <AddShippingModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddShipping={handleAddShipping}
      />
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteShipping}
      />

      {/* Tabla */}
      <MaterialReactTable
        columns={ShippingsColumns}
        data={ShippingsData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2} sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton
                color="primary"
                onClick={() => setIsAddModalOpen(true)}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShippingsTable;
