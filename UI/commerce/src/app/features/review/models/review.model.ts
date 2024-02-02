import {Category} from "../../category/models/category.model";

export interface Review {
  id: string,
  userId: string,
  reviewMessage: string,
  userFirstName: string,
  userLastName: string
}
