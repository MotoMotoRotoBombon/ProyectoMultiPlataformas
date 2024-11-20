import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";

const DeleteShippingModal = ({ open, onClose, onDeleteShipping }) => {
  const [IdInstitutoOK, setIdInstitutoOK] = useState("");

  const handleDelete = () => {
    if (IdInstitutoOK.trim()) {
      onDeleteShipping(IdInstitutoOK); // Llama la función de eliminación
      setIdInstitutoOK(""); // Limpia el campo
      onClose(); // Cierra el modal
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Eliminar Envío
        </Typography>
        <Typography variant="body1" mb={2}>
          Ingresa el <strong>IdInstitutoOK</strong> del envío que deseas eliminar.
        </Typography>
        <TextField
          fullWidth
          label="IdInstitutoOK"
          value={IdInstitutoOK}
          onChange={(e) => setIdInstitutoOK(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!IdInstitutoOK.trim()}
          >
            Eliminar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteShippingModal;
