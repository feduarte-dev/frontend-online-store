import { useEffect, useState } from 'react';
import { getCategories, getProductById } from '../services/api';

type Category = {
  id: number,
  name: string,
};

type AsideProps = {
  onCategoryClick: (filterID: any) => void;
};

function Aside({ onCategoryClick }: AsideProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getAPI = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    getAPI();
  }, []);

  async function handleClick(e:any) {
    const filterCategory:any = categories
      .filter((filteredCategory) => filteredCategory.name === e.target.innerHTML)[0].id;
    const GETAPI = await getProductById(filterCategory);
    onCategoryClick(GETAPI.results);
  }

  return (
    <>
      {categories.map((category) => (
        <button
          data-testid="category"
          key={ category.id }
          onClick={ (e) => handleClick(e) }
        >
          {category.name}
        </button>
      ))}
    </>
  );
}

export default Aside;
