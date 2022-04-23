drop table if exists users cascade;
drop table if exists stocks cascade;
drop table if exists users_stock;
drop table if exists domains_enabled;

create
extension if not exists citext;

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
  domain citext collate "C" not null unique,
  is_enabled bool not null default true
);

insert into domains_enabled (domain) values ('news.google.com');
insert into domains_enabled (domain) values ('lenta.ru');
insert into domains_enabled (domain) values ('www.rbc.ru');
insert into domains_enabled (domain) values ('russian.rt.com');


create table stocks
(
    symbol                citext collate "C" primary key,
    name                  text  not null,
    logo                  text  not null,
    description           text default '',
    website               text  not null,
    country               text  not null,
    exchange              text  not null,
    ipo                   date  not null,
    market_capitalization float not null,
    phone                 text  not null,
    share_outstanding     float not null,
    industry              text  not null
);

create table users_stock
(
    user_id      integer            not null references users (id) on delete cascade,
    stock_symbol citext collate "C" not null references stocks (symbol) on delete cascade,
    count        integer            not null,
    constraint pk_user_id_stock_symbol primary key (user_id, stock_symbol)
);