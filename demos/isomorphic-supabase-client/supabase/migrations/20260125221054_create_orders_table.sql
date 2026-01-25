create type "public"."order_status" as enum ('pending', 'completed', 'cancelled');

create type "public"."size" as enum ('small', 'medium', 'large');

create sequence "public"."drinks_id_seq";

create sequence "public"."order_drinks_id_seq";

create sequence "public"."orders_id_seq";


  create table "public"."drinks" (
    "id" integer not null default nextval('public.drinks_id_seq'::regclass),
    "name" text not null,
    "base_price" double precision not null
      );



  create table "public"."order_drinks" (
    "id" integer not null default nextval('public.order_drinks_id_seq'::regclass),
    "order_id" integer not null,
    "drink_id" integer not null,
    "size" public.size not null,
    "quantity" integer not null default 1,
    "unit_price" double precision
      );



  create table "public"."orders" (
    "id" integer not null default nextval('public.orders_id_seq'::regclass),
    "name" text not null,
    "status" public.order_status not null default 'pending'::public.order_status,
    "created_at" timestamp with time zone not null default now()
      );


alter sequence "public"."drinks_id_seq" owned by "public"."drinks"."id";

alter sequence "public"."order_drinks_id_seq" owned by "public"."order_drinks"."id";

alter sequence "public"."orders_id_seq" owned by "public"."orders"."id";

CREATE UNIQUE INDEX drinks_pkey ON public.drinks USING btree (id);

CREATE UNIQUE INDEX order_drinks_pkey ON public.order_drinks USING btree (id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

alter table "public"."drinks" add constraint "drinks_pkey" PRIMARY KEY using index "drinks_pkey";

alter table "public"."order_drinks" add constraint "order_drinks_pkey" PRIMARY KEY using index "order_drinks_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."order_drinks" add constraint "order_drinks_drink_id_fkey" FOREIGN KEY (drink_id) REFERENCES public.drinks(id) ON DELETE CASCADE not valid;

alter table "public"."order_drinks" validate constraint "order_drinks_drink_id_fkey";

alter table "public"."order_drinks" add constraint "order_drinks_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE not valid;

alter table "public"."order_drinks" validate constraint "order_drinks_order_id_fkey";

alter table "public"."order_drinks" add constraint "order_drinks_quantity_check" CHECK ((quantity > 0)) not valid;

alter table "public"."order_drinks" validate constraint "order_drinks_quantity_check";

grant delete on table "public"."drinks" to "anon";

grant insert on table "public"."drinks" to "anon";

grant references on table "public"."drinks" to "anon";

grant select on table "public"."drinks" to "anon";

grant trigger on table "public"."drinks" to "anon";

grant truncate on table "public"."drinks" to "anon";

grant update on table "public"."drinks" to "anon";

grant delete on table "public"."drinks" to "authenticated";

grant insert on table "public"."drinks" to "authenticated";

grant references on table "public"."drinks" to "authenticated";

grant select on table "public"."drinks" to "authenticated";

grant trigger on table "public"."drinks" to "authenticated";

grant truncate on table "public"."drinks" to "authenticated";

grant update on table "public"."drinks" to "authenticated";

grant delete on table "public"."drinks" to "service_role";

grant insert on table "public"."drinks" to "service_role";

grant references on table "public"."drinks" to "service_role";

grant select on table "public"."drinks" to "service_role";

grant trigger on table "public"."drinks" to "service_role";

grant truncate on table "public"."drinks" to "service_role";

grant update on table "public"."drinks" to "service_role";

grant delete on table "public"."order_drinks" to "anon";

grant insert on table "public"."order_drinks" to "anon";

grant references on table "public"."order_drinks" to "anon";

grant select on table "public"."order_drinks" to "anon";

grant trigger on table "public"."order_drinks" to "anon";

grant truncate on table "public"."order_drinks" to "anon";

grant update on table "public"."order_drinks" to "anon";

grant delete on table "public"."order_drinks" to "authenticated";

grant insert on table "public"."order_drinks" to "authenticated";

grant references on table "public"."order_drinks" to "authenticated";

grant select on table "public"."order_drinks" to "authenticated";

grant trigger on table "public"."order_drinks" to "authenticated";

grant truncate on table "public"."order_drinks" to "authenticated";

grant update on table "public"."order_drinks" to "authenticated";

grant delete on table "public"."order_drinks" to "service_role";

grant insert on table "public"."order_drinks" to "service_role";

grant references on table "public"."order_drinks" to "service_role";

grant select on table "public"."order_drinks" to "service_role";

grant trigger on table "public"."order_drinks" to "service_role";

grant truncate on table "public"."order_drinks" to "service_role";

grant update on table "public"."order_drinks" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";


