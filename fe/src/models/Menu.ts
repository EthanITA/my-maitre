import { Weekday } from "./Custom/DatetimeTypes";

export const menuTypes = [
  "standard",
  "breakfast",
  "lunch",
  "dinner",
  "roomService",
];

export const visibilities = ["everyday", "weekdays", "days"] as const;

export type MenuAvailability = [number, number] | Weekday[] | string[];

class Menu {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public icon: string,
    public hide_price: boolean,
    public location_id: number,
    public order_type: string,
    public visibility?: {
      type: (typeof visibilities)[number];
      availability: MenuAvailability;
    }
  ) {}
}

export default Menu;
