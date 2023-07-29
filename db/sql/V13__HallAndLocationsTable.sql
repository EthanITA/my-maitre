CREATE TABLE hall
(
    name VARCHAR(255) PRIMARY KEY
);

insert into hall (name)
values ('Standard'),
       ('Servizio in camera'),
       ('Spiaggia');

CREATE TABLE hallLocation
(
    id      VARCHAR(6) unique not null,
    name    VARCHAR(255) NOT NULL,
    hall_id VARCHAR      NOT NULL REFERENCES hall (name),
    UNIQUE (name, hall_id)
);