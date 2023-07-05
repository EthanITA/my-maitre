
alter table dish
    drop constraint dish_allergen_id_fkey;

alter table dish
    drop column allergen_id;

alter table dish
    drop constraint dish_characteristic_id_fkey;

alter table dish
    drop column characteristic_id;
