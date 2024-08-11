# technical-test-dataknow

**Developed by:** Sebastian Felipe Martinez Samaca

**Date:** 2024-08-11

**Project:** Technical Test in DataKnows

**Keywords:** NodeJS, Express.js, React, Next.js, MySQL

**Deployment Infrastructure:** Vercel and Railway

> [!IMPORTANT]
> Link de la documentacion de los endpoints: https://technical-test-dataknow-development.up.railway.app/docs/#/Invoice/get_api_invoice_date

> [!IMPORTANT]
> Link del despliegue en Vercel: https://technical-test-dataknow.vercel.app/

#### Table of Contents

- [Introducción](#introducción)
- [Backend](#backend)
  - [Instalacion Local](#local-installation)
  - [Instalacion en Docker ](#docker-installation)
  - [Documentacion](#documentation)
- [Frontend](#frontend)
  - [Instalacion Local](#local-installation)
  - [Documentacion](#documentation)
  - [Porque Next.js](#why-nextjs)

## Introducción

Este proyecto es un test técnico para la empresa DataKnows, el cual consiste en desarrollar una aplicación web que permita crear clientes y facturas a esos clientes, no requiere autentificación, y se debe poder listar, crear clientes y facturas.

## Backend

El backend de la aplicación fue desarrollado en NodeJS con Express.js, se utilizo una base de datos MySQL para almacenar la información de los clientes y las facturas.

### Instalacion Local

Para instalar el backend de la aplicación de forma local, se debe seguir los siguientes pasos:

1. Ingresar a la carpeta del backend

```bash
cd backend
```

2. Instalar las dependencias

```bash
npm install
```

3. Crear el archivo `.env` en la ruta raiz del backend y agregar el contenido, puede usar `.env.template` como referencia.

4. Iniciar el servidor

```bash
npm run dev
```

5. Acceder a la documentación de la API en `http://localhost:3000/docs`

### Instalacion en Docker

1. Crear el archivo `.env` en la ruta raiz del backend y agregar el contenido, puede usar `.env.template` como referencia.
2. Ejecutar el docker-compose usando: ` docker-compose -f docker-compose.dev.yml up`

### Documentacion

El backend se realizo con una arquitectura n-capas, lo que facilita la escalabilidad y mantenimiento del código, a continuación se muestra la estructura de carpetas del backend:

```bash
backend
├── src
│   ├── controllers
│   ├── helpers
│   ├── interfaces
│   ├── models
│   ├── routes
│   ├── services
│   └── main.ts
├── .env
├── .env.template
├── .gitignore
├── docker-compose.dev.yml
├── Dockerfile
```

## Frontend

El frontend de la aplicación fue desarrollado en React con Next.js, se utilizo TailwindCSS para el diseño de la aplicación.

### Instalacion Local

Para instalar el frontend de la aplicación de forma local, se debe seguir los siguientes pasos:

1. Ingresar a la carpeta del frontend

```bash
cd frontend
```

2. Instalar las dependencias

```bash
npm install
```

3. Crear el archivo `.env` en la ruta raiz del frontend y agregar el contenido, puede usar `.env.template` como referencia.

4. Iniciar el servidor

```bash
npm run dev
```

5. Acceder a la aplicación en `http://localhost:3000`

### Documentacion

El frontend se realizo con una arquitectura de componentes, lo que facilita la escalabilidad y mantenimiento del código, a continuación se muestra la estructura de carpetas del frontend:

```bash
frontend
├── actions
├── app
├── components
├── hooks
├── lib
├── public
├── schemas
├── types
├── .env
```

### Porque Next.js

Next.js es un framework de React que permite renderizar aplicaciones del lado del servidor, lo que permite una mejor optimización del SEO y una mejor experiencia de usuario, ademas de que permite la generación de páginas estáticas y dinámicas, lo que facilita la escalabilidad de la aplicación.



