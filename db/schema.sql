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
<<<<<<< HEAD
=======
  img varchar,
>>>>>>> e87c61977034b14a8a33fb2ca276592e1a03b535
  CONSTRAINT unique_source_id UNIQUE (source_api_id),
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

<<<<<<< HEAD
=======
ALTER TABLE sessions ADD CONSTRAINT fk_sessions_user_id FOREIGN KEY(user_id)
REFERENCES users (id);

>>>>>>> e87c61977034b14a8a33fb2ca276592e1a03b535
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
