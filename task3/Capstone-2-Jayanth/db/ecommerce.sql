--
-- PostgreSQL database dump
--

\restrict cRSpN5Uvqao8Bq097UdqV4HvCdgzSqmJUCs6w51r6q2GH9gHc3LydiprnHgnQqC

-- Dumped from database version 17.11 (Ubuntu 17.11-1.pgdg24.04+2)
-- Dumped by pg_dump version 17.11 (Ubuntu 17.11-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customer_address; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customer_address (
    customer_address_id bigint NOT NULL,
    customer_id bigint NOT NULL,
    address_type character varying(20) NOT NULL,
    address_line1 character varying(255) NOT NULL,
    address_line2 character varying(255),
    city character varying(100),
    state character varying(100),
    postal_code character varying(20),
    country character varying(100),
    is_default boolean DEFAULT false NOT NULL,
    CONSTRAINT customer_address_address_type_check CHECK (((address_type)::text = ANY ((ARRAY['billing'::character varying, 'shipping'::character varying])::text[])))
);


--
-- Name: customer_address_customer_address_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customer_address_customer_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customer_address_customer_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customer_address_customer_address_id_seq OWNED BY public.customer_address.customer_address_id;


--
-- Name: customer_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customer_group (
    customer_group_id integer NOT NULL,
    name character varying(100) NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    CONSTRAINT customer_group_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


--
-- Name: customer_group_customer_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customer_group_customer_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customer_group_customer_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customer_group_customer_group_id_seq OWNED BY public.customer_group.customer_group_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    customer_id bigint NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(30),
    password text NOT NULL,
    gender character varying(20),
    age integer,
    customer_group_id bigint,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT customers_age_check CHECK ((age >= 0)),
    CONSTRAINT customers_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: discounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.discounts (
    discount_id bigint NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    prod_ids jsonb,
    discount_type character varying(30) NOT NULL,
    percentage numeric(5,2),
    coupon_code character varying(100),
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_discount_dates CHECK ((end_date >= start_date)),
    CONSTRAINT discounts_discount_type_check CHECK (((discount_type)::text = ANY ((ARRAY['percentage'::character varying, 'fixed'::character varying, 'coupon'::character varying])::text[]))),
    CONSTRAINT discounts_percentage_check CHECK (((percentage >= (0)::numeric) AND (percentage <= (100)::numeric))),
    CONSTRAINT discounts_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


--
-- Name: discounts_discount_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.discounts_discount_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: discounts_discount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.discounts_discount_id_seq OWNED BY public.discounts.discount_id;


--
-- Name: order_billing; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_billing (
    order_billing_id bigint NOT NULL,
    order_id bigint NOT NULL,
    name character varying(150),
    phone character varying(30),
    address_line1 character varying(255) NOT NULL,
    address_line2 character varying(255),
    city character varying(100),
    state character varying(100),
    postal_code character varying(20),
    country character varying(100)
);


--
-- Name: order_billing_order_billing_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_billing_order_billing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_billing_order_billing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_billing_order_billing_id_seq OWNED BY public.order_billing.order_billing_id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    order_item_id bigint NOT NULL,
    order_id bigint NOT NULL,
    prod_id bigint NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(12,2) NOT NULL,
    sub_total numeric(12,2) NOT NULL,
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0)),
    CONSTRAINT order_items_sub_total_check CHECK ((sub_total >= (0)::numeric)),
    CONSTRAINT order_items_unit_price_check CHECK ((unit_price >= (0)::numeric))
);


--
-- Name: order_items_order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_items_order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_order_item_id_seq OWNED BY public.order_items.order_item_id;


--
-- Name: order_shipping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_shipping (
    order_shipping_id bigint NOT NULL,
    order_id bigint NOT NULL,
    name character varying(150),
    phone character varying(30),
    address_line1 character varying(255) NOT NULL,
    address_line2 character varying(255),
    city character varying(100),
    state character varying(100),
    postal_code character varying(20),
    country character varying(100),
    shipping_method character varying(100),
    shipping_cost numeric(12,2) DEFAULT 0 NOT NULL,
    tracking_number character varying(150),
    status character varying(30)
);


--
-- Name: order_shipping_order_shipping_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_shipping_order_shipping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_shipping_order_shipping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_shipping_order_shipping_id_seq OWNED BY public.order_shipping.order_shipping_id;


