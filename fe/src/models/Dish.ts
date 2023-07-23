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

  async uploadImage(image: File): Promise<string> {
    if (!this.id) throw new Error("No id provided");
    const formData = new FormData();
    formData.append("image", image);
    return this.axios.post<string>(`/image/${this.id}`, formData);
  }

  async deleteImage(): Promise<string> {
    if (!this.id) throw new Error("No id provided");
    return this.axios.delete<string>(`/image/${this.id}`);
  }

  get imgUrl(): URL | undefined {
    if (!this.image || !this.id) return;
    return new URL(`${this.axios.defaults.baseURL}/image/${this.id}`);
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
