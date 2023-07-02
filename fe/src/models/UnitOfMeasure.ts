import API from "./Custom/API.ts";

export interface UnitOfMeasureItem {
  id?: number;
  measure: string;
  description: string;
}

class UnitOfMeasure extends API<UnitOfMeasure> implements UnitOfMeasure {
  id?: number;
  measure!: string;
  description!: string;
  constructor(public unitOfMeasureItem: UnitOfMeasureItem) {
    super("unitofmeasure");
    Object.assign(this, unitOfMeasureItem);
  }

  static async getAll(): Promise<UnitOfMeasureItem[] | never> {
    return new API<UnitOfMeasureItem>("unitofmeasure").getAll();
  }

  static get(
    id: NonNullable<UnitOfMeasureItem["id"]>
  ): Promise<UnitOfMeasureItem | never> {
    return new API<UnitOfMeasureItem>("unitofmeasure").get(id);
  }
}

export default UnitOfMeasure;
