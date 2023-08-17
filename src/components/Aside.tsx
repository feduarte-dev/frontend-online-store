import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

type Category = {
  id: number,
  name: string,
};

function Aside() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getAPI = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    getAPI();
  }, []);

  return (
    <>
      {categories.map((categorie, index) => (
        <>
          <input
            type="radio"
            key={ index }
          />
          <label data-testid="category">{categorie.name}</label>
          <br />
        </>
      ))}
    </>
  );
}

export default Aside;
