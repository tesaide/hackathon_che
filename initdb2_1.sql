--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 - Percona Server for PostgreSQL 17.4.1
-- Dumped by pg_dump version 17.1

-- Started on 2025-04-13 14:08:50

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

DROP DATABASE geo_db;
--
-- TOC entry 4490 (class 1262 OID 19649)
-- Name: geo_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE geo_db WITH TEMPLATE = template0 ENCODING = 'SQL_ASCII' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE geo_db OWNER TO postgres;

\connect geo_db

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
-- TOC entry 2 (class 3079 OID 19961)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4491 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 3 (class 3079 OID 19998)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 4492 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- TOC entry 1661 (class 1247 OID 21086)
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
-- TOC entry 1658 (class 1247 OID 21076)
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
-- TOC entry 1655 (class 1247 OID 21058)
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
-- TOC entry 1664 (class 1247 OID 21108)
-- Name: moderation_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.moderation_status_enum AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.moderation_status_enum OWNER TO postgres;

--
-- TOC entry 1652 (class 1247 OID 21050)
-- Name: organization_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.organization_type_enum AS ENUM (
    'government',
    'business',
    'ngo'
);


ALTER TYPE public.organization_type_enum OWNER TO postgres;

--
-- TOC entry 1649 (class 1247 OID 21043)
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
-- TOC entry 228 (class 1259 OID 21184)
-- Name: accessibility_features; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: accessibility_features (особливості доступності об'єктів)
CREATE TABLE public.accessibility_features (
    id uuid DEFAULT gen_random_uuid() NOT NULL,  -- Унікальний ID, генерується автоматично
    location_id uuid,                            -- ID локації, до якої належить ця особливість
    type public.feature_type_enum NOT NULL,      -- Тип особливості (наприклад, пандус, ліфт) з enum'у
    subtype character varying(100),              -- Підтип (детальніший опис типу)
    description text,                            -- Текстовий опис особливості
    status boolean NOT NULL,                     -- Статус: чи працює (true) чи ні (false)
    quality_rating integer,                      -- Оцінка якості (число, наприклад, 4 з 5)
    standards_compliance boolean,                -- Відповідає стандартам доступності (true/false)
    created_by uuid,                             -- ID користувача, який додав цю особливість
    created_at timestamp without time zone DEFAULT now() NOT NULL, -- Дата створення (автоматично "зараз")
    updated_at timestamp without time zone DEFAULT now() NOT NULL  -- Дата останнього оновлення (також автоматично)
);


ALTER TABLE public.accessibility_features OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 21301)
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: audit_logs (журнал дій користувачів)
CREATE TABLE public.audit_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,     -- Унікальний ID запису в журналі
    user_id uuid,                                   -- ID користувача, який виконав дію
    action character varying(100) NOT NULL,         -- Назва дії (наприклад, "оновлення")
    entity_type character varying(50) NOT NULL,     -- Тип об'єкта, до якого застосована дія
    entity_id uuid,                                 -- ID цього об'єкта
    details jsonb,                                  -- Деталі дії у форматі JSON
    ip_address character varying(45),               -- IP-адреса користувача
    user_agent text,                                -- Інформація про браузер/пристрій
    created_at timestamp without time zone DEFAULT now() NOT NULL  -- Час виконання дії
);


ALTER TABLE public.audit_logs OWNER TO postgres;


