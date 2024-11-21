import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShippingModal from "../modals/AddShippingModal";
import DeleteShippingModal from "../modals/DeleteShippingModal";
import EditShippingModal from "../modals/EditShippingModal";
import { deleteShipping } from "../../services/remote/del/DeleteShipping"; // Importar servicio

const ShippingColumns = [
  { accessorKey: "IdInstitutoOK", header: "ID Instituto", size: 200 },
  { accessorKey: "IdNegocioOK", header: "ID Negocio", size: 200 },
  { accessorKey: "IdEntregaOK", header: "ID Entrega", size: 200 },
  { accessorKey: "IdEntregaBK", header: "Entrega BK", size: 200 },
  { accessorKey: "IdOrdenOK", header: "Orden OK", size: 200 },
];

const ShippingsTable = ({ data }) => {
  const [shippingsData, setShippingsData] = useState(data || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Fila seleccionada

  const handleAddShipping = (newShipping) => {
    setShippingsData((prevData) => [...prevData, newShipping]);
  };

  const handleDeleteShipping = async () => { //ACTUALIZADO
    if (!selectedRow) {
      alert("Por favor, selecciona una fila antes de eliminar.");
      return;
    }

    const { IdInstitutoOK } = selectedRow;

    try {
      // Llama al servicio para eliminar el envío
      await deleteShipping(IdInstitutoOK);

      // Actualiza el estado local si la eliminación fue exitosa
      setShippingsData((prevData) =>
        prevData.filter((shipping) => shipping.IdInstitutoOK !== IdInstitutoOK)
      );

      setSelectedRow(null); // Limpia la selección después de eliminar
      setIsDeleteModalOpen(false); // Cierra el modal de eliminación
      alert("Envío eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el envío:", error);
      alert(
        error.response?.data?.message || "Ocurrió un error al eliminar el envío."
      );
    }
  };

  const handleEdit = (updatedShipping) => {
    setShippingsData((prevData) =>
      prevData.map((row) =>
        row.IdInstitutoOK === updatedShipping.IdInstitutoOK
          ? updatedShipping
          : row
      )
    );
    setIsEditModalOpen(false);
  };

  const rowSelectionHandler = (row) => {
    console.log("Fila seleccionada:", row.original); // Debug para verificar datos
    setSelectedRow(row.original); // Establecer todos los datos de la fila seleccionada
  };

  return (
    <Box>
      {/* Modal para agregar */}
      <AddShippingModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddShipping={handleAddShipping}
      />

      {/* Modal para eliminar */}
      <DeleteShippingModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteShipping={handleDeleteShipping}
        selectedRow={selectedRow}
      />

      {/* Modal para editar */}
      <EditShippingModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        envioData={selectedRow} // Pasar todos los datos de la fila seleccionada
        onEdit={handleEdit}
      />

      {/* Tabla */}
      <MaterialReactTable
        columns={ShippingColumns}
        data={shippingsData}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => rowSelectionHandler(row), // Manejar selección
          style: {
            backgroundColor:
              selectedRow?.IdInstitutoOK === row.original.IdInstitutoOK
                ? "#d1e7ff"
                : "white", // Resaltar la fila seleccionada
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
                disabled={!selectedRow} // Deshabilitar si no hay fila seleccionada
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Envío">
              <IconButton
                color="secondary"
                onClick={() => setIsEditModalOpen(true)}
                disabled={!selectedRow} // Deshabilitar si no hay fila seleccionada
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default ShippingsTable;
