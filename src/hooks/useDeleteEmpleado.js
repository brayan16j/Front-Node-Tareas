import { useState } from 'react';
import crud from '../conexiones/crud';

export const useDeleteEmpleado = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteEmpleado = async (idEmpleado) => {
    setLoading(true);
    setError(null);
    try {
      await crud.DELETE(`/empleados/${idEmpleado}`);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return [deleteEmpleado, loading, error];
};
