/**
 * CREATE TABLE Menus (
 *     id SERIAL PRIMARY KEY,
 *     name TEXT NOT NULL,
 *     description TEXT,
 *     icon VARCHAR(255),
 *     hide_price BOOLEAN DEFAULT FALSE,
 *     visibility BOOLEAN DEFAULT TRUE,
 *     available_hours JSONB,
 *     available_dates DATE[],
 *     location_id INT REFERENCES Location(id),
 *     order_type INT REFERENCES OrderTypes(id)
 * );
 */

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
