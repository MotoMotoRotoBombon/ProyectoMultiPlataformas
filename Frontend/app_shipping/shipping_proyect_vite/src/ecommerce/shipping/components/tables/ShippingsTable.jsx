import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Tooltip,
  IconButton,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddShippingModal from "../modals/AddShippingModal";
import DeleteShippingModal from "../modals/DeleteShippingModal";
import EditShippingModal from "../modals/EditShippingModal";
import AddInfoAdicional from "../modals/AddInfoAdicionalModal";
import AddTrackingModal from "../modals/AddTrackingModal "; // Importar modal de rastreo
import { deleteShipping } from "../../services/remote/del/DeleteShipping";
import { getAllShippings } from "../../services/remote/get/GetAllShippings";
import AddEnviosModal from "../modals/AddEnviosModal";

const ShippingColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID Instituto", size: 200 },
  { accessorKey: "IdNegocioOK", header: "ID Negocio", size: 200 },
  { accessorKey: "IdEntregaOK", header: "ID Entrega", size: 200 },
  { accessorKey: "IdEntregaBK", header: "Entrega BK", size: 200 },
  { accessorKey: "IdOrdenOK", header: "Orden OK", size: 200 },
];

const ShippingsTable = () => {
  const [shippingsData, setShippingsData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddInfoAdModalOpen, setIsAddInfoAdModalOpen] = useState(false);
  const [isAddTrackingModalOpen, setIsAddTrackingModalOpen] = useState(false); // Estado del modal de rastreo
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState(null); // Controlador para el menú contextual
  const [enviosData, setEnviosData] = useState([]);
  const [isAddEnviosModalOpen, setIsAddEnviosModalOpen] = useState(false);
  
  
  // Cargar datos desde el backend
  const loadShippingsData = async () => {
    setLoading(true);
    try {
      const data = await getAllShippings();
      setShippingsData(data);
    } catch (error) {
      console.error("Error al cargar los datos de envíos:", error);
      alert("Error al cargar los datos. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadShippingsData();
  }, []);

  const handleAddShipping = (newShipping) => {
    setShippingsData((prevData) => [...prevData, newShipping]);
  };

  const handleDeleteShipping = async () => {
    if (!selectedRow) {
      alert("Por favor, selecciona una fila antes de eliminar.");
      return;
    }

    const { IdInstitutoOK } = selectedRow;

    try {
      await deleteShipping(IdInstitutoOK);
      setShippingsData((prevData) =>
        prevData.filter((shipping) => shipping.IdInstitutoOK !== IdInstitutoOK)
      );
      setSelectedRow(null);
      setIsDeleteModalOpen(false);
      alert("Envío eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el envío:", error);
      alert(
        error.response?.data?.message || "Ocurrió un error al eliminar el envío."
      );
    }
  };

  const handleEdit = async (updatedShipping) => {
    try {
      const updatedData = await updateShipping(
        updatedShipping.IdInstitutoOK,
        updatedShipping
      );
      setShippingsData((prevData) =>
        prevData.map((row) =>
          row.IdInstitutoOK === updatedData.IdInstitutoOK
            ? updatedData
            : row
        )
      );
      setIsEditModalOpen(false);
      alert("Envío actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el envío:", error);
      alert(
        error.response?.data?.message || "Ocurrió un error al actualizar el envío."
      );
    }
  };

  const handleAddTracking = (newTracking) => {
    alert(`Nuevo rastreo agregado para el instituto ${selectedRow?.IdInstitutoOK}`);
    loadShippingsData(); // Recargar datos para reflejar el nuevo rastreo
  };

  const rowSelectionHandler = (row) => {
    setSelectedRow(row.original);
  };

  const handleContextMenu = (event, row) => {
    event.preventDefault();
    setSelectedRow(row.original); // Establecer la fila seleccionada
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleAddInfoAdicional = () => {
    setIsAddInfoAdModalOpen(true);
    handleCloseContextMenu();
  };

  const handleAddProductos = () => {
    alert(`Agregar Productos para: ${selectedRow.IdInstitutoOK}`);
    handleCloseContextMenu();
  };

  const handleAddEnvios = () => {
    setIsAddEnviosModalOpen(true);
    handleCloseContextMenu();
  };

  const handleAddRastreo = () => {
    console.log("Fila seleccionada para agregar rastreo:", selectedRow); // Verificar el contenido de selectedRow
    setIsAddTrackingModalOpen(true);
    handleCloseContextMenu();
  };
  

  return (
    <Box>
      <AddShippingModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddShipping={handleAddShipping}
      />

      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteShipping}
        selectedRow={selectedRow}
      />

      <EditShippingModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        envioData={selectedRow}
        onEdit={handleEdit}
      />

      <AddInfoAdicional
        open={isAddInfoAdModalOpen}
        onClose={() => setIsAddInfoAdModalOpen(false)}
        IdInstitutoOK={selectedRow?.IdInstitutoOK}
        onInfoAdAdded={(newInfoAd) => {
          console.log("Información adicional agregada:", newInfoAd);
          loadShippingsData(); // Recargar datos
        }}
      />

       <AddEnviosModal
        open={isAddEnviosModalOpen}
        onClose={() => setIsAddEnviosModalOpen(false)}
        IdInstitutoOK={selectedRow?.IdInstitutoOK} // Pasa la fila seleccionada al modal
        enviosData={enviosData}
        onEnvioAdded={(newEnvio) => {
          setEnviosData((prevData) => [...prevData, newEnvio]);
          console.log("Envío agregado:", newEnvio);
          loadShippingsData(); // Recargar datos
        }}
      />

      <AddTrackingModal
        open={isAddTrackingModalOpen}
        onClose={() => setIsAddTrackingModalOpen(false)}
        onAddTracking={handleAddTracking}
        instituteId={selectedRow?.IdInstitutoOK}
      />


      <MaterialReactTable
        columns={ShippingColumns}
        data={shippingsData}
        state={{ isLoading: loading }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => rowSelectionHandler(row),
          onContextMenu: (e) => handleContextMenu(e, row),
          style: {
            backgroundColor:
              selectedRow?.IdInstitutoOK === row.original.IdInstitutoOK
                ? "#d1e7ff"
                : "white",
            cursor: "pointer",
          },
        })}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2} sx={{ m: 1 }}>
            <Tooltip title="Agregar Envío">
              <IconButton color="primary" onClick={() => setIsAddModalOpen(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Envío">
              <IconButton
                color="error"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!selectedRow}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Envío">
              <IconButton
                color="secondary"
                onClick={() => setIsEditModalOpen(true)}
                disabled={!selectedRow}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Actualizar Tabla">
              <IconButton color="success" onClick={loadShippingsData}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />

      {/* Menú contextual */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleAddInfoAdicional}>Agregar Info Adicional</MenuItem>
        <MenuItem onClick={handleAddProductos}>Agregar Productos</MenuItem>
        <MenuItem onClick={handleAddEnvios}>Agregar Envíos</MenuItem>
        <MenuItem onClick={handleAddRastreo}>Agregar Rastreo</MenuItem>
      </Menu>
    </Box>
  );
};

export default ShippingsTable;
