import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const AddShippingModal = ({ open, onClose, onAddShipping }) => {
  const [formData, setFormData] = useState({
    IdInstitutoOK: "",
    IdNegocioOK: "",
    IdEntregaOK: "",
    IdEntregaBK: "",
    IdOrdenOK: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddShipping(formData); // Llama a la función para agregar el envío
    onClose(); // Cierra el modal
    setFormData({
      IdInstitutoOK: "",
      IdNegocioOK: "",
      IdEntregaOK: "",
      IdEntregaBK: "",
      IdOrdenOK: "",
    });
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
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Agregar Nuevo Envío
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Instituto OK"
            name="IdInstitutoOK"
            value={formData.IdInstitutoOK}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Negocio OK"
            name="IdNegocioOK"
            value={formData.IdNegocioOK}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ID Entrega OK"
            name="IdEntregaOK"
            value={formData.IdEntregaOK}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ID Entrega BK"
            name="IdEntregaBK"
            value={formData.IdEntregaBK}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ID Orden OK"
            name="IdOrdenOK"
            value={formData.IdOrdenOK}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Guardar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddShippingModal;
