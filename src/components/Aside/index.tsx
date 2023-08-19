import { useEffect, useState } from 'react';
import { getCategories, getProductById } from '../../services/api';
import { Category, AsideProps } from '../../types/aside';

function Aside({ onCategoryClick }: AsideProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  async function handleCategoryClick({ target }:any) {
    const filterCategory:any = categories
      .filter(({ name }) => name === target.innerHTML)[0].id;
    const fetchCategories = await getProductById(filterCategory);
    onCategoryClick(fetchCategories.results);
  }

  return (
    <>
      {categories.map((category) => (
        <button
          data-testid="category"
          key={ category.id }
          onClick={ (e) => handleCategoryClick(e) }
        >
          {category.name}
        </button>
      ))}
    </>
  );
}

export default Aside;