--
-- Name: order_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_transactions (
    order_transaction_id bigint NOT NULL,
    order_id bigint NOT NULL,
    transaction_id character varying(150) NOT NULL,
    amount numeric(12,2) NOT NULL,
    status character varying(30) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT order_transactions_amount_check CHECK ((amount >= (0)::numeric))
);


--
-- Name: order_transactions_order_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_transactions_order_transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_transactions_order_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_transactions_order_transaction_id_seq OWNED BY public.order_transactions.order_transaction_id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    order_id bigint NOT NULL,
    customer_id bigint NOT NULL,
    store_id bigint,
    base_price numeric(12,2) DEFAULT 0 NOT NULL,
    sub_total numeric(12,2) DEFAULT 0 NOT NULL,
    tax numeric(12,2) DEFAULT 0 NOT NULL,
    grand_total numeric(12,2) DEFAULT 0 NOT NULL,
    discount numeric(12,2) DEFAULT 0 NOT NULL,
    payment_type character varying(50),
    status character varying(30) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_order_amounts CHECK (((base_price >= (0)::numeric) AND (sub_total >= (0)::numeric) AND (tax >= (0)::numeric) AND (grand_total >= (0)::numeric) AND (discount >= (0)::numeric)))
);


--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: product_inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_inventory (
    prod_inv_id bigint NOT NULL,
    prod_id bigint NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    store_id bigint NOT NULL,
    CONSTRAINT product_inventory_quantity_check CHECK ((quantity >= 0))
);


--
-- Name: product_inventory_prod_inv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_inventory_prod_inv_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_inventory_prod_inv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_inventory_prod_inv_id_seq OWNED BY public.product_inventory.prod_inv_id;


--
-- Name: product_price; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_price (
    prod_price_id bigint NOT NULL,
    prod_id bigint NOT NULL,
    price numeric(12,2) NOT NULL,
    store_id bigint NOT NULL,
    CONSTRAINT product_price_price_check CHECK ((price >= (0)::numeric))
);


--
-- Name: product_price_prod_price_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_price_prod_price_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_price_prod_price_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_price_prod_price_id_seq OWNED BY public.product_price.prod_price_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    prod_id bigint NOT NULL,
    name character varying(200) NOT NULL,
    short_desc text,
    description text,
    specifications jsonb,
    additional_data jsonb,
    image_title character varying(255),
    image_url text,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT products_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


--
-- Name: products_prod_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_prod_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_prod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_prod_id_seq OWNED BY public.products.prod_id;


