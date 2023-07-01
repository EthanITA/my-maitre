import { days, Weekday } from "./Custom/DatetimeTypes";
import API from "./Custom/API";

export const menuTypes = [
  "standard",
  "breakfast",
  "lunch",
  "dinner",
  "roomService",
];

export const visibilities = ["everyday", "weekdays", "days"] as const;

export type MenuAvailability = [string, string] | Weekday[] | string[];

export interface MenuItem {
  id?: number;
  name: string;
  description: string;
  icon: string;
  hide_price: boolean;
  location_id: number;
  order_type: (typeof menuTypes)[number];
  visibility: {
    type?: (typeof visibilities)[number];
    availability?: MenuAvailability;
  };
}

class Menu extends API<MenuItem> implements MenuItem {
  description!: string;
  hide_price!: boolean;
  icon!: string;
  id?: number;
  location_id!: number;
  name!: string;
  order_type!: (typeof menuTypes)[number];
  visibility!: {
    type?: (typeof visibilities)[number];
    availability?: MenuAvailability;
  };

  constructor(public menuItem: MenuItem) {
    super("menus");
    Object.assign(this, menuItem);
  }

  async create(): Promise<MenuItem> {
    return super.create(this);
  }

  static async getAll(): Promise<MenuItem[] | never> {
    return new API<MenuItem>("menus").getAll();
  }

  static get(id: NonNullable<MenuItem["id"]>): Promise<MenuItem | never> {
    return new API<MenuItem>("menus").get(id);
  }

  async delete(): Promise<MenuItem> {
    if (!this.id) throw new Error("No id provided");
    return super.delete(this.id);
  }

  async update(): Promise<MenuItem> {
    if (!this.id) throw new Error("No id provided");
    return super.update(this.id, this);
  }

  static validate(obj: any): boolean {
    const menu = new Menu(obj);
    const result: any[] = [];
    result.push(menu.name);
    result.push(menu.description);
    result.push(menuTypes.includes(menu.order_type));

    // hh:mm
    const isHour = (str?: string | number) =>
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str?.toString() || "");
    const isWeekday = (arr: Weekday[] = []) =>
      arr.every((x) => days.includes(x));
    // yyyy-mm-dd
    const isDate = (str: string) => /^\d{4}-\d{2}-\d{2}$/.test(str);
    const visilityValidation = (visibility: Menu["visibility"]): boolean => {
      if (!visibility || !Object.keys(visibility).length) return true;
      const { type, availability } = visibility;
      if (!visibilities.includes(type as any)) return false;
      if (isHour(availability?.[0]) && isHour(availability?.[1])) return true;
      if (isWeekday(availability as Weekday[])) return true;
      return (availability as string[]).every(isDate);
    };
    result.push(visilityValidation(menu.visibility));
    console.log(result);
    return result.every((x) => x);
  }
}

export default Menu;
