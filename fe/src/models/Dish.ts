import API from "./Custom/API.ts";
import Validate from "./Custom/Validate.ts";

export interface DishItem {
  id?: number;
  name: string;
  description: string;
  category_id: number;
  price: number;
  unit_of_measure_id: number;
  image: string;
  allergens_id: number[];
  characteristics_id: number[];
}

class Dish extends API<DishItem> implements DishItem {
  id?: number;
  name!: string;
  description!: string;
  category_id!: number;
  price!: number;
  unit_of_measure_id!: number;
  image!: string;
  allergens_id!: number[];
  characteristics_id!: number[];

  constructor(public dishItem: DishItem) {
    super("dish");
    Object.assign(this, dishItem);
  }

  async create(): Promise<DishItem> {
    return super.create(this);
  }

  static async getAll(): Promise<DishItem[] | never> {
    return new API<DishItem>("dish").getAll();
  }

  static get(id: NonNullable<DishItem["id"]>): Promise<DishItem | never> {
    return new API<DishItem>("dish").get(id);
  }

  async delete(): Promise<DishItem> {
    if (!this.id) throw new Error("No id provided");
    return super.delete(this.id);
  }

  async update(): Promise<DishItem> {
    if (!this.id) throw new Error("No id provided");
    return super.update(this.id, this);
  }

  static validate(obj: any): boolean {
    const dish = new Dish(obj);
    const result: any[] = [];
    result.push(Validate.string(dish.name));
    result.push(Validate.string(dish.description));
    result.push(Validate.number(dish.category_id));
    result.push(Validate.number(dish.price));
    result.push(Validate.number(dish.unit_of_measure_id));
    console.log(result);
    console.log(dish);
    return result.every((item) => item);
  }
}

export default Dish;
