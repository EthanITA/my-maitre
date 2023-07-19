import { Weekday } from "./Custom/DatetimeTypes";
import API from "./Custom/API";
import { z } from "zod";

export const menuTypes = [
  "standard",
  "lunch",
  "dinner",
  "roomService",
  "umbrella",
] as const;

export const visibilities = ["everyday", "weekdays", "days"] as const;

export type MenuAvailability = Weekday[] | string[];

export const MenuItem = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
  hide_price: z.boolean().default(false),
  location_id: z.number().optional(),
  type: z.enum(menuTypes).default("standard"),
  visibility: z.object({
    type: z.enum(visibilities),
    availability: z
      .union([z.array(z.number().lte(7).gte(1)), z.array(z.string())])
      .optional(),
  }),
  open_hours: z.object({
    // HH:MM
    start: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .default("00:00"),
    end: z
      .string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .default("23:59"),
  }),
  enabled: z.boolean().default(true),
});

export type MenuItem = z.infer<typeof MenuItem>;

class Menu extends API<MenuItem> implements MenuItem {
  description!: string;
  hide_price!: boolean;
  icon!: string;
  id?: number;
  location_id!: number;
  name!: string;
  type!: (typeof menuTypes)[number];
  visibility!: {
    type: (typeof visibilities)[number];
    availability?: MenuAvailability;
  };
  open_hours!: {
    start: string;
    end: string;
  };
  enabled!: boolean;

  constructor(menuItem: MenuItem) {
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

  async enable(): Promise<MenuItem> {
    if (!this.id) throw new Error("No id provided");
    return this.axios.put(`enable/${this.id}`, { enabled: this.enabled });
  }

  async hidePrice(): Promise<MenuItem> {
    if (!this.id) throw new Error("No id provided");
    return this.axios.put(`hide_price/${this.id}`, {
      hide_price: this.hide_price,
    });
  }

  static validate(obj: Record<any, any>): boolean {
    function isStartBeforeEnd(startTime, endTime) {
      const getDate = (time) => new Date(0, 0, 0, ...time.split(":"));
      return getDate(startTime) < getDate(endTime);
    }
    const isValid = MenuItem.safeParse(obj).success;
    return (
      isValid && isStartBeforeEnd(obj.open_hours.start, obj.open_hours.end)
    );
  }

  static get default() {
    return MenuItem.extend({
      name: z.string().default(""),
      description: z.string().default(""),
    }).default({
      name: "",
      description: "",
      icon: "",
      hide_price: false,
      location_id: 0,
      type: "standard",
      visibility: {
        type: "everyday",
      },
      open_hours: {
        start: "00:00",
        end: "23:59",
      },
      enabled: true,
    });
  }
}

export default Menu;
