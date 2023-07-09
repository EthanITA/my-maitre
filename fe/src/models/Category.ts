import API from "./Custom/API.ts";
import Validate from "./Custom/Validate.ts";
import { DishItem } from "./Dish.ts";
import { toNumber } from "lodash";

export interface CategoryItem {
  id?: number;
  name: string;
  icon: string;
}

export interface CategoryStats {
  numberOfDishes: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

class Category extends API<CategoryItem> implements CategoryItem {
  id?: number;
  icon!: string;
  name!: string;

  constructor(public categoryItem: CategoryItem) {
    super("category");
    Object.assign(this, categoryItem);
  }

  async create(): Promise<CategoryItem> {
    return super.create(this);
  }

  static async getAll(): Promise<CategoryItem[] | never> {
    return new API<CategoryItem>("category").getAll();
  }

  static get(
    id: NonNullable<CategoryItem["id"]>
  ): Promise<CategoryItem | never> {
    return new API<CategoryItem>("category").get(id);
  }

  async delete(): Promise<CategoryItem> {
    if (!this.id) throw new Error("No id provided");
    return super.delete(this.id);
  }

  async update(): Promise<CategoryItem> {
    if (!this.id) throw new Error("No id provided");
    return super.update(this.id, this);
  }

  static validate(obj: any): boolean {
    const category = new Category(obj);
    const result: any[] = [];
    result.push(Validate.string(category.name));
    return result.every((item) => item);
  }

  getStats(dishes: DishItem[]): CategoryStats {
    dishes = dishes.filter((dish) => dish.category_id === this.id);
    return {
      numberOfDishes: dishes.length,
      minPrice: dishes.length && Math.min(...dishes.map((dish) => dish.price)),
      maxPrice: dishes.length && Math.max(...dishes.map((dish) => dish.price)),
      avgPrice:
        dishes.reduce((acc, dish) => acc + toNumber(dish.price), 0) /
        (dishes.length || 1),
    };
  }
}

export default Category;
