import API from "./Custom/API";
import { z } from "zod";

const HallItem = z.object({
  name: z.string(),
});

export type HallItem = z.infer<typeof HallItem>;

class Hall extends API<Hall> implements HallItem {
  name: string;

  constructor(public hallItem: HallItem) {
    super("hall");
    Object.assign(this, hallItem);
  }

  static async getAll(): Promise<HallItem[] | never> {
    return new API<HallItem>("hall").getAll();
  }

  static get(name: HallItem["name"]): Promise<HallItem | never> {
    return new API<HallItem>("hall").get(name);
  }

  // @ts-ignore
  async create(): Promise<HallItem | never> {
    return super.create(this);
  }

  async delete(): Promise<HallItem> {
    if (!this.name) throw new Error("No name provided");
    return this.axios.delete(`hall/v2/${this.name}`);
  }

  // @ts-ignore
  async update(): Promise<HallItem> {
    if (!this.name) throw new Error("No name provided");
    return super.update(this.name, this);
  }

  static validate(hallItem: HallItem): boolean {
    return HallItem.safeParse(hallItem).success;
  }
}

export default Hall;
