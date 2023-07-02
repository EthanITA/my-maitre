import API from "./Custom/API.ts";
import Validate from "./Custom/Validate.ts";

export interface CategoryItem {
  id?: number;
  name: string;
  icon: string;
}

class Category extends API<CategoryItem> implements CategoryItem {
  id?: number;
  icon!: string;
  name!: string;

  constructor(public categoryItem: CategoryItem) {
    super("category");
    Object.assign(this, categoryItem);
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
}

export default Category;
