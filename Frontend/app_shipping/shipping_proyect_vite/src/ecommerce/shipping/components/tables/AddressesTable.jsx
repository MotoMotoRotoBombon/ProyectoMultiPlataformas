import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

const AddressesColumns = [
  {
    accessorKey: "IdDomicilioOK",
    header: "ID Domicilio OK",
    size: 200,
  },
  {
    accessorKey: "IdPaqueteriaOK",
    header: "ID Paqueteria OK",
    size: 200,
  },
  {
    accessorKey: "IdTipoMetodoEnvio",
    header: "Tipo Método Envío",
    size: 200,
  },
  {
    accessorKey: "CostoEnvio",
    header: "Costo Envío",
    size: 100,
  },
  {
    accessorKey: "info_ad[0].Etiqueta",
    header: "Etiqueta",
    size: 200,
  },
  {
    accessorKey: "info_ad[0].Valor",
    header: "Valor",
    size: 200,
  },
];

const AddressesTable = ({ data }) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [addressesData, setAddressesData] = useState([]);

  useEffect(() => {
    if (data) {
      setAddressesData(data);
      setLoadingTable(false);
    } else {
      setLoadingTable(false);
    }
  }, [data]);

  return (
    <Box>
      <MaterialReactTable
        columns={AddressesColumns}
        data={addressesData}
        state={{ isLoading: loadingTable }}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={2} sx={{ m: 1 }}>
            <Tooltip title="Agregar">
              <IconButton color="primary">
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton color="secondary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detalles">
              <IconButton color="info">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      />
    </Box>
  );
};

export default AddressesTable;
