CREATE TABLE "Users" (
    "ID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Users" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Sessions" (
    "ID" int   NOT NULL,
    "User_ID" int   NOT NULL,
    "Token" string   NOT NULL,
    CONSTRAINT "pk_Sessions" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Unvailable" (
    "ID" int   NOT NULL,
    "Time_Start" string   NOT NULL,
    "Time_End" string   NOT NULL,
    "User_ID" int   NOT NULL,
    CONSTRAINT "pk_Unvailable" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Experiences" (
    "ID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Source_API_ID" int   NOT NULL,
    "Experience_API_ID" string   NOT NULL,
    "Description" string   NOT NULL,
    "URL" string   NOT NULL,
    "Img_Large" string   NOT NULL,
    "Img_Small" string   NOT NULL,
    "Venue" string   NOT NULL,
    "Location" string   NOT NULL,
    "Time_Start" string   NOT NULL,
    "Time_End" string   NOT NULL,
    "Price_Min" string   NOT NULL,
    "Price_Max" string   NOT NULL,
    "Category_ID" int   NOT NULL,
    CONSTRAINT "pk_Experiences" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "API" (
    "ID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_API" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Categories" (
    "ID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Categories" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Users_Experiences" (
    "ID" int   NOT NULL,
    "User_ID" int   NOT NULL,
    "Experience_ID" int   NOT NULL,
    CONSTRAINT "pk_Users_Experiences" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Users_Categories" (
    "ID" int   NOT NULL,
    "User_ID" int   NOT NULL,
    "Category_ID" int   NOT NULL,
    CONSTRAINT "pk_Users_Categories" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Sessions" ADD CONSTRAINT "fk_Sessions_User_ID" FOREIGN KEY("User_ID")
REFERENCES "Users" ("ID");

ALTER TABLE "Unvailable" ADD CONSTRAINT "fk_Unvailable_User_ID" FOREIGN KEY("User_ID")
REFERENCES "Users" ("ID");

ALTER TABLE "Experiences" ADD CONSTRAINT "fk_Experiences_Source_API_ID" FOREIGN KEY("Source_API_ID")
REFERENCES "API" ("ID");

ALTER TABLE "Experiences" ADD CONSTRAINT "fk_Experiences_Category_ID" FOREIGN KEY("Category_ID")
REFERENCES "Categories" ("ID");

ALTER TABLE "Users_Experiences" ADD CONSTRAINT "fk_Users_Experiences_User_ID" FOREIGN KEY("User_ID")
REFERENCES "Users" ("ID");

ALTER TABLE "Users_Experiences" ADD CONSTRAINT "fk_Users_Experiences_Experience_ID" FOREIGN KEY("Experience_ID")
REFERENCES "Experiences" ("ID");

ALTER TABLE "Users_Categories" ADD CONSTRAINT "fk_Users_Categories_User_ID" FOREIGN KEY("User_ID")
REFERENCES "Users" ("ID");

ALTER TABLE "Users_Categories" ADD CONSTRAINT "fk_Users_Categories_Category_ID" FOREIGN KEY("Category_ID")
REFERENCES "Categories" ("ID");

CREATE INDEX "idx_Users_Name"
ON "Users" ("Name");
