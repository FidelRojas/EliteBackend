# ELITE-Backend

El siguiente API esta basado en NodeJs y PostgreSQL

## Installation

Para instalar todos los módulos necesarios, demos correr el siguiente código en nuestro bash

```bash
npm install
```

## Migrations

Para implementar todas las migraciones y asi tener las tablas en la base de datos ejecutar

```bash
npx sequelize-cli db:migrate
```

Para poblar las tablas con datos de nuestra Seed

```bash
npx sequelize-cli db:seed:all
```
```bash
npx sequelize-cli db:seed --seed nameFileSeed.js
```

## Tests

Para correr los test ejecutar

```bash
npm test
```
