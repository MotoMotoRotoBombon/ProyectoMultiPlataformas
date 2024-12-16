import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import axios from "axios";

const formatDateTimeLocal = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const AddTrackingModal = ({ open, onClose, onAddTracking, instituteId }) => {
  const [formData, setFormData] = useState({
    NumeroGuia: "",
    IdRepartidorOK: "",
    NombreRepartidor: "",
    Alias: "",
    Ubicacion: "",
    FechaRegistro: formatDateTimeLocal(new Date()),
    UsuarioRegistro: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

  const isDisabled =
    !formData.NumeroGuia ||
    !formData.IdRepartidorOK ||
    !formData.NombreRepartidor ||
    !formData.UsuarioRegistro;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!instituteId) {
        throw new Error("El ID del instituto es obligatorio.");
      }
  
      const payload = { ...formData, IdInstitutoOK: instituteId };
      const response = await axios.post(
        `${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/rastreos`,
        payload
      );
  
      if (response.status === 201) {
        onAddTracking(response.data); // Agrega el nuevo rastreo al estado principal.
        setSuccessMessage(true); // Muestra notificación de éxito.
        setFormData({
          NumeroGuia: "",
          IdRepartidorOK: "",
          NombreRepartidor: "",
          Alias: "",
          Ubicacion: "",
          FechaRegistro: formatDateTimeLocal(new Date()),
          UsuarioRegistro: "",
        });
        onClose(); // Cierra el modal.
      } else {
        throw new Error("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      setErrorDetails(error.response?.data?.message || error.message);
      setErrorMessage(true); // Muestra la notificación de error.
    }
  };
  

  return (
    <>
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
            Agregar Nuevo Rastreo
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Número de Guía"
              name="NumeroGuia"
              value={formData.NumeroGuia}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID Repartidor"
              name="IdRepartidorOK"
              value={formData.IdRepartidorOK}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Nombre Repartidor"
              name="NombreRepartidor"
              value={formData.NombreRepartidor}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Alias"
              name="Alias"
              value={formData.Alias}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Ubicación"
              name="Ubicacion"
              value={formData.Ubicacion}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Fecha Registro"
              name="FechaRegistro"
              type="datetime-local"
              value={formData.FechaRegistro}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Usuario Registro"
              name="UsuarioRegistro"
              value={formData.UsuarioRegistro}
              onChange={handleChange}
              fullWidth
            />
            <Tooltip title={isDisabled ? "Complete todos los campos obligatorios" : "Guardar"}>
              <span>
                <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
                  Guardar
                </Button>
              </span>
            </Tooltip>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Rastreo agregado exitosamente!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage(false)}
      >
        <Alert
          onClose={() => setErrorMessage(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorDetails || "Hubo un error al guardar el rastreo. Intenta nuevamente."}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTrackingModal;
