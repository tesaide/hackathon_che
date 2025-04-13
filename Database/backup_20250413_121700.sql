--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 - Percona Server for PostgreSQL 17.4.1
-- Dumped by pg_dump version 17.4 - Percona Server for PostgreSQL 17.4.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: feature_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.feature_type_enum AS ENUM (
    'ramp',
    'elevator',
    'call_button',
    'tactile_path',
    'accessible_toilet',
    'parking',
    'entrance',
    'interior',
    'signage',
    'other'
);


ALTER TYPE public.feature_type_enum OWNER TO postgres;

--
-- Name: location_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.location_status_enum AS ENUM (
    'draft',
    'pending',
    'published',
    'rejected'
);


ALTER TYPE public.location_status_enum OWNER TO postgres;

--
-- Name: location_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.location_type_enum AS ENUM (
    'government_building',
    'business',
    'healthcare',
    'education',
    'culture',
    'transport',
    'recreation',
    'other'
);


ALTER TYPE public.location_type_enum OWNER TO postgres;

--
-- Name: moderation_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.moderation_status_enum AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.moderation_status_enum OWNER TO postgres;

--
-- Name: organization_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.organization_type_enum AS ENUM (
    'government',
    'business',
    'ngo'
);


ALTER TYPE public.organization_type_enum OWNER TO postgres;

--
-- Name: verification_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.verification_status_enum AS ENUM (
    'unverified',
    'pending',
    'verified'
);


ALTER TYPE public.verification_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accessibility_features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accessibility_features (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    location_id uuid,
    type character varying(255) NOT NULL,
    subtype character varying(100),
    description text,
    status boolean NOT NULL,
    quality_rating integer,
    standards_compliance boolean,
    created_by uuid,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.accessibility_features OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    action character varying(100) NOT NULL,
    entity_type character varying(50) NOT NULL,
    entity_id uuid,
    details jsonb,
    ip_address character varying(45),
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    id uuid NOT NULL,
    address character varying(500) NOT NULL,
    category character varying(100),
    coder smallint,
    hash integer,
    hash_is_zero boolean,
    value bytea,
    coordinates public.geometry(Point,4326) NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    created_by uuid NOT NULL,
    description text,
    last_verified_at timestamp(6) without time zone NOT NULL,
    name character varying(255) NOT NULL,
    organization_id uuid,
    overall_accessibility_score integer,
    rejection_reason text,
    status character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    working_hours jsonb,
    contacts jsonb,
    CONSTRAINT location_status_check CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'pending'::character varying, 'published'::character varying, 'rejected'::character varying])::text[]))),
    CONSTRAINT location_type_check CHECK (((type)::text = ANY ((ARRAY['government_building'::character varying, 'business'::character varying, 'healthcare'::character varying, 'education'::character varying, 'culture'::character varying, 'transport'::character varying, 'recreation'::character varying, 'other'::character varying])::text[])))
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(500) NOT NULL,
    coordinates public.geometry(Point,4326) NOT NULL,
    type public.location_type_enum NOT NULL,
    category character varying(100),
    description text,
    contacts jsonb,
    working_hours jsonb,
    created_by uuid,
    organization_id uuid,
    status public.location_status_enum DEFAULT 'draft'::public.location_status_enum NOT NULL,
    overall_accessibility_score integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    last_verified_at timestamp without time zone,
    rejection_reason text
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    type character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    link character varying(500),
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    type public.organization_type_enum NOT NULL,
    edrpou character varying(15),
    website character varying(255),
    is_verified boolean DEFAULT false NOT NULL,
    verification_document_url character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photo (
    id uuid NOT NULL,
    ai_accessibility_detection jsonb,
    ai_moderation_score real,
    created_at timestamp(6) without time zone NOT NULL,
    created_by uuid,
    description text,
    feature_id uuid,
    location_id uuid NOT NULL,
    metadata jsonb,
    moderation_status smallint NOT NULL,
    reject_reason text,
    thumbnail_url character varying(500) NOT NULL,
    url character varying(500) NOT NULL,
    CONSTRAINT photo_ai_moderation_score_check CHECK (((ai_moderation_score <= (1)::double precision) AND (ai_moderation_score >= (0)::double precision))),
    CONSTRAINT photo_moderation_status_check CHECK (((moderation_status >= 0) AND (moderation_status <= 2)))
);


ALTER TABLE public.photo OWNER TO postgres;

