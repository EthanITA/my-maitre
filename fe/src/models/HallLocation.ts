import API from "./Custom/API";
import { z } from "zod";

const HallLocationItem = z.object({
  id: z.string().min(6).optional(),
  name: z.string(),
  hall_id: z.string(),
  value: z.string().length(6),
});

export type HallLocationItem = z.infer<typeof HallLocationItem>;

class HallLocation extends API<HallLocationItem> implements HallLocationItem {
  id?: string;
  name!: string;
  hall_id!: string;
  value!: string;

  constructor(public hallLocationItem: HallLocationItem) {
    super("halllocation");
    Object.assign(this, hallLocationItem);
  }

  static async getAll(): Promise<HallLocationItem[] | never> {
    return new API<HallLocationItem>("halllocation").getAll();
  }

  static get(
    name: HallLocationItem["name"]
  ): Promise<HallLocationItem | never> {
    return new API<HallLocationItem>("halllocation").get(name);
  }

  async create(): Promise<HallLocationItem> {
    return super.create(this);
  }

  static generateValue(): string {
    return Math.random().toString(36).slice(2, 8);
  }

  static getUrl(value: string): string {
    return `${window.location.origin}/customer/${value}`;
  }
}

export default HallLocation;
