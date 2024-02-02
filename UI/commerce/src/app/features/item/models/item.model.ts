import {Category} from "../../category/models/category.model";
import {ItemVisual} from "../../models/item-visual.model";

export interface Item {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  price: number,
  quantity: number,
  sortOrder: number,
  createdDate: any
  currentCategory: Category,
  itemVisuals: ItemVisual[],
  mainVisual: ItemVisual
}
