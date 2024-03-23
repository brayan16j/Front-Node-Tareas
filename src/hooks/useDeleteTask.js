import { useState } from 'react';
import crud from '../conexiones/crud';

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTask = async (idTarea) => {
    setLoading(true);
    setError(null);
    try {
      await crud.DELETE(`/tareas/${idTarea}`);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return [deleteTask, loading, error];
};
