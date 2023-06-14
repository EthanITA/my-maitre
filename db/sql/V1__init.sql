CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    vat VARCHAR(255),
    company VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    cap VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE LocationType (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Language (
    id SERIAL PRIMARY KEY,
    language VARCHAR(255) NOT NULL,
    language_code VARCHAR(255) NOT NULL
);

CREATE TABLE Location (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    cap VARCHAR(255),
    phone_number VARCHAR(255),
    website VARCHAR(255),
    email VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    whatsapp VARCHAR(255),
    image VARCHAR(255),
    type INTEGER REFERENCES LocationType(id),
    open_hours JSONB,
    languages INTEGER REFERENCES Language(id)
);


CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255)
);

CREATE TABLE UnitOfMeasure (
    id SERIAL PRIMARY KEY,
    measure VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Allergen (
    id SERIAL PRIMARY KEY,
    allergen VARCHAR(255) NOT NULL,
    icon VARCHAR(255)
);

CREATE TABLE Characteristic (
    id SERIAL PRIMARY KEY,
    characteristic VARCHAR(255) NOT NULL,
    icon VARCHAR(255)
);

CREATE TABLE Dish (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES Category(id),
    price DECIMAL(10,2),
    unit_of_measure_id INTEGER REFERENCES UnitOfMeasure(id),
    image VARCHAR(255),
    allergen_id INTEGER REFERENCES Allergen(id),
    characteristic_id INTEGER REFERENCES Characteristic(id)
);

CREATE TABLE OrderTypes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password VARCHAR(255),
    notes TEXT,
    details JSONB
);

CREATE TABLE Menus (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    hide_price BOOLEAN DEFAULT FALSE,
    visibility BOOLEAN DEFAULT TRUE,
    available_hours JSONB,
    available_dates DATE[],
    location_id INT REFERENCES Location(id),
    order_type INT REFERENCES OrderTypes(id)
);

CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES Menus(id),
    timestamp timestamp,
    date DATE,
    order_type INTEGER REFERENCES OrderTypes(id),
    location_id INTEGER REFERENCES Location(id),
    spot VARCHAR(255),
    order_details JSONB,
    notes TEXT,
    status TEXT
);