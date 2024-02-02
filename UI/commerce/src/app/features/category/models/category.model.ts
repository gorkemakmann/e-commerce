export interface Category {
  id: string,
  name: string,
  description: string,
  parentCategoryId: string,
  categoryImage: string,
  categoryUrl: string,
  sortOrder: number,
  totalItemCount: number
}
