CREATE TABLE hall
(
    name VARCHAR(255) PRIMARY KEY
);

insert into hall (name)
values ('standard'),
       ('lunch'),
       ('dinner'),
       ('roomService'),
       ('umbrella');

CREATE TABLE hallLocation
(
    id      VARCHAR(6) PRIMARY KEY,
    name    VARCHAR(255) NOT NULL,
    hall_id VARCHAR      NOT NULL REFERENCES hall (name),
    UNIQUE (name, hall_id)
);