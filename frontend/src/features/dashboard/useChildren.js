import { useState, useEffect } from 'react';
import childService from './child.service';

export function useChildren() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      setLoading(true);
      const data = await childService.getAll();
      setChildren(data);
    } catch (err) {
      setError('Не удалось загрузить профили детей');
    } finally {
      setLoading(false);
    }
  };

  const createChild = async (data) => {
    const newChild = await childService.create(data);
    setChildren((prev) => [...prev, newChild]);
    return newChild;
  };

  const deleteChild = async (id) => {
    await childService.remove(id);
    setChildren((prev) => prev.filter((c) => c.id !== id));
  };

  return { children, loading, error, createChild, deleteChild, reload: loadChildren };
}
