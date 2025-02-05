export interface Category {
  id: number,
  name: string,
}

export type AsideProps = {
  onCategoryClick: (filterID: any) => void;
};
