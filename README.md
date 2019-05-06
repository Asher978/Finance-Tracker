# Finance Stock Tracker

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

### Authentication

    * devise