--
-- Name: stores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stores (
    store_id bigint NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    location character varying(255),
    email character varying(255),
    phone character varying(30),
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT stores_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


--
-- Name: stores_store_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stores_store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stores_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stores_store_id_seq OWNED BY public.stores.store_id;


--
-- Name: customer_address customer_address_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_address ALTER COLUMN customer_address_id SET DEFAULT nextval('public.customer_address_customer_address_id_seq'::regclass);


--
-- Name: customer_group customer_group_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_group ALTER COLUMN customer_group_id SET DEFAULT nextval('public.customer_group_customer_group_id_seq'::regclass);


--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- Name: discounts discount_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discounts ALTER COLUMN discount_id SET DEFAULT nextval('public.discounts_discount_id_seq'::regclass);


--
-- Name: order_billing order_billing_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_billing ALTER COLUMN order_billing_id SET DEFAULT nextval('public.order_billing_order_billing_id_seq'::regclass);


--
-- Name: order_items order_item_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items ALTER COLUMN order_item_id SET DEFAULT nextval('public.order_items_order_item_id_seq'::regclass);


--
-- Name: order_shipping order_shipping_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_shipping ALTER COLUMN order_shipping_id SET DEFAULT nextval('public.order_shipping_order_shipping_id_seq'::regclass);


--
-- Name: order_transactions order_transaction_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_transactions ALTER COLUMN order_transaction_id SET DEFAULT nextval('public.order_transactions_order_transaction_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: product_inventory prod_inv_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_inventory ALTER COLUMN prod_inv_id SET DEFAULT nextval('public.product_inventory_prod_inv_id_seq'::regclass);


--
-- Name: product_price prod_price_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price ALTER COLUMN prod_price_id SET DEFAULT nextval('public.product_price_prod_price_id_seq'::regclass);


--
-- Name: products prod_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN prod_id SET DEFAULT nextval('public.products_prod_id_seq'::regclass);


--
-- Name: stores store_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores ALTER COLUMN store_id SET DEFAULT nextval('public.stores_store_id_seq'::regclass);


--
-- Data for Name: customer_address; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customer_address (customer_address_id, customer_id, address_type, address_line1, address_line2, city, state, postal_code, country, is_default) FROM stdin;
1	1	billing	11 MG Road	Suite 101	Bengaluru	Karnataka	560001	India	t
4	1	billing	12 MG Road	Near Central Mall	Chennai	Tamil Nadu	600001	India	t
5	2	shipping	45 Gandhi Street	\N	Chennai	Tamil Nadu	600040	India	t
6	3	billing	22 IT Park Road	Block A	Bangalore	Karnataka	560001	India	t
7	4	shipping	18 Lake View Road	\N	Hyderabad	Telangana	500001	India	t
8	5	billing	90 Business Road	Floor 3	Mumbai	Maharashtra	400001	India	t
9	6	shipping	15 Temple Street	\N	Coimbatore	Tamil Nadu	641001	India	t
10	7	billing	33 Park Avenue	\N	Delhi	Delhi	110001	India	t
11	8	shipping	77 Tech Street	Suite 202	Pune	Maharashtra	411001	India	t
12	9	billing	10 Market Road	\N	Kochi	Kerala	682001	India	t
13	10	shipping	55 Main Street	\N	Chennai	Tamil Nadu	600028	India	t
\.


--
-- Data for Name: customer_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customer_group (customer_group_id, name, status) FROM stdin;
1	Customer Group 1	active
2	Premium	active
3	Regular	active
4	VIP	active
5	Corporate	active
6	New Customers	active
7	Students	active
8	Wholesale	active
9	Inactive Group	inactive
10	Online Customers	active
11	Local Customers	active
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (customer_id, name, email, phone, password, gender, age, customer_group_id, status, created_at, updated_at) FROM stdin;
1	Customer 1	customer.1@example.test	9000000001	seed_password_1	Male	22	1	active	2026-08-25 11:04:55.36046	2026-08-25 11:04:55.36046
2	Arun Kumar	arun@gmail.com	9876543210	pass123	Male	28	1	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
3	Priya Sharma	priya@gmail.com	9876543211	pass123	Female	25	2	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
4	Rahul Singh	rahul@gmail.com	9876543212	pass123	Male	32	3	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
5	Sneha Reddy	sneha@gmail.com	9876543213	pass123	Female	29	1	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
6	Vikram Patel	vikram@gmail.com	9876543214	pass123	Male	41	4	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
7	Anjali Nair	anjali@gmail.com	9876543215	pass123	Female	23	6	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
8	Karthik Rao	karthik@gmail.com	9876543216	pass123	Male	35	7	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
9	Divya Menon	divya@gmail.com	9876543217	pass123	Female	30	9	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
10	Suresh Babu	suresh@gmail.com	9876543218	pass123	Male	45	10	active	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
11	Meena Iyer	meena@gmail.com	9876543219	pass123	Female	38	2	inactive	2026-09-11 15:17:58.799636	2026-09-11 15:17:58.799636
\.


--
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.discounts (discount_id, name, description, prod_ids, discount_type, percentage, coupon_code, start_date, end_date, status, created_at, updated_at) FROM stdin;
1	Discount 1	Discount for testing	[1]	percentage	6.00	SYNTH001	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
2	Discount 2	Discount for testing	[null]	percentage	7.00	SYNTH002	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
3	Discount 3	Discount for testing	[null]	percentage	8.00	SYNTH003	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
4	Discount 4	Discount for testing	[null]	percentage	9.00	SYNTH004	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
5	Discount 5	Discount for testing	[null]	percentage	5.00	SYNTH005	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
6	Discount 6	Discount for testing	[null]	percentage	6.00	SYNTH006	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
7	Discount 7	Discount for testing	[null]	percentage	7.00	SYNTH007	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
8	Discount 8	Discount for testing	[null]	percentage	8.00	SYNTH008	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
9	Discount 9	Discount for testing	[null]	percentage	9.00	SYNTH009	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
10	Discount 10	Discount for testing	[null]	percentage	5.00	SYNTH010	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	inactive	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
11	Discount 11	Discount for testing	[null]	percentage	6.00	SYNTH011	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
12	Discount 12	Discount for testing	[null]	percentage	7.00	SYNTH012	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
13	Discount 13	Discount for testing	[null]	percentage	8.00	SYNTH013	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
14	Discount 14	Discount for testing	[null]	percentage	9.00	SYNTH014	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
15	Discount 15	Discount for testing	[null]	percentage	5.00	SYNTH015	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
16	Discount 16	Discount for testing	[null]	percentage	6.00	SYNTH016	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
17	Discount 17	Discount for testing	[null]	percentage	7.00	SYNTH017	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
18	Discount 18	Discount for testing	[null]	percentage	8.00	SYNTH018	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
19	Discount 19	Discount for testing	[null]	percentage	9.00	SYNTH019	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
20	Discount 20	Discount for testing	[null]	percentage	5.00	SYNTH020	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	inactive	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
21	Discount 21	Discount for testing	[null]	percentage	6.00	SYNTH021	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
22	Discount 22	Discount for testing	[null]	percentage	7.00	SYNTH022	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
23	Discount 23	Discount for testing	[null]	percentage	8.00	SYNTH023	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
24	Discount 24	Discount for testing	[null]	percentage	9.00	SYNTH024	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
25	Discount 25	Discount for testing	[null]	percentage	5.00	SYNTH025	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
26	Discount 26	Discount for testing	[null]	percentage	6.00	SYNTH026	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
27	Discount 27	Discount for testing	[null]	percentage	7.00	SYNTH027	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
28	Discount 28	Discount for testing	[null]	percentage	8.00	SYNTH028	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
29	Discount 29	Discount for testing	[null]	percentage	9.00	SYNTH029	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
30	Discount 30	Discount for testing	[null]	percentage	5.00	SYNTH030	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	inactive	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
31	Discount 31	Discount for testing	[null]	percentage	6.00	SYNTH031	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
32	Discount 32	Discount for testing	[null]	percentage	7.00	SYNTH032	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
33	Discount 33	Discount for testing	[null]	percentage	8.00	SYNTH033	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
34	Discount 34	Discount for testing	[null]	percentage	9.00	SYNTH034	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
35	Discount 35	Discount for testing	[null]	percentage	5.00	SYNTH035	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
36	Discount 36	Discount for testing	[null]	percentage	6.00	SYNTH036	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
37	Discount 37	Discount for testing	[null]	percentage	7.00	SYNTH037	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
38	Discount 38	Discount for testing	[null]	percentage	8.00	SYNTH038	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
39	Discount 39	Discount for testing	[null]	percentage	9.00	SYNTH039	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
40	Discount 40	Discount for testing	[null]	percentage	5.00	SYNTH040	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	inactive	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
41	Discount 41	Discount for testing	[null]	percentage	6.00	SYNTH041	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
42	Discount 42	Discount for testing	[null]	percentage	7.00	SYNTH042	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
43	Discount 43	Discount for testing	[null]	percentage	8.00	SYNTH043	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
44	Discount 44	Discount for testing	[null]	percentage	9.00	SYNTH044	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
45	Discount 45	Discount for testing	[null]	percentage	5.00	SYNTH045	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
46	Discount 46	Discount for testing	[null]	percentage	6.00	SYNTH046	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
47	Discount 47	Discount for testing	[null]	percentage	7.00	SYNTH047	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
48	Discount 48	Discount for testing	[null]	percentage	8.00	SYNTH048	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
49	Discount 49	Discount for testing	[null]	percentage	9.00	SYNTH049	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	active	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
50	Discount 50	Discount for testing	[null]	percentage	5.00	SYNTH050	2026-08-19 11:04:55.36046	2026-09-25 11:04:55.36046	inactive	2026-08-26 11:04:55.36046	2026-08-26 11:04:55.36046
51	Laptop Sale	Laptop discount	[1]	percentage	10.00	LAP10	2026-09-01 00:00:00	2026-09-30 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
52	Mouse Offer	Mouse discount	[2]	percentage	15.00	MOUSE15	2026-09-01 00:00:00	2026-09-30 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
53	Keyboard Sale	Keyboard offer	[3]	percentage	20.00	KEY20	2026-09-01 00:00:00	2026-10-15 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
54	Monitor Deal	Monitor discount	[4]	percentage	8.00	MON8	2026-09-01 00:00:00	2026-09-20 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
55	Hub Offer	USB hub discount	[5]	percentage	12.00	HUB12	2026-09-01 00:00:00	2026-09-30 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
56	Audio Sale	Headphone discount	[6]	percentage	18.00	AUDIO18	2026-09-01 00:00:00	2026-10-01 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
57	Webcam Deal	Webcam offer	[7]	percentage	10.00	CAM10	2026-09-01 00:00:00	2026-09-30 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
58	Chair Sale	Gaming chair offer	[8]	percentage	25.00	CHAIR25	2026-09-01 00:00:00	2026-10-30 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
59	SSD Offer	SSD discount	[9]	percentage	7.00	SSD7	2026-09-01 00:00:00	2026-09-25 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
60	Watch Sale	Smart watch offer	[10]	percentage	15.00	WATCH15	2026-09-01 00:00:00	2026-09-30 00:00:00	active	2026-09-11 15:24:31.401062	2026-09-11 15:24:31.401062
\.


--
-- Data for Name: order_billing; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_billing (order_billing_id, order_id, name, phone, address_line1, address_line2, city, state, postal_code, country) FROM stdin;
3	1	Arun Kumar	9876543210	12 MG Road	Near Central Mall	Chennai	Tamil Nadu	600001	India
4	2	Priya Sharma	9876543211	45 Gandhi Street	\N	Chennai	Tamil Nadu	600040	India
5	3	Rahul Singh	9876543212	22 IT Park Road	Block A	Bangalore	Karnataka	560001	India
6	4	Sneha Reddy	9876543213	18 Lake View Road	\N	Hyderabad	Telangana	500001	India
7	5	Vikram Patel	9876543214	90 Business Road	Floor 3	Mumbai	Maharashtra	400001	India
8	6	Anjali Nair	9876543215	15 Temple Street	\N	Coimbatore	Tamil Nadu	641001	India
9	7	Karthik Rao	9876543216	33 Park Avenue	\N	Delhi	Delhi	110001	India
10	8	Divya Menon	9876543217	77 Tech Street	Suite 202	Pune	Maharashtra	411001	India
11	9	Suresh Babu	9876543218	10 Market Road	\N	Kochi	Kerala	682001	India
12	10	Meena Iyer	9876543219	55 Main Street	\N	Chennai	Tamil Nadu	600028	India
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (order_item_id, order_id, prod_id, quantity, unit_price, sub_total) FROM stdin;
1	1	1	2	1125.00	2250.00
12	1	1	1	74999.00	74999.00
13	2	2	1	1299.00	1299.00
14	3	3	1	3499.00	3499.00
15	4	4	1	22999.00	22999.00
16	5	5	2	2499.00	4998.00
17	6	6	1	5999.00	5999.00
18	7	7	2	3999.00	7998.00
19	8	8	1	14999.00	14999.00
20	9	9	1	8999.00	8999.00
21	10	10	1	6999.00	6999.00
\.


--
-- Data for Name: order_shipping; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_shipping (order_shipping_id, order_id, name, phone, address_line1, address_line2, city, state, postal_code, country, shipping_method, shipping_cost, tracking_number, status) FROM stdin;
3	1	Arun Kumar	9876543210	12 MG Road	Near Central Mall	Chennai	Tamil Nadu	600001	India	Express	150.00	TRK10001	delivered
4	2	Priya Sharma	9876543211	45 Gandhi Street	\N	Chennai	Tamil Nadu	600040	India	Standard	80.00	TRK10002	delivered
5	3	Rahul Singh	9876543212	22 IT Park Road	Block A	Bangalore	Karnataka	560001	India	Standard	100.00	TRK10003	delivered
6	4	Sneha Reddy	9876543213	18 Lake View Road	\N	Hyderabad	Telangana	500001	India	Express	200.00	TRK10004	shipped
7	5	Vikram Patel	9876543214	90 Business Road	Floor 3	Mumbai	Maharashtra	400001	India	Standard	100.00	TRK10005	delivered
8	6	Anjali Nair	9876543215	15 Temple Street	\N	Coimbatore	Tamil Nadu	641001	India	Standard	80.00	TRK10006	pending
9	7	Karthik Rao	9876543216	33 Park Avenue	\N	Delhi	Delhi	110001	India	Express	180.00	TRK10007	delivered
10	8	Divya Menon	9876543217	77 Tech Street	Suite 202	Pune	Maharashtra	411001	India	Standard	120.00	TRK10008	shipped
11	9	Suresh Babu	9876543218	10 Market Road	\N	Kochi	Kerala	682001	India	Express	150.00	TRK10009	delivered
12	10	Meena Iyer	9876543219	55 Main Street	\N	Chennai	Tamil Nadu	600028	India	Standard	80.00	TRK10010	cancelled
\.


--
-- Data for Name: order_transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_transactions (order_transaction_id, order_id, transaction_id, amount, status, created_at) FROM stdin;
1	1	string	0.00	Completed	2026-08-26 10:04:55.36046
2	1	TXN10001	81749.00	success	2026-09-11 15:48:43.295257
3	2	TXN10002	1533.00	success	2026-09-11 15:48:43.295257
4	3	TXN10003	4129.00	success	2026-09-11 15:48:43.295257
5	4	TXN10004	27139.00	success	2026-09-11 15:48:43.295257
6	5	TXN10005	5898.00	success	2026-09-11 15:48:43.295257
7	6	TXN10006	7079.00	pending	2026-09-11 15:48:43.295257
8	7	TXN10007	9438.00	success	2026-09-11 15:48:43.295257
9	8	TXN10008	17699.00	success	2026-09-11 15:48:43.295257
10	9	TXN10009	10619.00	success	2026-09-11 15:48:43.295257
11	10	TXN10010	8259.00	failed	2026-09-11 15:48:43.295257
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (order_id, customer_id, store_id, base_price, sub_total, tax, grand_total, discount, payment_type, status, created_at, updated_at) FROM stdin;
2	1	1	1125.00	1125.00	202.50	1327.50	0.00	card	completed	2026-08-26 10:04:55.36046	2026-08-26 10:04:55.36046
3	1	1	1125.00	1125.00	202.50	1327.50	0.00	card	completed	2026-08-26 10:04:55.36046	2026-08-26 10:04:55.36046
4	1	1	1125.00	1125.00	202.50	1327.50	0.00	card	completed	2026-08-26 10:04:55.36046	2026-08-26 10:04:55.36046
5	1	1	1230.00	2345.00	245.00	12334.00	90.00	UPI	completed	2026-09-03 18:28:19.85	2026-09-03 22:01:11.803954
1	1	1	0.00	0.00	0.00	0.00	0.00	card	failed	2026-08-26 10:04:55.36046	2026-09-04 10:51:11.938944
6	11	1	74999.00	74999.00	13500.00	81749.00	6750.00	UPI	completed	2026-09-11 15:41:20.675501	2026-09-11 15:41:20.675501
7	6	3	5999.00	5999.00	1080.00	7079.00	0.00	UPI	pending	2026-09-11 15:41:20.675501	2026-09-11 15:41:20.675501
8	7	4	3999.00	7998.00	1440.00	9438.00	0.00	CARD	completed	2026-09-11 15:41:20.675501	2026-09-11 15:41:20.675501
9	8	4	14999.00	14999.00	2700.00	17699.00	0.00	UPI	shipped	2026-09-11 15:41:20.675501	2026-09-11 15:41:20.675501
10	9	5	8999.00	8999.00	1620.00	10619.00	0.00	CARD	completed	2026-09-11 15:41:20.675501	2026-09-11 15:41:20.675501
11	10	5	6999.00	6999.00	1260.00	8259.00	0.00	UPI	cancelled	2026-09-11 15:41:20.675501	2026-09-11 15:41:20.675501
\.


--
-- Data for Name: product_inventory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_inventory (prod_inv_id, prod_id, quantity, store_id) FROM stdin;
1	1	28	1
3	2	100	1
4	3	60	2
5	4	30	2
6	5	75	3
7	6	40	3
8	7	55	4
9	8	20	4
10	9	35	5
11	10	45	5
\.


--
-- Data for Name: product_price; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product_price (prod_price_id, prod_id, price, store_id) FROM stdin;
1	1	1125.00	1
2	1	74999.00	1
3	2	1299.00	1
4	3	3499.00	2
5	4	22999.00	2
6	5	2499.00	3
7	6	5999.00	3
8	7	3999.00	4
9	8	14999.00	4
10	9	8999.00	5
11	10	6999.00	5
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (prod_id, name, short_desc, description, specifications, additional_data, image_title, image_url, status, created_at, updated_at) FROM stdin;
1	Product 1	Product for testing	Ecommerce product number 1	{"model": "SYN-001", "warranty_months": 12}	{"brand": "OpenCart Labs", "color": "Silver"}	Product 1	https://example.test/products/product-1.jpg	active	2026-08-25 11:04:55.36046	2026-08-25 11:04:55.36046
2	Laptop Pro 14	14 inch laptop	High performance laptop	{"ram": "16GB", "storage": "512GB SSD"}	{"brand": "TechPro"}	Laptop Pro 14	https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
3	Wireless Mouse	Ergonomic mouse	Wireless optical mouse	{"dpi": "1600", "battery": "AA"}	{"brand": "LogiTech"}	Wireless Mouse	https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
4	Mechanical Keyboard	RGB keyboard	Mechanical gaming keyboard	{"layout": "US", "switch": "Blue"}	{"brand": "KeyMaster"}	Mechanical Keyboard	https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
5	27 Inch Monitor	Full HD monitor	27 inch IPS monitor	{"refresh": "75Hz", "resolution": "1920x1080"}	{"brand": "ViewTech"}	27 Inch Monitor	https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
6	USB-C Hub	Multi-port hub	USB-C hub with HDMI and USB ports	{"hdmi": "4K", "ports": "6"}	{"brand": "ConnectX"}	USB-C Hub	https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
7	Bluetooth Headphones	Wireless headphones	Noise reduction headphones	{"battery": "30 hours", "bluetooth": "5.3"}	{"brand": "SoundMax"}	Bluetooth Headphones	https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
8	Webcam HD	1080p webcam	Full HD webcam for meetings	{"fps": "30", "resolution": "1080p"}	{"brand": "VisionCam"}	Webcam HD	https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
9	Gaming Chair	Ergonomic chair	Adjustable gaming chair	{"recline": "135", "material": "Leather"}	{"brand": "ComfortPro"}	Gaming Chair	https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
10	External SSD	Portable SSD	High-speed external SSD	{"capacity": "1TB", "interface": "USB-C"}	{"brand": "DataFast"}	External SSD	https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
11	Smart Watch	Fitness smartwatch	Smartwatch with health tracking	{"battery": "7 days", "display": "AMOLED"}	{"brand": "FitTime"}	Smart Watch	https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop	active	2026-09-11 15:20:43.351256	2026-09-11 15:20:43.351256
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.stores (store_id, name, description, location, email, phone, status, created_at, updated_at) FROM stdin;
1	Store Branch 1	Seed store branch 1	Market District 1	store.1@example.test	9100000001	active	2026-08-25 11:04:55.36046	2026-08-25 11:04:55.36046
2	Chennai Central	Main Chennai store	Chennai	central@shop.com	9000000001	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
3	Anna Nagar Store	Anna Nagar branch	Anna Nagar	annanagar@shop.com	9000000002	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
4	T Nagar Store	T Nagar branch	T Nagar	tnagar@shop.com	9000000003	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
5	Bangalore Central	Main Bangalore store	Bangalore	blr@shop.com	9000000004	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
6	Hyderabad Store	Hyderabad branch	Hyderabad	hyd@shop.com	9000000005	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
7	Mumbai Store	Mumbai branch	Mumbai	mum@shop.com	9000000006	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
8	Delhi Store	Delhi branch	Delhi	delhi@shop.com	9000000007	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
9	Coimbatore Store	Coimbatore branch	Coimbatore	cbe@shop.com	9000000008	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
10	Pune Store	Pune branch	Pune	pune@shop.com	9000000009	active	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
11	Kochi Store	Kochi branch	Kochi	kochi@shop.com	9000000010	inactive	2026-09-11 15:18:17.564514	2026-09-11 15:18:17.564514
\.


--
-- Name: customer_address_customer_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customer_address_customer_address_id_seq', 13, true);


--
-- Name: customer_group_customer_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customer_group_customer_group_id_seq', 11, true);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 11, true);


--
-- Name: discounts_discount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.discounts_discount_id_seq', 60, true);


--
-- Name: order_billing_order_billing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_billing_order_billing_id_seq', 12, true);


--
-- Name: order_items_order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_order_item_id_seq', 21, true);


--
-- Name: order_shipping_order_shipping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_shipping_order_shipping_id_seq', 12, true);


--
-- Name: order_transactions_order_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_transactions_order_transaction_id_seq', 11, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 21, true);


--
-- Name: product_inventory_prod_inv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_inventory_prod_inv_id_seq', 11, true);


--
-- Name: product_price_prod_price_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_price_prod_price_id_seq', 11, true);


--
-- Name: products_prod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_prod_id_seq', 11, true);


--
-- Name: stores_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stores_store_id_seq', 11, true);


--
-- Name: customer_address customer_address_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (customer_address_id);


--
-- Name: customer_group customer_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_group
    ADD CONSTRAINT customer_group_pkey PRIMARY KEY (customer_group_id);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: discounts discounts_coupon_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_coupon_code_key UNIQUE (coupon_code);


--
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (discount_id);


--
-- Name: order_billing order_billing_order_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_billing
    ADD CONSTRAINT order_billing_order_id_key UNIQUE (order_id);


--
-- Name: order_billing order_billing_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_billing
    ADD CONSTRAINT order_billing_pkey PRIMARY KEY (order_billing_id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id);


--
-- Name: order_shipping order_shipping_order_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_shipping
    ADD CONSTRAINT order_shipping_order_id_key UNIQUE (order_id);


--
-- Name: order_shipping order_shipping_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_shipping
    ADD CONSTRAINT order_shipping_pkey PRIMARY KEY (order_shipping_id);


--
-- Name: order_transactions order_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_transactions
    ADD CONSTRAINT order_transactions_pkey PRIMARY KEY (order_transaction_id);


--
-- Name: order_transactions order_transactions_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_transactions
    ADD CONSTRAINT order_transactions_transaction_id_key UNIQUE (transaction_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: product_inventory product_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_inventory
    ADD CONSTRAINT product_inventory_pkey PRIMARY KEY (prod_inv_id);


--
-- Name: product_price product_price_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT product_price_pkey PRIMARY KEY (prod_price_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (prod_id);


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (store_id);


--
-- Name: product_inventory uq_product_store_inventory; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_inventory
    ADD CONSTRAINT uq_product_store_inventory UNIQUE (prod_id, store_id);


--
-- Name: order_billing fk_billing_order; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_billing
    ADD CONSTRAINT fk_billing_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: customer_address fk_customer_address_customer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT fk_customer_address_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;


--
-- Name: customers fk_customer_group; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT fk_customer_group FOREIGN KEY (customer_group_id) REFERENCES public.customer_group(customer_group_id);


--
-- Name: product_inventory fk_inventory_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_inventory
    ADD CONSTRAINT fk_inventory_product FOREIGN KEY (prod_id) REFERENCES public.products(prod_id) ON DELETE CASCADE;


--
-- Name: product_inventory fk_inventory_store; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_inventory
    ADD CONSTRAINT fk_inventory_store FOREIGN KEY (store_id) REFERENCES public.stores(store_id) ON DELETE CASCADE;


--
-- Name: orders fk_order_customer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);


--
-- Name: order_items fk_order_item_order; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_item_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_item_product FOREIGN KEY (prod_id) REFERENCES public.products(prod_id);


--
-- Name: orders fk_order_store; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_store FOREIGN KEY (store_id) REFERENCES public.stores(store_id);


--
-- Name: product_price fk_price_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT fk_price_product FOREIGN KEY (prod_id) REFERENCES public.products(prod_id) ON DELETE CASCADE;


--
-- Name: product_price fk_price_store; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT fk_price_store FOREIGN KEY (store_id) REFERENCES public.stores(store_id) ON DELETE CASCADE;


--
-- Name: order_shipping fk_shipping_order; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_shipping
    ADD CONSTRAINT fk_shipping_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- Name: order_transactions fk_transaction_order; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_transactions
    ADD CONSTRAINT fk_transaction_order FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict cRSpN5Uvqao8Bq097UdqV4HvCdgzSqmJUCs6w51r6q2GH9gHc3LydiprnHgnQqC

