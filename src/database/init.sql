drop table if exists users cascade;
drop table if exists domains_enabled cascade;
drop table if exists currency_cost cascade;
drop table if exists currency_info cascade;

create extension if not exists citext;

create table users
(
    id         serial primary key,
    email      citext collate "C" not null unique,
    first_name text               not null,
    last_name  text               not null,
    password   text               not null,
    balance    float default 0
);

create table domains_enabled
(
    domain     citext collate "C" not null unique,
    is_enabled bool               not null default true
);

insert into domains_enabled (domain)
values ('news.google.com');
insert into domains_enabled (domain)
values ('lenta.ru');
insert into domains_enabled (domain)
values ('www.rbc.ru');
insert into domains_enabled (domain)
values ('russian.rt.com');

create table currency_info
(
    currency_code citext collate "C" not null unique,
    name          text               not null,
    symbol        text               not null,
    country_code  text               not null,
    country_name  text               not null
);

create table currency_cost
(
    base_code      citext collate "C" not null references currency_info (currency_code) on delete cascade,
    code           citext collate "C" not null references currency_info (currency_code) on delete cascade,
    cost           float              not null,
    change         float              not null,
    percent_change float              not null
);

create table users_currencies
(
    user_id integer            not null references users (id) on delete cascade,
    code    citext collate "C" not null references currency_info (currency_code) on delete cascade,
    count   float              not null,
    constraint pk_user_id_stock_symbol primary key (user_id, code)
);