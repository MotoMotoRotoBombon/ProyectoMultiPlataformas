import axios from "axios";

export function getAllShippings() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/`) // URL de tu API
      .then((response) => {
        const data = response.data;

        // Verificamos si la respuesta es un array (lo esperado en tu caso)
        if (Array.isArray(data)) {
          console.log("<<AXIOS-SHIPPING>>:", data);
          resolve(data); // Resolvemos directamente el array de datos
        } else {
          console.error("Formato inesperado en la respuesta de la API", data);
          reject("Formato inesperado en la respuesta de la API");
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllShippings>>", error);
        reject(error);
      });
  });
}