--
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    location_id uuid,
    feature_id uuid,
    url character varying(500) NOT NULL,
    thumbnail_url character varying(500) NOT NULL,
    description text,
    created_by uuid,
    moderation_status public.moderation_status_enum DEFAULT 'pending'::public.moderation_status_enum NOT NULL,
    ai_moderation_score double precision,
    ai_accessibility_detection jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    reject_reason text,
    metadata jsonb
);


ALTER TABLE public.photos OWNER TO postgres;

--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id uuid NOT NULL,
    accessibility_experience text NOT NULL,
    comment text NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    location_id uuid NOT NULL,
    moderation_status character varying(255) NOT NULL,
    rating integer NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT review_moderation_status_check CHECK (((moderation_status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))),
    CONSTRAINT review_rating_check CHECK (((rating <= 5) AND (rating >= 1)))
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    location_id uuid,
    user_id uuid,
    rating integer NOT NULL,
    comment text,
    accessibility_experience text,
    moderation_status public.moderation_status_enum DEFAULT 'pending'::public.moderation_status_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    permissions jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    phone character varying(20),
    role_id uuid,
    gov_id character varying(255),
    verification_status public.verification_status_enum DEFAULT 'unverified'::public.verification_status_enum NOT NULL,
    avatar_url character varying(255),
    organization_id uuid,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    last_login_at timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    password bytea
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification (
    id uuid NOT NULL,
    comment text NOT NULL,
    create_at timestamp(6) without time zone NOT NULL,
    evidence_photo_id uuid,
    feature_id uuid,
    is_official boolean NOT NULL,
    location_id uuid NOT NULL,
    organization_id uuid,
    status boolean NOT NULL,
    verified_id uuid NOT NULL
);


ALTER TABLE public.verification OWNER TO postgres;

--
-- Name: verifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    location_id uuid,
    feature_id uuid,
    verified_by uuid,
    organization_id uuid,
    status boolean NOT NULL,
    comment text,
    evidence_photo_id uuid,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    is_official boolean DEFAULT false NOT NULL
);


ALTER TABLE public.verifications OWNER TO postgres;

