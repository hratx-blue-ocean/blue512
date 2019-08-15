CREATE TABLE users
(
  id VARCHAR UNIQUE NOT NULL,
  first_name varchar,
  last_name varchar,
  email varchar,
  avatar_url varchar,
  CONSTRAINT pk_users PRIMARY KEY (
    id
   )
);

CREATE TABLE unavailable
(
  id serial NOT NULL,
  time_start varchar,
  time_end varchar,
  user_id VARCHAR,
  name VARCHAR,
  recurring boolean,
  CONSTRAINT pk_unavailable PRIMARY KEY (
    id
   )
);

CREATE TABLE experiences
(
  id serial NOT NULL,
  name varchar,
  source_api_id varchar,
  experience_api_id varchar,
  description varchar,
  url varchar,
  venue varchar,
  location varchar,
  time_start varchar,
  time_end varchar,
  price_min varchar,
  price_max varchar,
  category_id int,
  img varchar,
  CONSTRAINT unique_source_id UNIQUE (experience_api_id),
  CONSTRAINT pk_experiences PRIMARY KEY ( 
    id
   )
);

CREATE TABLE api
(
  id serial NOT NULL,
  name varchar,
  CONSTRAINT unique_api_name UNIQUE(name),
  CONSTRAINT pk_api PRIMARY KEY (
    id
   )
);

CREATE TABLE categories
(
  id serial NOT NULL,
  name varchar,
  CONSTRAINT unique_categories_name UNIQUE(name),
  CONSTRAINT pk_categories PRIMARY KEY (
    id
   )
);

CREATE TABLE users_experiences
(
  id serial NOT NULL,
  user_id VARCHAR UNIQUE,
  experience_id int,
  CONSTRAINT pk_users_experiences PRIMARY KEY (
    id
   )
);

CREATE TABLE users_categories
(
  id serial NOT NULL,
  user_id VARCHAR,
  category_id int,
  preferred boolean,
  CONSTRAINT pk_users_categories PRIMARY KEY (
    id
   )
);

ALTER TABLE sessions ADD CONSTRAINT fk_sessions_user_id FOREIGN KEY(user_id)
REFERENCES users (id);

ALTER TABLE unavailable ADD CONSTRAINT fk_unavailable_user_id FOREIGN KEY(user_id)
REFERENCES users (id);

ALTER TABLE experiences ADD CONSTRAINT fk_experiences_source_api_id FOREIGN KEY(source_api_id)
REFERENCES api (id);

ALTER TABLE experiences ADD CONSTRAINT fk_experiences_category_id FOREIGN KEY(category_id)
REFERENCES categories (id);

ALTER TABLE users_experiences ADD CONSTRAINT fk_users_experiences_user_id FOREIGN KEY(user_id)
REFERENCES users (id);

ALTER TABLE users_experiences ADD CONSTRAINT fk_users_experiences_experience_id FOREIGN KEY(experience_id)
REFERENCES experiences (id);

ALTER TABLE users_categories ADD CONSTRAINT fk_users_categories_user_id FOREIGN KEY(user_id)
REFERENCES users (id);

ALTER TABLE users_categories ADD CONSTRAINT fk_users_categories_category_id FOREIGN KEY(category_id)
REFERENCES categories (id);

CREATE OR REPLACE FUNCTION delete_old_unavailable
()
  RETURNS trigger
  LANGUAGE plpgsql
  AS $OLDUNAVAILABLE$
BEGIN
  DELETE FROM unavailable WHERE time_start < NOW();
  RETURN NULL;
END;
$OLDUNAVAILABLE$;


CREATE OR REPLACE TRIGGER trigger_delete_old_rows_from_unavailable
    AFTER
INSERT ON
unavailable
EXECUTE PROCEDURE delete_old_unavailable
();


CREATE OR REPLACE FUNCTION delete_old_experiences
()
  RETURNS trigger
  LANGUAGE plpgsql
  AS $OLDEXPERIENCES$
BEGIN
  DELETE FROM experiences WHERE time_start < NOW();
  RETURN NULL;
END;
$OLDEXPERIENCES$;

CREATE TRIGGER trigger_delete_old_rows_from_unavailable
    AFTER
INSERT ON
experiences
EXECUTE PROCEDURE delete_old_experiences
();



SELECT e.name, e.description, e.url, e.img, e.venue, e.location, e.time_start,
  e.time_end, e.price_min, e.price_max, c.name AS category
FROM experiences e
  LEFT OUTER JOIN categories c ON e.category_id=c.id
WHERE e.category_id!= ALL(SELECT id
FROM categories
WHERE id= 
ANY(SELECT category_id
FROM users_categories
WHERE user_id='114216662239776980426' AND preferred=false))
ORDER BY e.category_id
= ANY
(SELECT id
FROM categories
WHERE id= 
ANY(SELECT category_id
FROM users_categories
WHERE user_id='114216662239776980426' AND preferred=true))
DESC;