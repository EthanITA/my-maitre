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
  id: number;
  name: string;
  description: string;
  icon: string;
  hide_price: boolean;
  location_id: number;
  order_type: (typeof menuTypes)[number];
  visibility?: {
    type: (typeof visibilities)[number];
    availability: MenuAvailability;
  };
}

class Menu extends API<MenuItem> implements MenuItem {
  description!: string;
  hide_price!: boolean;
  icon!: string;
  id!: number;
  location_id!: number;
  name!: string;
  order_type!: (typeof menuTypes)[number];
  visibility?: {
    type: (typeof visibilities)[number];
    availability: MenuAvailability;
  };

  constructor(public menuItem: MenuItem) {
    super("menus");
    Object.assign(this, menuItem);
  }

  static validate(obj: any): boolean {
    const menu = new Menu(obj);
    const result: any[] = [];
    result.push(menu.name);
    result.push(menu.description);
    result.push(menuTypes.includes(menu.order_type));

    // hh:mm
    const isHour = (str: string) =>
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str);
    const isWeekday = (arr: Weekday[]) => arr.every(days.includes);
    // yyyy-mm-dd
    const isDate = (str: string) => /^\d{4}-\d{2}-\d{2}$/.test(str);
    const visilityValidation = (visibility: Menu["visibility"]): boolean => {
      if (!visibility) return true;
      const { type, availability } = visibility;
      if (!visibilities.includes(type)) return false;
      if (
        isHour(availability[0] as string) &&
        isHour(availability[1] as string)
      )
        return true;
      if (isWeekday(availability as Weekday[])) return true;
      return (availability as string[]).every(isDate);
    };
    result.push(visilityValidation(menu.visibility));

    return result.every((x) => x);
  }
}

export default Menu;