--
-- TOC entry 227 (class 1259 OID 21162)
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: locations (локації)
CREATE TABLE public.locations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,                  -- Унікальний ID локації
    name character varying(255) NOT NULL,                        -- Назва локації
    address character varying(500) NOT NULL,                     -- Адреса
    coordinates public.geometry(Point,4326) NOT NULL,            -- Географічні координати (широта/довгота)
    type public.location_type_enum NOT NULL,                     -- Тип локації (enum)
    category character varying(100),                             -- Категорія (наприклад, «медична», «освітня»)
    description text,                                            -- Опис локації
    contacts jsonb,                                              -- Контактна інформація у форматі JSON
    working_hours jsonb,                                         -- Години роботи (у JSON)
    created_by uuid,                                             -- Хто створив запис
    organization_id uuid,                                        -- До якої організації належить
    status public.location_status_enum DEFAULT 'draft'::public.location_status_enum NOT NULL,  -- Статус (наприклад, чернетка)
    overall_accessibility_score integer,                         -- Загальна оцінка доступності
    created_at timestamp without time zone DEFAULT now() NOT NULL, -- Дата створення
    updated_at timestamp without time zone DEFAULT now() NOT NULL, -- Дата останнього оновлення
    last_verified_at timestamp without time zone,                -- Остання дата перевірки
    rejection_reason text                                        -- Причина відмови (якщо було відхилено)
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 21286)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: notifications (сповіщення)
CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID сповіщення
    user_id uuid,                                            -- Кому надіслано (ID користувача)
    type character varying(50) NOT NULL,                     -- Тип сповіщення (наприклад, "системне", "особисте")
    title character varying(255) NOT NULL,                   -- Заголовок сповіщення
    message text NOT NULL,                                   -- Повний текст повідомлення
    link character varying(500),                             -- Посилання, якщо є
    is_read boolean DEFAULT false NOT NULL,                  -- Чи було прочитано (за замовчуванням ні)
    created_at timestamp without time zone DEFAULT now() NOT NULL  -- Коли було створено
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 21127)
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: organizations (організації)
CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID організації
    name character varying(255) NOT NULL,                    -- Назва
    type public.organization_type_enum NOT NULL,             -- Тип організації (enum)
    edrpou character varying(15),                            -- ЄДРПОУ (ідентифікаційний код)
    website character varying(255),                          -- Сайт організації
    is_verified boolean DEFAULT false NOT NULL,              -- Чи підтверджена організація
    verification_document_url character varying(255),        -- Посилання на документ підтвердження
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.organizations OWNER TO postgres;


--
-- TOC entry 229 (class 1259 OID 21204)
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: photos (фото)
CREATE TABLE public.photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID фото
    location_id uuid,                                        -- До якої локації належить фото
    feature_id uuid,                                         -- До якої особливості належить
    url character varying(500) NOT NULL,                     -- Посилання на повне зображення
    thumbnail_url character varying(500) NOT NULL,           -- Посилання на мініатюру
    description text,                                        -- Опис фото
    created_by uuid,                                         -- Хто завантажив
    moderation_status public.moderation_status_enum DEFAULT 'pending'::public.moderation_status_enum NOT NULL, -- Статус модерації
    ai_moderation_score double precision,                    -- Оцінка ШІ щодо прийнятності
    ai_accessibility_detection jsonb,                        -- Виявлення об'єктів доступності ШІ
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    reject_reason text,                                      -- Причина відхилення (якщо є)
    metadata jsonb                                           -- Додаткова технічна інформація
);

ALTER TABLE public.photos OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 21264)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: reviews (відгуки)
CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID відгуку
    location_id uuid,                                        -- ID локації, на яку написано відгук
    user_id uuid,                                            -- Хто написав
    rating integer NOT NULL,                                 -- Оцінка (1–5)
    comment text,                                            -- Коментар
    accessibility_experience text,                           -- Досвід користування з точки зору доступності
    moderation_status public.moderation_status_enum DEFAULT 'pending'::public.moderation_status_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5))) -- Перевірка: оцінка тільки від 1 до 5
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 21115)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: roles (ролі)
CREATE TABLE public.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID ролі
    name character varying(50) NOT NULL,                     -- Назва ролі (наприклад, "адмін")
    description text,                                        -- Опис ролі
    permissions jsonb,                                       -- Перелік прав у форматі JSON
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 21138)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: users (користувачі)
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID користувача
    email character varying(255) NOT NULL,                   -- Електронна пошта
    full_name character varying(255) NOT NULL,               -- Повне ім’я
    phone character varying(20),                             -- Номер телефону
    role_id uuid,                                            -- Роль користувача
    gov_id character varying(255),                           -- Документ, що посвідчує особу
    verification_status public.verification_status_enum DEFAULT 'unverified'::public.verification_status_enum NOT NULL, -- Статус верифікації
    avatar_url character varying(255),                       -- URL аватарки
    organization_id uuid,                                    -- Належність до організації
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    last_login_at timestamp without time zone,               -- Останній вхід
    is_active boolean DEFAULT true NOT NULL,                 -- Чи активний користувач
    password bytea                                           -- Захешований пароль
);

ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 21229)
-- Name: verifications; Type: TABLE; Schema: public; Owner: postgres
--

