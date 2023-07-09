import API from "./Custom/API.ts";

export interface CharacteristicItem {
  id?: number;
  name: string;
  icon: string;
}

class Characteristic extends API<Characteristic> implements CharacteristicItem {
  id?: number;
  name!: string;
  icon!: string;

  constructor(public characteristicItem: CharacteristicItem) {
    super("characteristic");
    Object.assign(this, characteristicItem);
  }

  static async getAll(): Promise<CharacteristicItem[] | never> {
    return new API<CharacteristicItem>("characteristic").getAll();
  }

  static get(
    id: NonNullable<CharacteristicItem["id"]>
  ): Promise<CharacteristicItem | never> {
    return new API<CharacteristicItem>("characteristic").get(id);
  }
}

export default Characteristic;
