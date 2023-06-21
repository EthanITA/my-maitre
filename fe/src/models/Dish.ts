class Dish {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public category_id: number,
    public price: number,
    public unit_of_measure_id: number,
    public image: string,
    public allergen_id: number,
    public characteristic_id: number
  ) {}
}
