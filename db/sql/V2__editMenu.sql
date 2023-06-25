alter table menus
    drop column visibility;

alter table menus
    drop column available_hours;

alter table menus
    drop column available_dates;

alter table menus
    drop column order_type;

alter table menus
    add visibility jsonb;

alter table menus
    drop column location_id;

