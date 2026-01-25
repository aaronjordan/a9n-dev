create type size as enum ('small', 'medium', 'large');
create type order_status as enum ('pending', 'completed', 'cancelled');

-- drink: mocha latte, $4.50
create table drinks (
    "id" serial primary key,
    "name" text not null,
    "base_price" float not null
);

-- order: arthur, pending, 5 minutes ago
create table orders (
    "id" serial primary key,
    "name" text not null,
    "status" order_status not null default 'pending',
    "created_at" timestamptz not null default now()
);

-- order_drinks:
--   on order(name: arthur),
--   1x medium drink(name: mocha latte),
--   arthur paid $5.00
create table order_drinks (
    "id" serial primary key,
    "order_id" int not null references orders on delete cascade,
    "drink_id" int not null references drinks on delete cascade,
    "size" size not null,
    "quantity" int not null default 1 check (quantity > 0),
    "unit_price" float
);
