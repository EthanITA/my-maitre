import API from "./Custom/API.ts";

export interface AllergenItem {
  id?: number;
  name: string;
  icon: string;
}

class Allergen extends API<Allergen> implements AllergenItem {
  id?: number;
  name!: string;
  icon!: string;

  constructor(public allergenItem: AllergenItem) {
    super("allergen");
    Object.assign(this, allergenItem);
  }

  static async getAll(): Promise<AllergenItem[] | never> {
    return new API<AllergenItem>("allergen").getAll();
  }

  static get(
    id: NonNullable<AllergenItem["id"]>
  ): Promise<AllergenItem | never> {
    return new API<AllergenItem>("allergen").get(id);
  }
}

export default Allergen;
