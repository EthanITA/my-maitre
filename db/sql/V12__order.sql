alter table "Order"
    drop column order_type;

alter table "Order"
    drop column location_id;

alter table "Order"
    add column order_type text default 'standard' not null;

alter table "Order"
    drop column order_details;

alter table "Order"
    add column order_details jsonb[] default array[]::jsonb[] not null;