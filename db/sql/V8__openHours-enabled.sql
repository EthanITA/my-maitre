alter table menus
    add enabled boolean default true;

alter table menus
    add open_hours jsonb default '{}';

