# Finance Stock Tracker

[![Greenkeeper badge](https://badges.greenkeeper.io/Asher978/Finance-Tracker.svg)](https://greenkeeper.io/)

![Dependencies badge](https://david-dm.org/Asher978/Finance-Tracker.svg)

### Database

    * postgresql

### ERDs

_Stock_

| Column     | Type                 | Default | Nullable |
| ---------- | -------------------- | ------- | -------- |
| id         | SERIAL (primary key) | None    | NO       |
| ticker     | string               | None    | NO       |
| name       | string               | None    | NO       |
| last_price | decimal              | None    | NO       |

_UserStocks_

| Column   | Type                  | Default | Nullable |
| -------- | --------------------- | ------- | -------- |
| id       | SERIAL (primary key)  | None    | NO       |
| user_id  | integer (foreign key) | None    | NO       |
| stock_id | integer (foreign key) | None    | NO       |

### Authentication

    * devise
