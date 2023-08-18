import { useEffect, useState } from 'react';
import { getCategories, getProductById } from '../../services/api';
import { Category, AsideProps } from '../../types/aside';

function Aside({ onCategoryClick }: AsideProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const GETAPI = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    GETAPI();
  }, []);

  async function handleClick({ target }:any) {
    const filterCategory:any = categories
      .filter(({ name }) => name === target.innerHTML)[0].id;
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