-- Таблиця: verifications (верифікація даних)
CREATE TABLE public.verifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,              -- Унікальний ID верифікації
    location_id uuid,                                        -- Яку локацію перевіряли
    feature_id uuid,                                         -- Яку особливість
    verified_by uuid,                                        -- Хто перевірив
    organization_id uuid,                                    -- Яку організацію представляє
    status boolean NOT NULL,                                 -- Результат перевірки (true/false)
    comment text,                                            -- Коментар до перевірки
    evidence_photo_id uuid,                                  -- Фото-доказ
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    is_official boolean DEFAULT false NOT NULL               -- Чи є перевірка офіційною
);


ALTER TABLE public.verifications OWNER TO postgres;

--
-- TOC entry 4475 (class 0 OID 21184)
-- Dependencies: 228
-- Data for Name: accessibility_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.accessibility_features VALUES ('581b16f7-fe04-4b83-be44-a616d9fd835f', '479d899f-a9be-4506-a314-f10867e3e8f0', 'call_button', NULL, NULL, true, NULL, true, '00e44ab2-6259-411b-96ca-380de025150a', '2025-04-12 13:07:29.521449', '2025-04-12 13:07:29.521449');
INSERT INTO public.accessibility_features VALUES ('1f0aa0c9-ccfc-457e-9b4e-821e3a6b23c8', '479d899f-a9be-4506-a314-f10867e3e8f0', 'accessible_toilet', NULL, NULL, true, NULL, true, '00e44ab2-6259-411b-96ca-380de025150a', '2025-04-12 13:07:29.521449', '2025-04-12 13:07:29.521449');
INSERT INTO public.accessibility_features VALUES ('a765b190-666e-4dc9-8d64-39db2df8a659', '85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb', 'call_button', NULL, NULL, true, NULL, true, 'c74f8b4b-81fd-4904-8a5e-026bb2c6538c', '2025-04-12 13:07:29.521449', '2025-04-12 13:07:29.521449');
INSERT INTO public.accessibility_features VALUES ('ba48224a-ad60-477c-a15b-a7e938023ce6', '3349f2de-1730-49db-a888-d0560aced177', 'ramp', NULL, NULL, false, NULL, false, 'c74f8b4b-81fd-4904-8a5e-026bb2c6538c', '2025-04-12 13:07:29.521449', '2025-04-12 13:07:29.521449');
INSERT INTO public.accessibility_features VALUES ('bfac36a3-9638-474c-ba96-845267857630', '85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb', 'parking', NULL, NULL, true, NULL, true, '68fa1eb3-9302-4ab3-9037-463737fb45a7', '2025-04-12 13:07:29.521449', '2025-04-12 13:07:29.521449');
INSERT INTO public.accessibility_features VALUES ('3bbeb94e-caf9-4df0-9d09-db1844bbd24e', '3349f2de-1730-49db-a888-d0560aced177', 'elevator', NULL, NULL, true, NULL, true, '68fa1eb3-9302-4ab3-9037-463737fb45a7', '2025-04-12 13:07:29.521449', '2025-04-12 13:07:29.521449');


