import API from "./Custom/API";
import { z } from "zod";

const HallItem = z.object({
  name: z.string().min(1),
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

  static async get(name: HallItem["name"]): Promise<HallItem | never> {
    const api = new API<HallItem>("hall");
    api.notification = false;
    return (await api.axios.get(`v2/${name}`)).data;
  }

  // @ts-ignore
  async create(): Promise<HallItem | never> {
    return super.create(this);
  }

  async delete(): Promise<HallItem> {
    if (!this.name) throw new Error("No name provided");
    return this.axios.delete(`v2/${this.name}`);
  }

  // @ts-ignore
  async update(oldName: str): Promise<HallItem> {
    if (!this.name) throw new Error("No name provided");
    return this.axios.put(`v2/${oldName}`, this);
  }

  static validate(hallItem: HallItem): boolean {
    return HallItem.safeParse(hallItem).success;
  }
}

export default Hall;
