import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Tooltip, IconButton, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShippingModal from "../modals/AddShippingModal";
import DeleteShippingModal from "../modals/DeleteShippingModal";

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

  const handleAddShipping = (newShipping) => {
    setShippingsData((prevData) => [...prevData, newShipping]);
  };

  const handleDeleteShipping = (instituteId) => {
    setShippingsData((prevData) =>
      prevData.filter((shipping) => shipping.IdInstitutoOK !== instituteId)
    );
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
      />

      <MaterialReactTable
        columns={ShippingColumns}
        data={shippingsData}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2} sx={{ m: 1 }}>
            <Tooltip title="Agregar Envío">
              <IconButton color="primary" onClick={() => setIsAddModalOpen(true)}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Envío">
              <IconButton color="error" onClick={() => setIsDeleteModalOpen(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default ShippingsTable;
