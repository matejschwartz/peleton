export interface Category {
  name: string;
  text: string;
  brands?: string[];
}

export interface CategoryGroup {
  id: string;
  title: string;
  intro: string;
  items: Category[];
}
