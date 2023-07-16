import API from "./Custom/API";

export interface MenuTypeItem {
  id: number;
  name: string;
}

class MenuType extends API<MenuType> implements MenuTypeItem {
  id!: number;
  name!: string;

  constructor(menuTypeItem: MenuTypeItem) {
    super("menutypes");
    Object.assign(this, menuTypeItem);
  }

  static async getAll(): Promise<MenuTypeItem[] | never> {
    return new API<MenuTypeItem>("menutypes").getAll();
  }

  static get(
    id: NonNullable<MenuTypeItem["id"]>
  ): Promise<MenuTypeItem | never> {
    return new API<MenuTypeItem>("menutypes").get(id);
  }
}

export default MenuType;