--
-- Data for Name: accessibility_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accessibility_features (id, location_id, type, subtype, description, status, quality_rating, standards_compliance, created_by, created_at, updated_at) FROM stdin;
581b16f7-fe04-4b83-be44-a616d9fd835f	479d899f-a9be-4506-a314-f10867e3e8f0	call_button	\N	\N	t	\N	t	00e44ab2-6259-411b-96ca-380de025150a	2025-04-12 13:07:29.521449	2025-04-12 13:07:29.521449
1f0aa0c9-ccfc-457e-9b4e-821e3a6b23c8	479d899f-a9be-4506-a314-f10867e3e8f0	accessible_toilet	\N	\N	t	\N	t	00e44ab2-6259-411b-96ca-380de025150a	2025-04-12 13:07:29.521449	2025-04-12 13:07:29.521449
a765b190-666e-4dc9-8d64-39db2df8a659	85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb	call_button	\N	\N	t	\N	t	c74f8b4b-81fd-4904-8a5e-026bb2c6538c	2025-04-12 13:07:29.521449	2025-04-12 13:07:29.521449
ba48224a-ad60-477c-a15b-a7e938023ce6	3349f2de-1730-49db-a888-d0560aced177	ramp	\N	\N	f	\N	f	c74f8b4b-81fd-4904-8a5e-026bb2c6538c	2025-04-12 13:07:29.521449	2025-04-12 13:07:29.521449
bfac36a3-9638-474c-ba96-845267857630	85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb	parking	\N	\N	t	\N	t	68fa1eb3-9302-4ab3-9037-463737fb45a7	2025-04-12 13:07:29.521449	2025-04-12 13:07:29.521449
3bbeb94e-caf9-4df0-9d09-db1844bbd24e	3349f2de-1730-49db-a888-d0560aced177	elevator	\N	\N	t	\N	t	68fa1eb3-9302-4ab3-9037-463737fb45a7	2025-04-12 13:07:29.521449	2025-04-12 13:07:29.521449
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (id, user_id, action, entity_type, entity_id, details, ip_address, user_agent, created_at) FROM stdin;
38eea15a-4c3c-40fa-8f31-499fdb869190	c74f8b4b-81fd-4904-8a5e-026bb2c6538c	delete	document 	\N	{"reason": "User request", "doc_name": "contract.pdf"}	172.16.1.23	curl/7.68.0  	2025-04-12 11:32:09.562276
adda61a4-d731-40d1-bfbf-53abbed0fe92	68fa1eb3-9302-4ab3-9037-463737fb45a7	 update_profile	user	\N	{"fields_changed": ["email", "name"]}	10.0.0.5	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)	2025-04-12 11:32:09.562276
1bf4b383-969d-443d-8066-dd0f7d6d248b	00e44ab2-6259-411b-96ca-380de025150a	login 	user	\N	{"success": true}	192.168.0.101	Mozilla/5.0 (Windows NT 10.0; Win64; x64)	2025-04-12 11:32:09.562276
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (id, address, category, coder, hash, hash_is_zero, value, coordinates, created_at, created_by, description, last_verified_at, name, organization_id, overall_accessibility_score, rejection_reason, status, type, updated_at, working_hours, contacts) FROM stdin;
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, name, address, coordinates, type, category, description, contacts, working_hours, created_by, organization_id, status, overall_accessibility_score, created_at, updated_at, last_verified_at, rejection_reason) FROM stdin;
85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb	\\u0415\\u043f\\u0456\\u0446\\u0435\\u043d\\u0442\\u0440	\\u0432\\u0443\\u043b\\u0438\\u0446\\u044f  \\u0428\\u0435\\u0432\\u0447\\u0435\\u043d\\u043a\\u0430, 57, \\u041d\\u043e\\u0432\\u043e\\u0441\\u0435\\u043b\\u0456\\u0432\\u043a\\u0430	0101000020E6100000DAD7CE1D40C34940BE88C49354543F40	business	\N	\N	\N	\N	68fa1eb3-9302-4ab3-9037-463737fb45a7	\N	draft	\N	2025-04-12 12:06:57.21802	2025-04-12 12:06:57.21802	\N	\N
3349f2de-1730-49db-a888-d0560aced177	\\u041e\\u0431\\u043b\\u0430\\u0441\\u043d\\u0430 \\u0430\\u0434\\u043c\\u0456\\u043d\\u0456\\u0441\\u0442\\u0440\\u0430\\u0446\\u0456\\u044f	\\u0432\\u0443\\u043b\\u0438\\u0446\\u044f \\u0428\\u0435\\u0432\\u0447\\u0435\\u043d\\u043a\\u0430, 7, \\u0427\\u0435\\u0440\\u043d\\u0456\\u0433\\u0456\\u0432	0101000020E6100000C4530F58C1BE4940B57151CF5B4C3F40	government_building	\N	\N	\N	\N	68fa1eb3-9302-4ab3-9037-463737fb45a7	\N	draft	\N	2025-04-12 12:06:57.21802	2025-04-12 12:06:57.21802	\N	\N
479d899f-a9be-4506-a314-f10867e3e8f0	\\u041b\\u0456\\u043a\\u0430\\u0440\\u043d\\u044f \\u21162	\\u043f\\u0440\\u043e\\u0441\\u043f\\u0435\\u043a\\u0442 \\u041c\\u0438\\u0445\\u0430\\u0439\\u043b\\u0430 \\u0413\\u0440\\u0443\\u0448\\u0435\\u0432\\u0441\\u044c\\u043a\\u043e\\u0433\\u043e, 168,\\u0427\\u0435\\u0440\\u043d\\u0456\\u0433\\u0456\\u0432	0101000020E610000014E42F853AC2494012AAA3AA304F3F40	healthcare	\N	\N	\N	\N	00e44ab2-6259-411b-96ca-380de025150a	\N	draft	\N	2025-04-12 12:06:57.21802	2025-04-12 12:06:57.21802	\N	\N
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, type, title, message, link, is_read, created_at) FROM stdin;
7d1612da-e4ed-42a0-aa67-7febb1faa7af	\N	system_error	\\u041f\\u043e\\u043c\\u0438\\u043b\\u043a\\u0430 \\u0441\\u0435\\u0440\\u0432\\u0435\\u0440\\u0430 	\\u0412\\u0438\\u043d\\u0438\\u043a\\u043b\\u0430 \\u043f\\u043e\\u043c\\u0438\\u043b\\u043a\\u0430 \\u043f\\u0456\\u0434 \\u0447\\u0430\\u0441 \\u043e\\u0431\\u0440\\u043e\\u0431\\u043a\\u0438 \\u0432\\u0430\\u0448\\u043e\\u0433\\u043e \\u0437\\u0430\\u043f\\u0438\\u0442\\u0443. 	/support 	t	2025-04-12 11:25:13.505412
e9792f56-2626-41b7-9892-d91af512cd27	\N	warning 	\\u0417\\u0430\\u0432\\u0435\\u0440\\u0448\\u0435\\u043d\\u043d\\u044f \\u043f\\u0456\\u0434\\u043f\\u0438\\u0441\\u043a\\u0438 	\\u0422\\u0435\\u0440\\u043c\\u0456\\u043d \\u0432\\u0430\\u0448\\u043e\\u0457 \\u043f\\u0456\\u0434\\u043f\\u0438\\u0441\\u043a\\u0438 \\u0441\\u043f\\u043b\\u0438\\u0432\\u0430\\u0454 \\u0447\\u0435\\u0440\\u0435\\u0437 3 \\u0434\\u043d\\u0456.	/subscription/renew	f	2025-04-12 11:25:13.505412
6ea8bdb5-0960-49b6-8256-d0e17a3738a3	\N	info 	\\u041d\\u043e\\u0432\\u0435 \\u043f\\u043e\\u0432\\u0456\\u0434\\u043e\\u043c\\u043b\\u0435\\u043d\\u043d\\u044f	\\u0423 \\u0432\\u0430\\u0441 \\u043d\\u043e\\u0432\\u0435 \\u043f\\u043e\\u0432\\u0456\\u0434\\u043e\\u043c\\u043b\\u0435\\u043d\\u043d\\u044f \\u0443 \\u0432\\u0445\\u0456\\u0434\\u043d\\u0438\\u0445.	/messages/123	f	2025-04-12 11:25:13.505412
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, name, type, edrpou, website, is_verified, verification_document_url, created_at, updated_at) FROM stdin;
03e6527b-10b8-4400-a8d5-425047e6c144	\\u0422\\u041e\\u0412 "\\u0406\\u043d\\u043d\\u043e\\u0432\\u0430\\u0446\\u0456\\u0439\\u043d\\u0456 \\u0440\\u0456\\u0448\\u0435\\u043d\\u043d\\u044f" 	business	12344568	https://inno-solutions.ua	f	https://docs.ua/verif/inno123.pdf	2025-04-12 13:52:38.253468	2025-04-12 13:52:38.253468
b3900f49-afce-43ce-84c7-13ef2ab12eee	\\u0411\\u0424 "\\u0414\\u043e\\u043f\\u043e\\u043c\\u043e\\u0433\\u0430 \\u043f\\u043e\\u0440\\u0443\\u0447"	ngo	84684522	https://help-now.org.ua	f	https://docs.ua/verif/help987.pdf	2025-04-12 13:52:38.253468	2025-04-12 13:52:38.253468
d28150a5-16a0-47e2-acbf-fe51654d1ec3	\\u041a\\u041f "\\u041c\\u0406\\u0441\\u044c\\u043a\\u0456 \\u0456\\u043d\\u0456\\u0446\\u0456\\u0430\\u0442\\u0438\\u0432\\u0438"	government	54668489	\N	f	\N	2025-04-12 13:52:38.253468	2025-04-12 13:52:38.253468
\.


