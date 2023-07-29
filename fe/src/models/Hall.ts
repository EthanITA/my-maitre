import API from "./Custom/API";

export interface HallItem {
  name: string;
}

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
}

export default Hall;
