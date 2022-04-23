drop table if exists users cascade;
drop table if exists domains_enabled;

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
