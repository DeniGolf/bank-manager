-- CREATE DATABASE bank;

CREATE TABLE bank (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    interest_rate decimal,
    maximum_loan decimal,
    minimum_down_payment decimal,
    loan_term decimal
);

CREATE TABLE calculate (
    id SERIAL PRIMARY KEY,
    bank_id INTEGER,
    initial_loan decimal,
    down_payment decimal,
    monthly_payment decimal,
    FOREIGN KEY (bank_id) REFERENCES bank(id) ON DELETE CASCADE
);