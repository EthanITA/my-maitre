export const menuTypes = [
  "standard",
  "breakfast",
  "lunch",
  "dinner",
  "roomService",
];

export const visibilities = ["everyday", "days", "dates"];

class Menu {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public icon: string,
    public hide_price: boolean,
    public visibility: boolean,
    public available_hours: any, // JSONB type
    public available_dates: Date[],
    public location_id: number,
    public order_type: number
  ) {}
}

export default Menu;