--
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photo (id, ai_accessibility_detection, ai_moderation_score, created_at, created_by, description, feature_id, location_id, metadata, moderation_status, reject_reason, thumbnail_url, url) FROM stdin;
\.


--
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photos (id, location_id, feature_id, url, thumbnail_url, description, created_by, moderation_status, ai_moderation_score, ai_accessibility_detection, created_at, reject_reason, metadata) FROM stdin;
b9efe387-5000-4101-8420-76c31b691bdf	479d899f-a9be-4506-a314-f10867e3e8f0	1f0aa0c9-ccfc-457e-9b4e-821e3a6b23c8	https://example.com/photos/0a1b2c3d4e5f.jpg	https://example.com/photos/thumbnails/0a1b2c3d4e5f_thumb.jpg	\N	00e44ab2-6259-411b-96ca-380de025150a	pending	\N	\N	2025-04-12 14:33:31.354523	\N	\N
250f8717-2ce0-4d63-bfa8-a0ef6f85ba10	3349f2de-1730-49db-a888-d0560aced177	581b16f7-fe04-4b83-be44-a616d9fd835f	https://cdn.accessibilityhub.org/images/photo_87234_large.jpg	https://cdn.accessibilityhub.org/images/photo_87234_thumb.jpg	\N	c74f8b4b-81fd-4904-8a5e-026bb2c6538c	rejected	\N	\N	2025-04-12 14:33:31.354523	Incorrect data	\N
643d9e1b-7d63-4354-a9ce-f4929237b421	85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb	bfac36a3-9638-474c-ba96-845267857630	https://media.barrierfree.ua/uploads/2025/04/ramp-entry-main.jpg	https://media.barrierfree.ua/uploads/2025/04/ramp-entry-main_thumb.jpg	\N	68fa1eb3-9302-4ab3-9037-463737fb45a7	pending	\N	\N	2025-04-12 14:33:31.354523	\N	\N
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, accessibility_experience, comment, created_at, location_id, moderation_status, rating, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, location_id, user_id, rating, comment, accessibility_experience, moderation_status, created_at, updated_at) FROM stdin;
039f5712-f0d1-4164-9195-48a2a39b5951	85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb	c74f8b4b-81fd-4904-8a5e-026bb2c6538c	1	\\u0414\\u0443\\u0436\\u0435 \\u043f\\u043e\\u0433\\u0430\\u043d\\u0438\\u0439 \\u0434\\u043e\\u0441\\u0442\\u0443\\u043f	\\u0412\\u0445\\u0456\\u0434\\u043d\\u0456 \\u0441\\u0445\\u043e\\u0434\\u0438 \\u0431\\u0435\\u0437 \\u043f\\u0430\\u043d\\u0434\\u0443\\u0441\\u0443, \\u0442\\u0443\\u0430\\u043b\\u0435\\u0442 \\u043d\\u0435\\u0434\\u043e\\u0441\\u0442\\u0443\\u043f\\u043d\\u0438\\u0439	rejected	2025-04-12 12:15:22.892992	2025-04-12 12:15:22.892992
0d192b48-e732-446e-84fa-4216641309a8	479d899f-a9be-4506-a314-f10867e3e8f0	00e44ab2-6259-411b-96ca-380de025150a	3	 \\u0404 \\u043d\\u044e\\u0430\\u043d\\u0441\\u0438 \\u0437 \\u0434\\u043e\\u0441\\u0442\\u0443\\u043f\\u043e\\u043c	\\u041f\\u0430\\u043d\\u0434\\u0443\\u0441 \\u0454, \\u0430\\u043b\\u0435 \\u0434\\u0443\\u0436\\u0435 \\u043a\\u0440\\u0443\\u0442\\u0438\\u0439, \\u0434\\u0432\\u0435\\u0440\\u0456 \\u0432\\u0430\\u0436\\u043a\\u043e \\u0432\\u0456\\u0434\\u0447\\u0438\\u043d\\u0438\\u0442\\u0438	pending	2025-04-12 12:15:22.892992	2025-04-12 12:15:22.892992
3b9ecceb-387f-4f49-9483-7ac2dd184063	3349f2de-1730-49db-a888-d0560aced177	00e44ab2-6259-411b-96ca-380de025150a	5	\\u0427\\u0443\\u0434\\u043e\\u0432\\u0435 \\u043c\\u0456\\u0441\\u0446\\u0435! \\u0420\\u0435\\u043a\\u043e\\u043c\\u0435\\u043d\\u0434\\u0443\\u044e \\u0432\\u0441\\u0456\\u043c 	\\u041f\\u0430\\u043d\\u0434\\u0443\\u0441 \\u0437\\u0440\\u0443\\u0447\\u043d\\u0438\\u0439, \\u0448\\u0438\\u0440\\u043e\\u043a\\u0456 \\u0434\\u0432\\u0435\\u0440\\u0456, \\u0454 \\u043b\\u0456\\u0444\\u0442	approved	2025-04-12 12:15:22.892992	2025-04-12 12:15:22.892992
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, description, permissions, created_at, updated_at) FROM stdin;
82830544-55c2-43de-9725-cd1508965eae	admin	\\u0410\\u0434\\u043c\\u0456\\u043d\\u0456\\u0441\\u0442\\u0440\\u0430\\u0442\\u043e\\u0440 \\u0437 \\u0443\\u0441\\u0456\\u043c\\u0430 \\u043f\\u0440\\u0430\\u0432\\u0430\\u043c\\u0438	{"read": true, "write": true, "delete": true, "manage_users": true}	2025-04-12 13:47:35.505466	2025-04-12 13:47:35.505466
9c4866a1-b893-4736-8f39-ecd382616c9d	viewer	\\u041f\\u0435\\u0440\\u0435\\u0433\\u043b\\u044f\\u0434 \\u0431\\u0435\\u0437 \\u043c\\u043e\\u0436\\u043b\\u0438\\u0432\\u043e\\u0441\\u0442\\u0456 \\u0437\\u043c\\u0456\\u043d	{"read": true, "write": false, "delete": false, "manage_users": false}	2025-04-12 13:47:35.505466	2025-04-12 13:47:35.505466
6a12c5e4-02f9-425c-b590-ff456fdb35df	editor	\\u0420\\u0435\\u0434\\u0430\\u043a\\u0442\\u043e\\u0440 \\u043a\\u043e\\u043d\\u0442\\u0435\\u043d\\u0442\\u0443	{"read": true, "write": true, "delete": false, "manage_users": false}	2025-04-12 13:47:35.505466	2025-04-12 13:47:35.505466
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, full_name, phone, role_id, gov_id, verification_status, avatar_url, organization_id, created_at, updated_at, last_login_at, is_active, password) FROM stdin;
00e44ab2-6259-411b-96ca-380de025150a	iryna.kovalenko@example.net	\\u0406\\u0440\\u0438\\u043d\\u0430 \\u041a\\u043e\\u0432\\u0430\\u043b\\u0435\\u043d\\u043a\\u043e	+380931234567	\N	CC987654	unverified	https://example.net/pic/iryna.jpeg	03e6527b-10b8-4400-a8d5-425047e6c144	2025-04-12 13:56:02.361099	2025-04-12 13:56:02.361099	\N	t	\\xf7fbba6e0636f890e56fbbf3283e524c6fa3204ae298382d624741d0dc6638326e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7
68fa1eb3-9302-4ab3-9037-463737fb45a7	taras.bondarenko@example.org	\\u0422\\u0430\\u0440\\u0430\\u0441 \\u0411\\u043e\\u043d\\u0434\\u0430\\u0440\\u0435\\u043d\\u043a\\u043e	+380671234567	\N	BB654321	verified	https://example.org/images/taras.png	b3900f49-afce-43ce-84c7-13ef2ab12eee	2025-04-12 13:56:02.361099	2025-04-12 13:56:02.361099	\N	t	\\x38567e882369a9af763cb94d78d682081bcb88f94c7a9d85864531553f5fa5a942470897a3f72dd6b89985c3fd42ff9a78102a2f711492122da49530bfd7e133
c74f8b4b-81fd-4904-8a5e-026bb2c6538c	olena.ivchenko@example.com	\\u041e\\u043b\\u0435\\u043d\\u0430 \\u0406\\u0432\\u0447\\u0435\\u043d\\u043a\\u043e	+380501112233\n\n	\N	AE123456	verified	https://example.com/avatars/olena.jpg	d28150a5-16a0-47e2-acbf-fe51654d1ec3	2025-04-12 13:56:02.361099	2025-04-12 13:56:02.361099	\N	t	\\x3d983e0f78973ea9e44fced001b9b88dfe392450eecc02d41ed93e800de2f692efba2a939c61451b7c52b8026b77b6e1190af8576308d871c6379ee544d81d21
71e636ea-b7e2-4bf6-abe7-fab206a7eaf5	test@example.com	User666	\N	\N	\N	unverified	\N	\N	2025-04-13 07:40:06.756668	2025-04-13 07:40:06.756668	\N	t	\\x246172676f6e32696424763d3139246d3d36353533362c743d332c703d3124356138744878774838486d4536683349626d4e773341245355305238506e6d6d3875303547567265633461544d55674e7a534b35747858504a4b394e756d4c757245
e67d725b-3446-43c6-b2e3-f9baf951cf0a	test@exle.com	Useyy666	\N	\N	\N	unverified	\N	\N	2025-04-13 08:42:12.493533	2025-04-13 08:42:12.493533	\N	t	\\x246172676f6e32696424763d3139246d3d36353533362c743d332c703d31246b52754e386d6e39326a2f576859735458656e4e6b51246d3150713631365834586354527230774a46796f766771763866313856427555624e4278432b7666566177
be905e92-8bc3-4d70-956c-f778dd871a16	vasya@dima	VLADIK LOH		\N	\N	unverified	\N	\N	2025-04-13 08:02:43.040884	2025-04-13 11:36:46.220053	\N	t	\\x246172676f6e32696424763d3139246d3d36353533362c743d332c703d312475724c4178436b7766723230313767614938446d49412436314d4659777352623647502f4f736a56583978442b54776c7179317162314853314845394d47335a4955
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification (id, comment, create_at, evidence_photo_id, feature_id, is_official, location_id, organization_id, status, verified_id) FROM stdin;
\.


