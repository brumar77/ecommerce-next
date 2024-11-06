# Description

## Correr en dev

1. Clonar el repositor
2. Crear una copia del archivo del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno
2. Instalar dependencias ```npm install```
3. Levantar la bbdd  ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
3. Correr el proyecto ```npm run dev```

## Correr en prod