--
-- TOC entry 4480 (class 0 OID 21301)
-- Dependencies: 233
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.audit_logs VALUES ('38eea15a-4c3c-40fa-8f31-499fdb869190', 'c74f8b4b-81fd-4904-8a5e-026bb2c6538c', 'delete', 'document ', NULL, '{"reason": "User request", "doc_name": "contract.pdf"}', '172.16.1.23', 'curl/7.68.0  ', '2025-04-12 11:32:09.562276');
INSERT INTO public.audit_logs VALUES ('adda61a4-d731-40d1-bfbf-53abbed0fe92', '68fa1eb3-9302-4ab3-9037-463737fb45a7', ' update_profile', 'user', NULL, '{"fields_changed": ["email", "name"]}', '10.0.0.5', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', '2025-04-12 11:32:09.562276');
INSERT INTO public.audit_logs VALUES ('1bf4b383-969d-443d-8066-dd0f7d6d248b', '00e44ab2-6259-411b-96ca-380de025150a', 'login ', 'user', NULL, '{"success": true}', '192.168.0.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '2025-04-12 11:32:09.562276');


--
-- TOC entry 4481 (class 0 OID 21329)
-- Dependencies: 234
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4474 (class 0 OID 21162)
-- Dependencies: 227
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.locations VALUES ('85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb', '\u0415\u043f\u0456\u0446\u0435\u043d\u0442\u0440', '\u0432\u0443\u043b\u0438\u0446\u044f  \u0428\u0435\u0432\u0447\u0435\u043d\u043a\u0430, 57, \u041d\u043e\u0432\u043e\u0441\u0435\u043b\u0456\u0432\u043a\u0430', '0101000020E6100000DAD7CE1D40C34940BE88C49354543F40', 'business', NULL, NULL, NULL, NULL, '68fa1eb3-9302-4ab3-9037-463737fb45a7', NULL, 'draft', NULL, '2025-04-12 12:06:57.21802', '2025-04-12 12:06:57.21802', NULL, NULL);
INSERT INTO public.locations VALUES ('3349f2de-1730-49db-a888-d0560aced177', '\u041e\u0431\u043b\u0430\u0441\u043d\u0430 \u0430\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u044f', '\u0432\u0443\u043b\u0438\u0446\u044f \u0428\u0435\u0432\u0447\u0435\u043d\u043a\u0430, 7, \u0427\u0435\u0440\u043d\u0456\u0433\u0456\u0432', '0101000020E6100000C4530F58C1BE4940B57151CF5B4C3F40', 'government_building', NULL, NULL, NULL, NULL, '68fa1eb3-9302-4ab3-9037-463737fb45a7', NULL, 'draft', NULL, '2025-04-12 12:06:57.21802', '2025-04-12 12:06:57.21802', NULL, NULL);
INSERT INTO public.locations VALUES ('479d899f-a9be-4506-a314-f10867e3e8f0', '\u041b\u0456\u043a\u0430\u0440\u043d\u044f \u21162', '\u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 \u041c\u0438\u0445\u0430\u0439\u043b\u0430 \u0413\u0440\u0443\u0448\u0435\u0432\u0441\u044c\u043a\u043e\u0433\u043e, 168,\u0427\u0435\u0440\u043d\u0456\u0433\u0456\u0432', '0101000020E610000014E42F853AC2494012AAA3AA304F3F40', 'healthcare', NULL, NULL, NULL, NULL, '00e44ab2-6259-411b-96ca-380de025150a', NULL, 'draft', NULL, '2025-04-12 12:06:57.21802', '2025-04-12 12:06:57.21802', NULL, NULL);


--
-- TOC entry 4479 (class 0 OID 21286)
-- Dependencies: 232
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notifications VALUES ('7d1612da-e4ed-42a0-aa67-7febb1faa7af', NULL, 'system_error', '\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 ', '\u0412\u0438\u043d\u0438\u043a\u043b\u0430 \u043f\u043e\u043c\u0438\u043b\u043a\u0430 \u043f\u0456\u0434 \u0447\u0430\u0441 \u043e\u0431\u0440\u043e\u0431\u043a\u0438 \u0432\u0430\u0448\u043e\u0433\u043e \u0437\u0430\u043f\u0438\u0442\u0443. ', '/support ', true, '2025-04-12 11:25:13.505412');
INSERT INTO public.notifications VALUES ('e9792f56-2626-41b7-9892-d91af512cd27', NULL, 'warning ', '\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044f \u043f\u0456\u0434\u043f\u0438\u0441\u043a\u0438 ', '\u0422\u0435\u0440\u043c\u0456\u043d \u0432\u0430\u0448\u043e\u0457 \u043f\u0456\u0434\u043f\u0438\u0441\u043a\u0438 \u0441\u043f\u043b\u0438\u0432\u0430\u0454 \u0447\u0435\u0440\u0435\u0437 3 \u0434\u043d\u0456.', '/subscription/renew', false, '2025-04-12 11:25:13.505412');
INSERT INTO public.notifications VALUES ('6ea8bdb5-0960-49b6-8256-d0e17a3738a3', NULL, 'info ', '\u041d\u043e\u0432\u0435 \u043f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f', '\u0423 \u0432\u0430\u0441 \u043d\u043e\u0432\u0435 \u043f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f \u0443 \u0432\u0445\u0456\u0434\u043d\u0438\u0445.', '/messages/123', false, '2025-04-12 11:25:13.505412');


--
-- TOC entry 4472 (class 0 OID 21127)
-- Dependencies: 225
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.organizations VALUES ('03e6527b-10b8-4400-a8d5-425047e6c144', '\u0422\u041e\u0412 "\u0406\u043d\u043d\u043e\u0432\u0430\u0446\u0456\u0439\u043d\u0456 \u0440\u0456\u0448\u0435\u043d\u043d\u044f" ', 'business', '12344568', 'https://inno-solutions.ua', false, 'https://docs.ua/verif/inno123.pdf', '2025-04-12 13:52:38.253468', '2025-04-12 13:52:38.253468');
INSERT INTO public.organizations VALUES ('b3900f49-afce-43ce-84c7-13ef2ab12eee', '\u0411\u0424 "\u0414\u043e\u043f\u043e\u043c\u043e\u0433\u0430 \u043f\u043e\u0440\u0443\u0447"', 'ngo', '84684522', 'https://help-now.org.ua', false, 'https://docs.ua/verif/help987.pdf', '2025-04-12 13:52:38.253468', '2025-04-12 13:52:38.253468');
INSERT INTO public.organizations VALUES ('d28150a5-16a0-47e2-acbf-fe51654d1ec3', '\u041a\u041f "\u041c\u0406\u0441\u044c\u043a\u0456 \u0456\u043d\u0456\u0446\u0456\u0430\u0442\u0438\u0432\u0438"', 'government', '54668489', NULL, false, NULL, '2025-04-12 13:52:38.253468', '2025-04-12 13:52:38.253468');


--
-- TOC entry 4482 (class 0 OID 21338)
-- Dependencies: 235
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4476 (class 0 OID 21204)
-- Dependencies: 229
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.photos VALUES ('b9efe387-5000-4101-8420-76c31b691bdf', '479d899f-a9be-4506-a314-f10867e3e8f0', '1f0aa0c9-ccfc-457e-9b4e-821e3a6b23c8', 'https://example.com/photos/0a1b2c3d4e5f.jpg', 'https://example.com/photos/thumbnails/0a1b2c3d4e5f_thumb.jpg', NULL, '00e44ab2-6259-411b-96ca-380de025150a', 'pending', NULL, NULL, '2025-04-12 14:33:31.354523', NULL, NULL);
INSERT INTO public.photos VALUES ('250f8717-2ce0-4d63-bfa8-a0ef6f85ba10', '3349f2de-1730-49db-a888-d0560aced177', '581b16f7-fe04-4b83-be44-a616d9fd835f', 'https://cdn.accessibilityhub.org/images/photo_87234_large.jpg', 'https://cdn.accessibilityhub.org/images/photo_87234_thumb.jpg', NULL, 'c74f8b4b-81fd-4904-8a5e-026bb2c6538c', 'rejected', NULL, NULL, '2025-04-12 14:33:31.354523', 'Incorrect data', NULL);
INSERT INTO public.photos VALUES ('643d9e1b-7d63-4354-a9ce-f4929237b421', '85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb', 'bfac36a3-9638-474c-ba96-845267857630', 'https://media.barrierfree.ua/uploads/2025/04/ramp-entry-main.jpg', 'https://media.barrierfree.ua/uploads/2025/04/ramp-entry-main_thumb.jpg', NULL, '68fa1eb3-9302-4ab3-9037-463737fb45a7', 'pending', NULL, NULL, '2025-04-12 14:33:31.354523', NULL, NULL);


--
-- TOC entry 4483 (class 0 OID 21347)
-- Dependencies: 236
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4478 (class 0 OID 21264)
-- Dependencies: 231
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reviews VALUES ('039f5712-f0d1-4164-9195-48a2a39b5951', '85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb', 'c74f8b4b-81fd-4904-8a5e-026bb2c6538c', 1, '\u0414\u0443\u0436\u0435 \u043f\u043e\u0433\u0430\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f', '\u0412\u0445\u0456\u0434\u043d\u0456 \u0441\u0445\u043e\u0434\u0438 \u0431\u0435\u0437 \u043f\u0430\u043d\u0434\u0443\u0441\u0443, \u0442\u0443\u0430\u043b\u0435\u0442 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0438\u0439', 'rejected', '2025-04-12 12:15:22.892992', '2025-04-12 12:15:22.892992');
INSERT INTO public.reviews VALUES ('0d192b48-e732-446e-84fa-4216641309a8', '479d899f-a9be-4506-a314-f10867e3e8f0', '00e44ab2-6259-411b-96ca-380de025150a', 3, ' \u0404 \u043d\u044e\u0430\u043d\u0441\u0438 \u0437 \u0434\u043e\u0441\u0442\u0443\u043f\u043e\u043c', '\u041f\u0430\u043d\u0434\u0443\u0441 \u0454, \u0430\u043b\u0435 \u0434\u0443\u0436\u0435 \u043a\u0440\u0443\u0442\u0438\u0439, \u0434\u0432\u0435\u0440\u0456 \u0432\u0430\u0436\u043a\u043e \u0432\u0456\u0434\u0447\u0438\u043d\u0438\u0442\u0438', 'pending', '2025-04-12 12:15:22.892992', '2025-04-12 12:15:22.892992');
INSERT INTO public.reviews VALUES ('3b9ecceb-387f-4f49-9483-7ac2dd184063', '3349f2de-1730-49db-a888-d0560aced177', '00e44ab2-6259-411b-96ca-380de025150a', 5, '\u0427\u0443\u0434\u043e\u0432\u0435 \u043c\u0456\u0441\u0446\u0435! \u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u044e \u0432\u0441\u0456\u043c ', '\u041f\u0430\u043d\u0434\u0443\u0441 \u0437\u0440\u0443\u0447\u043d\u0438\u0439, \u0448\u0438\u0440\u043e\u043a\u0456 \u0434\u0432\u0435\u0440\u0456, \u0454 \u043b\u0456\u0444\u0442', 'approved', '2025-04-12 12:15:22.892992', '2025-04-12 12:15:22.892992');


--
-- TOC entry 4471 (class 0 OID 21115)
-- Dependencies: 224
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES ('82830544-55c2-43de-9725-cd1508965eae', 'admin', '\u0410\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0437 \u0443\u0441\u0456\u043c\u0430 \u043f\u0440\u0430\u0432\u0430\u043c\u0438', '{"read": true, "write": true, "delete": true, "manage_users": true}', '2025-04-12 13:47:35.505466', '2025-04-12 13:47:35.505466');
INSERT INTO public.roles VALUES ('9c4866a1-b893-4736-8f39-ecd382616c9d', 'viewer', '\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u0434 \u0431\u0435\u0437 \u043c\u043e\u0436\u043b\u0438\u0432\u043e\u0441\u0442\u0456 \u0437\u043c\u0456\u043d', '{"read": true, "write": false, "delete": false, "manage_users": false}', '2025-04-12 13:47:35.505466', '2025-04-12 13:47:35.505466');
INSERT INTO public.roles VALUES ('6a12c5e4-02f9-425c-b590-ff456fdb35df', 'editor', '\u0420\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0443', '{"read": true, "write": true, "delete": false, "manage_users": false}', '2025-04-12 13:47:35.505466', '2025-04-12 13:47:35.505466');


--
-- TOC entry 4221 (class 0 OID 20311)
-- Dependencies: 220
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4473 (class 0 OID 21138)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('00e44ab2-6259-411b-96ca-380de025150a', 'iryna.kovalenko@example.net', '\u0406\u0440\u0438\u043d\u0430 \u041a\u043e\u0432\u0430\u043b\u0435\u043d\u043a\u043e', '+380931234567', NULL, 'CC987654', 'unverified', 'https://example.net/pic/iryna.jpeg', '03e6527b-10b8-4400-a8d5-425047e6c144', '2025-04-12 13:56:02.361099', '2025-04-12 13:56:02.361099', NULL, true, '\xf7fbba6e0636f890e56fbbf3283e524c6fa3204ae298382d624741d0dc6638326e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7');
INSERT INTO public.users VALUES ('68fa1eb3-9302-4ab3-9037-463737fb45a7', 'taras.bondarenko@example.org', '\u0422\u0430\u0440\u0430\u0441 \u0411\u043e\u043d\u0434\u0430\u0440\u0435\u043d\u043a\u043e', '+380671234567', NULL, 'BB654321', 'verified', 'https://example.org/images/taras.png', 'b3900f49-afce-43ce-84c7-13ef2ab12eee', '2025-04-12 13:56:02.361099', '2025-04-12 13:56:02.361099', NULL, true, '\x38567e882369a9af763cb94d78d682081bcb88f94c7a9d85864531553f5fa5a942470897a3f72dd6b89985c3fd42ff9a78102a2f711492122da49530bfd7e133');
INSERT INTO public.users VALUES ('c74f8b4b-81fd-4904-8a5e-026bb2c6538c', 'olena.ivchenko@example.com', '\u041e\u043b\u0435\u043d\u0430 \u0406\u0432\u0447\u0435\u043d\u043a\u043e', '+380501112233

', NULL, 'AE123456', 'verified', 'https://example.com/avatars/olena.jpg', 'd28150a5-16a0-47e2-acbf-fe51654d1ec3', '2025-04-12 13:56:02.361099', '2025-04-12 13:56:02.361099', NULL, true, '\x3d983e0f78973ea9e44fced001b9b88dfe392450eecc02d41ed93e800de2f692efba2a939c61451b7c52b8026b77b6e1190af8576308d871c6379ee544d81d21');
INSERT INTO public.users VALUES ('71e636ea-b7e2-4bf6-abe7-fab206a7eaf5', 'test@example.com', 'User666', NULL, NULL, NULL, 'unverified', NULL, NULL, '2025-04-13 07:40:06.756668', '2025-04-13 07:40:06.756668', NULL, true, '\x246172676f6e32696424763d3139246d3d36353533362c743d332c703d3124356138744878774838486d4536683349626d4e773341245355305238506e6d6d3875303547567265633461544d55674e7a534b35747858504a4b394e756d4c757245');
INSERT INTO public.users VALUES ('be905e92-8bc3-4d70-956c-f778dd871a16', 'vasya@dima', 'Andrey', NULL, NULL, NULL, 'unverified', NULL, NULL, '2025-04-13 08:02:43.040884', '2025-04-13 08:02:43.040884', NULL, true, '\x246172676f6e32696424763d3139246d3d36353533362c743d332c703d312475724c4178436b7766723230313767614938446d49412436314d4659777352623647502f4f736a56583978442b54776c7179317162314853314845394d47335a4955');
INSERT INTO public.users VALUES ('e67d725b-3446-43c6-b2e3-f9baf951cf0a', 'test@exle.com', 'Useyy666', NULL, NULL, NULL, 'unverified', NULL, NULL, '2025-04-13 08:42:12.493533', '2025-04-13 08:42:12.493533', NULL, true, '\x246172676f6e32696424763d3139246d3d36353533362c743d332c703d31246b52754e386d6e39326a2f576859735458656e4e6b51246d3150713631365834586354527230774a46796f766771763866313856427555624e4278432b7666566177');


--
-- TOC entry 4484 (class 0 OID 21356)
-- Dependencies: 237
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4477 (class 0 OID 21229)
-- Dependencies: 230
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.verifications VALUES ('2b2c3181-7822-4fd7-8f41-79d049d369c9', '479d899f-a9be-4506-a314-f10867e3e8f0', '581b16f7-fe04-4b83-be44-a616d9fd835f', '68fa1eb3-9302-4ab3-9037-463737fb45a7', 'b3900f49-afce-43ce-84c7-13ef2ab12eee', false, '\u041f\u043e\u0440\u0443\u0447\u0435\u043d\u044c \u0432\u0456\u0434\u0441\u0443\u0442\u043d\u0456\u0439', NULL, '2025-04-12 12:26:08.807848', true);
INSERT INTO public.verifications VALUES ('6373a690-7a76-452c-80aa-203228a067bd', '85f5f1cb-b5d0-4253-a7b5-c4d20ab214fb', 'bfac36a3-9638-474c-ba96-845267857630', 'c74f8b4b-81fd-4904-8a5e-026bb2c6538c', 'd28150a5-16a0-47e2-acbf-fe51654d1ec3', true, '\u0414\u043e\u0441\u0442\u0443\u043f \u0434\u043e \u0442\u0443\u0430\u043b\u0435\u0442\u0443 \u043f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043d\u043e', 'b9efe387-5000-4101-8420-76c31b691bdf', '2025-04-12 12:26:08.807848', false);
INSERT INTO public.verifications VALUES ('96280588-c4fd-4c56-9ab9-2164af14119d', '3349f2de-1730-49db-a888-d0560aced177', '1f0aa0c9-ccfc-457e-9b4e-821e3a6b23c8', '00e44ab2-6259-411b-96ca-380de025150a', '03e6527b-10b8-4400-a8d5-425047e6c144', true, '\u041f\u0430\u043d\u0434\u0443\u0441 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043d\u0438\u0439, \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u0430\u0454 \u043d\u043e\u0440\u043c\u0430\u043c', '250f8717-2ce0-4d63-bfa8-a0ef6f85ba10', '2025-04-12 12:26:08.807848', true);


--
-- TOC entry 4284 (class 2606 OID 21193)
-- Name: accessibility_features accessibility_features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accessibility_features
    ADD CONSTRAINT accessibility_features_pkey PRIMARY KEY (id);


--
-- TOC entry 4294 (class 2606 OID 21309)
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4296 (class 2606 OID 21337)
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- TOC entry 4282 (class 2606 OID 21172)
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- TOC entry 4292 (class 2606 OID 21295)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4271 (class 2606 OID 21137)
-- Name: organizations organizations_edrpou_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_edrpou_key UNIQUE (edrpou);


--
-- TOC entry 4273 (class 2606 OID 21135)
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- TOC entry 4298 (class 2606 OID 21346)
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (id);


--
-- TOC entry 4286 (class 2606 OID 21213)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 4300 (class 2606 OID 21355)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- TOC entry 4290 (class 2606 OID 21275)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4267 (class 2606 OID 21126)
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- TOC entry 4269 (class 2606 OID 21124)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4275 (class 2606 OID 21149)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4277 (class 2606 OID 21151)
-- Name: users users_gov_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_gov_id_key UNIQUE (gov_id);


--
-- TOC entry 4279 (class 2606 OID 21147)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4302 (class 2606 OID 21362)
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- TOC entry 4288 (class 2606 OID 21238)
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4280 (class 1259 OID 21183)
-- Name: idx_locations_coordinates; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_locations_coordinates ON public.locations USING gist (coordinates);


--
-- TOC entry 4307 (class 2606 OID 21199)
-- Name: accessibility_features accessibility_features_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.accessibility_features
     ADD CONSTRAINT fk_features_created_by
     FOREIGN KEY (created_by) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4308 (class 2606 OID 21194)
-- Name: accessibility_features accessibility_features_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.accessibility_features
     ADD CONSTRAINT fk_features_location
     FOREIGN KEY (location_id) REFERENCES public.locations(id)
     ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4320 (class 2606 OID 21310)
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.audit_logs
     ADD CONSTRAINT fk_audit_user
     FOREIGN KEY (user_id) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4305 (class 2606 OID 21173)
-- Name: locations locations_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.locations
     ADD CONSTRAINT fk_locations_created_by
     FOREIGN KEY (created_by) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4306 (class 2606 OID 21178)
-- Name: locations locations_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.locations
     ADD CONSTRAINT fk_locations_organization
     FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4319 (class 2606 OID 21296)
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications
     ADD CONSTRAINT fk_notifications_user
     FOREIGN KEY (user_id) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4309 (class 2606 OID 21224)
-- Name: photos photos_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.photos
     ADD CONSTRAINT fk_photos_created_by
     FOREIGN KEY (created_by) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4310 (class 2606 OID 21219)
-- Name: photos photos_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.photos
     ADD CONSTRAINT fk_photos_feature
     FOREIGN KEY (feature_id) REFERENCES public.accessibility_features(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4311 (class 2606 OID 21214)
-- Name: photos photos_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.photos
     ADD CONSTRAINT fk_photos_location
     FOREIGN KEY (location_id) REFERENCES public.locations(id)
     ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4317 (class 2606 OID 21276)
-- Name: reviews reviews_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.reviews
     ADD CONSTRAINT fk_reviews_location
     FOREIGN KEY (location_id) REFERENCES public.locations(id)
     ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4318 (class 2606 OID 21281)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.reviews
     ADD CONSTRAINT fk_reviews_user
     FOREIGN KEY (user_id) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4303 (class 2606 OID 21157)
-- Name: users users_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.users
     ADD CONSTRAINT fk_users_organization
     FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4304 (class 2606 OID 21152)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.users
     ADD CONSTRAINT fk_users_role
     FOREIGN KEY (role_id) REFERENCES public.roles(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4312 (class 2606 OID 21259)
-- Name: verifications verifications_evidence_photo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.verifications
     ADD CONSTRAINT fk_verifications_photo
     FOREIGN KEY (evidence_photo_id) REFERENCES public.photos(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4313 (class 2606 OID 21244)
-- Name: verifications verifications_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.verifications
     ADD CONSTRAINT fk_verifications_feature
     FOREIGN KEY (feature_id) REFERENCES public.accessibility_features(id)
     ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4314 (class 2606 OID 21239)
-- Name: verifications verifications_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.verifications
     ADD CONSTRAINT fk_verifications_location
     FOREIGN KEY (location_id) REFERENCES public.locations(id)
     ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4315 (class 2606 OID 21254)
-- Name: verifications verifications_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

 ALTER TABLE public.verifications
     ADD CONSTRAINT fk_verifications_organization
     FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
     ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4316 (class 2606 OID 21249)
-- Name: verifications verifications_verified_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.verifications
     ADD CONSTRAINT fk_verifications_verified_by
     FOREIGN KEY (verified_by) REFERENCES public.users(id)
     ON UPDATE CASCADE ON DELETE SET NULL;

-- Completed on 2025-04-13 14:08:51

--
-- PostgreSQL database dump complete
--