--
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verifications (id, location_id, feature_id, verified_by, organization_id, status, comment, evidence_photo_id, created_at, is_official) FROM stdin;
2b2c3181-7822-4fd7-8f41-79d049d369c9	479d899f-a9be-4506-a314-f10867e3e8f0	581b16f7-fe04-4b83-be44-a616d9fd835f	68fa1eb3-9302-4ab3-9037-463737fb45a7	b3900f49-afce-43ce-84c7-13ef2ab12eee	f	\\u041f\\u043e\\u0440\\u0443\\u0447\\u0435\\u043d\\u044c \\u0432\\u0456\\u0434\\u0441\\u0443\\u0442\\u043d\\u0456\\u0439	\N	2025-04-12 12:26:08.807848	t
6373a690-7a76-452c-80aa-203228a067bd	85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb	bfac36a3-9638-474c-ba96-845267857630	c74f8b4b-81fd-4904-8a5e-026bb2c6538c	d28150a5-16a0-47e2-acbf-fe51654d1ec3	t	\\u0414\\u043e\\u0441\\u0442\\u0443\\u043f \\u0434\\u043e \\u0442\\u0443\\u0430\\u043b\\u0435\\u0442\\u0443 \\u043f\\u0456\\u0434\\u0442\\u0432\\u0435\\u0440\\u0434\\u0436\\u0435\\u043d\\u043e	b9efe387-5000-4101-8420-76c31b691bdf	2025-04-12 12:26:08.807848	f
96280588-c4fd-4c56-9ab9-2164af14119d	3349f2de-1730-49db-a888-d0560aced177	1f0aa0c9-ccfc-457e-9b4e-821e3a6b23c8	00e44ab2-6259-411b-96ca-380de025150a	03e6527b-10b8-4400-a8d5-425047e6c144	t	\\u041f\\u0430\\u043d\\u0434\\u0443\\u0441 \\u043f\\u0435\\u0440\\u0435\\u0432\\u0456\\u0440\\u0435\\u043d\\u0438\\u0439, \\u0432\\u0456\\u0434\\u043f\\u043e\\u0432\\u0456\\u0434\\u0430\\u0454 \\u043d\\u043e\\u0440\\u043c\\u0430\\u043c	250f8717-2ce0-4d63-bfa8-a0ef6f85ba10	2025-04-12 12:26:08.807848	t
\.


