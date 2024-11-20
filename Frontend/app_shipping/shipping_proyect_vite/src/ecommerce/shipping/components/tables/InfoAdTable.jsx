import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

const InfoAdColumns = [
  {
    accessorKey: "Etiqueta",
    header: "Etiqueta",
    size: 200,
  },
  {
    accessorKey: "Valor",
    header: "Valor",
    size: 200,
  },
  {
    accessorKey: "Secuencia",
    header: "Secuencia",
    size: 50,
  },
  {
    accessorKey: "detail_row.Activo",
    header: "Activo",
    size: 50,
  },
  {
    accessorKey: "detail_row.detail_row_reg[0].FechaReg",
    header: "Fecha Registro",
    size: 200,
  },
  {
    accessorKey: "detail_row.detail_row_reg[0].UsuarioReg",
    header: "Usuario Registro",
    size: 150,
  },
];

const InfoAdTable = ({ data }) => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [infoAdData, setInfoAdData] = useState([]);

  useEffect(() => {
    if (data) {
      setInfoAdData(data);
      setLoadingTable(false);
    } else {
      setLoadingTable(false);
    }
  }, [data]);

  return (
    <Box>
      <MaterialReactTable
        columns={InfoAdColumns}
        data={infoAdData}
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

export default InfoAdTable;
