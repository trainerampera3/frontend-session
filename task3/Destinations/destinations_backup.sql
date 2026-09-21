--
-- PostgreSQL database dump
--

\restrict YhGE6kG0WKb1mtBbrrlcIcvkpoaFSwLpO2P23Wq2NKUjdXmk7Ugk095LOJsfg6f

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
-- Name: destinations1; Type: TABLE; Schema: public; Owner: pushpa
--

CREATE TABLE public.destinations1 (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    description text,
    best_time character varying(100),
    average_cost numeric(10,2),
    image_url text
);


ALTER TABLE public.destinations1 OWNER TO pushpa;

--
-- Name: destinations1_id_seq; Type: SEQUENCE; Schema: public; Owner: pushpa
--

CREATE SEQUENCE public.destinations1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.destinations1_id_seq OWNER TO pushpa;

--
-- Name: destinations1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pushpa
--

ALTER SEQUENCE public.destinations1_id_seq OWNED BY public.destinations1.id;


--
-- Name: destinations1 id; Type: DEFAULT; Schema: public; Owner: pushpa
--

ALTER TABLE ONLY public.destinations1 ALTER COLUMN id SET DEFAULT nextval('public.destinations1_id_seq'::regclass);


--
-- Data for Name: destinations1; Type: TABLE DATA; Schema: public; Owner: pushpa
--

COPY public.destinations1 (id, name, country, category, description, best_time, average_cost, image_url) FROM stdin;
1	Bali	Indonesia	Beach	A tropical destination known for beaches, temples and rice terraces.	April - October	800.00	https://images.unsplash.com/photo-1537996194471-e657df975ab4
2	Paris	France	City	A famous city known for the Eiffel Tower, museums and architecture.	April - June	1200.00	https://images.unsplash.com/photo-1502602898657-3e91760cbb34
3	Dubai	UAE	Luxury	A modern city known for skyscrapers, shopping and desert experiences.	November - March	1000.00	https://images.unsplash.com/photo-1512453979798-5ea266f8880c
4	Switzerland	Switzerland	Mountain	A scenic destination famous for the Alps, lakes and mountain landscapes.	June - September	1500.00	https://images.unsplash.com/photo-1501785888041-af3ef285b470
5	Tokyo	Japan	City	A vibrant city combining modern technology and traditional culture.	March - May	1100.00	https://images.unsplash.com/photo-1540959733332-eab4deabeeaf
6	Maldives	Maldives	Island	An island destination famous for clear blue water and coral reefs.	November - April	1400.00	https://images.unsplash.com/photo-1514282401047-d79a71a590e8
\.


--
-- Name: destinations1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pushpa
--

SELECT pg_catalog.setval('public.destinations1_id_seq', 6, true);


--
-- Name: destinations1 destinations1_pkey; Type: CONSTRAINT; Schema: public; Owner: pushpa
--

ALTER TABLE ONLY public.destinations1
    ADD CONSTRAINT destinations1_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict YhGE6kG0WKb1mtBbrrlcIcvkpoaFSwLpO2P23Wq2NKUjdXmk7Ugk095LOJsfg6f