--
-- Name: accessibility_features accessibility_features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accessibility_features
    ADD CONSTRAINT accessibility_features_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_edrpou_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_edrpou_key UNIQUE (edrpou);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);


--
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_gov_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_gov_id_key UNIQUE (gov_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- Name: idx_locations_coordinates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_locations_coordinates ON public.locations USING gist (coordinates);


--
-- Name: audit_logs fk_audit_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: accessibility_features fk_features_created_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accessibility_features
    ADD CONSTRAINT fk_features_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: accessibility_features fk_features_location; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accessibility_features
    ADD CONSTRAINT fk_features_location FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: locations fk_locations_created_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT fk_locations_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: locations fk_locations_organization; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT fk_locations_organization FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notifications fk_notifications_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: photos fk_photos_created_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT fk_photos_created_by FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: photos fk_photos_feature; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT fk_photos_feature FOREIGN KEY (feature_id) REFERENCES public.accessibility_features(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: photos fk_photos_location; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT fk_photos_location FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_location; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_location FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users fk_users_organization; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_organization FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users fk_users_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: verifications fk_verifications_feature; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT fk_verifications_feature FOREIGN KEY (feature_id) REFERENCES public.accessibility_features(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verifications fk_verifications_location; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT fk_verifications_location FOREIGN KEY (location_id) REFERENCES public.locations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verifications fk_verifications_organization; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT fk_verifications_organization FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: verifications fk_verifications_photo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT fk_verifications_photo FOREIGN KEY (evidence_photo_id) REFERENCES public.photos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: verifications fk_verifications_verified_by; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT fk_verifications_verified_by FOREIGN KEY (verified_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

