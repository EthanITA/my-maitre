
alter table dish
    add allergen_id integer[] default array[]::integer[];

alter table dish
    add characteristic_id integer[] default array[]::integer[];
