# Proyecto de Gestión de Órdenes

Este proyecto es una API para gestionar órdenes, productos y usuarios en un sistema de comercio electrónico.


## Instrucciones para Configurar la Base de Datos

1. Asegúrate de tener PostgreSQL instalado y en ejecución.

2. Crea una base de datos:
    ```sql
    CREATE DATABASE ecommerce_db;
    ```
## Instrucciones para Ejecutar la Aplicación Localmente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd tu_repositorio
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Ejecuta el proyecto en modo de desarrollo:
   ```bash
   npm run dev
   ```

"La aplicación se ejecutará y estará disponible en `http://localhost:4000` o en el puerto que hayas configurado."

### Configuración del Archivo `.env` para el Proyecto

Este proyecto requiere un archivo `.env` para configurar las variables de entorno necesarias para su ejecución. A continuación, se detallan los pasos y un ejemplo de cómo debe configurarse.

#### Variables de Entorno

Crea un archivo `.env` en la raíz de tu proyecto y asegúrate de incluir las siguientes variables de entorno:

```env
# Configuración del servidor
LISTEN_PORT=3000                 # Puerto en el que se ejecutará la aplicación

# Configuración de la base de datos PostgreSQL
DB_USERNAME=postgres              # Usuario de la base de datos
DB_DATABASE=test_tredasolutions   # Nombre de la base de datos
DB_PASSWORD=password-postgresql   # Contraseña de la base de datos
DB_HOSTNAME=localhost             # Host de la base de datos
DB_PORT=5432                      # Puerto de la base de datos
SECRET_KEY=my-secretkey           # Clave secreta para el cifrado de datos
```

## Ejemplos de Cómo Probar los Endpoints

La API cuenta con una documentación interactiva generada con Swagger que te permite probar fácilmente los endpoints.

## Acceso a la Documentación Swagger

1. **Inicia la aplicación** siguiendo los pasos de configuración y ejecución descritos anteriormente.

2. **Accede a Swagger** abriendo tu navegador web y visitando la siguiente URL: http://localhost:3000/api/docs
> Reemplaza `3000` con el puerto en el que se esté ejecutando tu aplicación si has configurado uno diferente.

## Cómo Probar los Endpoints

Una vez que estés en la interfaz de Swagger, sigue estos pasos para probar los endpoints de la API:

1. **Navega por la lista de endpoints disponibles**. Verás una lista completa de todos los endpoints agrupados por categorías o recursos.

2. **Selecciona un endpoint** que desees probar haciendo clic sobre él. Esto expandirá la sección y mostrará detalles como el método HTTP (GET, POST, PUT, DELETE), parámetros requeridos y ejemplos de respuestas.

3. **Introduce los parámetros necesarios** (si los hay) en los campos correspondientes.

4. Haz clic en el botón `Try it out` para enviar la solicitud y ver la respuesta directamente en la interfaz.

### Ejemplo de Solicitud HTTP

## **1. Crear un usuario**

Como ejemplo, aquí te mostramos cómo puedes realizar una solicitud `POST` para crear un nuevo usuario utilizando Swagger:

  - Endpoint: `/api/users`
    - Método: `POST`
    - Parámetros:
    ```json
    {
      "email": "mariosalazar@gmail.com",
      "firstname": "Mario",
      "lastname": "Salazar",
      "password": "password-Mario10/*-",
      "user_type": 1
    }
    ```
## **2. Sign In**
    
- **Autenticación de Usuario - Inicio de Sesión**

Este proyecto cuenta con un endpoint para iniciar sesión y autenticar a los usuarios mediante un correo electrónico y una contraseña.
Para poder usar los demas endpoints asegurate de Iniciar Sesión.

#### Endpoint de Inicio de Sesión

- **Método HTTP**: `GET`
- **URL**: `/api/auth/signin/{email}/{password}`

#### Descripción

El endpoint permite que los usuarios inicien sesión utilizando su dirección de correo electrónico y contraseña. Los parámetros deben proporcionarse en la URL.

#### Parámetros

| Parámetro   | Tipo   | Ubicación | Descripción                                                      |
|-------------|--------|-----------|------------------------------------------------------------------|
| `email`     | string | path      | El correo electrónico del usuario. Ejemplo: `mariosalazar@gmail.com` |
| `password`  | string | path      | La contraseña del usuario. Ejemplo: `password-Mario10/*-`           |

#### Ejemplo de Solicitud

Para probar el inicio de sesión, puedes utilizar los siguientes valores de ejemplo:
- **Email**: `mariosalazar@gmail.com`
- **Contraseña**: `password-Mario10/*-`


#### Respuestas

El endpoint de inicio de sesión puede devolver los siguientes códigos de estado HTTP:

- **200 OK**: El inicio de sesión fue exitoso. Se devuelve un objeto `User` con los detalles del usuario autenticado.
  ```json
  {
    "id": 1,
    "email": "mariosalazar@gmail.com",
    "name": "Mario Salazar",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
    ```
Una ves Iniciado Sesion podra usar los demas endpoits.

## **3. Gestión de Órdenes**

Esta sección describe cómo utilizar los endpoints relacionados con las órdenes en el sistema, incluyendo cómo crear una nueva orden y cómo obtener la lista de todas las órdenes existentes.

### Crear una Orden

- **Endpoint**: `/api/orders/{customer}`
- **Método HTTP**: `POST`
- **Descripción**: Permite crear una nueva orden para un cliente específico, proporcionando los detalles de los productos y las cantidades.

### Parámetros

| Parámetro  | Tipo     | Ubicación | Descripción                  |
|------------|----------|-----------|------------------------------|
| `customer` | integer  | path      | El ID del cliente que realiza la orden. Ejemplo: `1` |

### Cuerpo de la Solicitud (Request Body)

El cuerpo de la solicitud debe ser un array de objetos JSON que representen los productos que se incluirán en la orden. Cada objeto debe contener los siguientes campos:

| Campo    | Tipo     | Descripción                       | Ejemplo     |
|----------|----------|-----------------------------------|-------------|
| `code`   | string   | Código del producto               | `TECH001`   |
| `quantity` | integer | Cantidad del producto             | `2`         |

#### Ejemplo de Cuerpo de la Solicitud
```json
[
  {
    "code": "TECH001",
    "quantity": 5
  },
  {
    "code": "TECH002",
    "quantity": 3
  },
  {
    "code": "TECH003",
    "quantity": 4
  }
]
```

## **4. Gestión de Devoluciones**

Esta sección describe cómo utilizar el endpoint relacionado con la generación de devoluciones en el sistema.

### Generar una Devolución

- **Endpoint**: `/api/returns/{order_item}`
- **Método HTTP**: `POST`
- **Descripción**: Permite generar una devolución para un artículo de pedido existente en el sistema.

### Parámetros

| Parámetro     | Tipo   | Ubicación | Descripción                        | Requerido |
|---------------|--------|-----------|------------------------------------|-----------|
| `order_item`  | string | path      | El ID del artículo de pedido que se desea devolver. | Sí        |

Ejemplo de `order_item`: `1`

### Cuerpo de la Solicitud (Request Body)

El cuerpo de la solicitud debe contener información sobre el artículo de pedido que se desea devolver. El contenido puede ser enviado en formato JSON, XML o `application/x-www-form-urlencoded`.

#### Ejemplo de Cuerpo de la Solicitud en JSON
```json
{
  "reason": "I made a mistake in my purchase",
  "status": "requested"
}
```

## **5. Actualización de Devoluciones**

Esta sección describe cómo utilizar el endpoint relacionado con la actualización del estado de una devolución en el sistema.

## Cambiar el Estado de una Devolución

- **Endpoint**: `/api/returns/{return_id}/{status}`
- **Método HTTP**: `PUT`
- **Descripción**: Permite actualizar el estado de una devolución existente.

### Parámetros

| Parámetro     | Tipo      | Ubicación | Descripción                                                 | Requerido |
|---------------|-----------|-----------|-------------------------------------------------------------|-----------|
| `return_id`   | integer   | path      | El ID de la devolución que se desea actualizar.            | Sí        |
| `status`      | string    | path      | El nuevo estado que se desea asignar a la devolución. Los estados válidos son: `requested`, `pending`, `approved`, `rejected`, y `canceled`. | Sí        |

#### Ejemplo de Parámetros
- `return_id`: `1`
- `status`: `approved`

#### Ejemplo de Respuesta Exitosa (200)
```json
{
  "message": "The return with ID 1 is currently in process."
}
```
#### Ejemplo de Respuesta Exitosa (200)
```json
{
  "return_id": 2,
  "order_item": 4,
  "reason": "I made a mistake in my purchase",
  "status": "requested",
  "return_amount": "6291.80",
  "createdAt": "2024-09-30T18:04:07.847Z",
  "updatedAt": "2024-09-30T18:04:07.847Z"
}
```

## **6. Generación de Reembolsos**

Esta sección describe cómo utilizar el endpoint para crear un reembolso en el sistema.

### Solicitar Reembolso

- **Endpoint**: `/api/refunds/{return_id}`
- **Método HTTP**: `POST`
- **Descripción**: Este endpoint permite crear un reembolso asociado a una devolución existente en el sistema.

### Parámetros

| Parámetro   | Tipo    | Ubicación | Descripción                                          | Requerido |
|-------------|---------|-----------|------------------------------------------------------|-----------|
| `return_id` | integer | path      | El ID de la devolución para la cual se va a generar el reembolso. | Sí        |

#### Ejemplo de Parámetro
- `return_id`: `1`

### Cuerpo de la Solicitud

El cuerpo de la solicitud debe contener la información necesaria para crear el reembolso. Puedes enviar los datos en diferentes formatos:

- **JSON**: 
  - Utiliza el siguiente esquema para el cuerpo de la solicitud:
  
```json
{
  "payment_method": "I made a mistake in my purchase",
  "status": "requested"
}
```
#### Ejemplo de Respuesta Exitosa (200)
```json
{
  "refund_id": 2,
  "return_id": 2,
  "refund_amount": "6291.80",
  "status": "requested",
  "payment_method": "I made a mistake in my purchase",
  "createdAt": "2024-09-30T18:07:47.364Z",
  "updatedAt": "2024-09-30T18:07:47.365Z"
}
```


## **7. Cambiar Estado de un Reembolso**

Esta sección describe cómo utilizar el endpoint para cambiar el estado de un reembolso en el sistema.

- **Endpoint**: `/api/refunds/{return_id}/{status}`
- **Método HTTP**: `PUT`
- **Descripción**: Este endpoint permite actualizar el estado de un reembolso asociado a una devolución existente en el sistema.

### Parámetros

| Parámetro   | Tipo    | Ubicación | Descripción                                          | Requerido |
|-------------|---------|-----------|------------------------------------------------------|-----------|
| `return_id` | integer | path      | El ID de la devolución asociada al reembolso que se desea actualizar. | Sí        |
| `status`    | string  | path      | El nuevo estado que se desea asignar al reembolso.  Debe ser uno de los siguientes valores: `requested`, `pending`, `approved`, `rejected`, `returned`, o `canceled`. | Sí        |

#### Ejemplo de Parámetros
- `return_id`: `1`
- `status`: `approved`


#### Ejemplo de Respuesta Exitosa (200)
```json
{
  "refund_id": 2,
  "return_id": 2,
  "refund_amount": "6291.80",
  "status": "approved",
  "payment_method": "I made a mistake in my purchase",
  "createdAt": "2024-09-30T18:07:47.364Z",
  "updatedAt": "2024-09-30T18:15:10.748Z"
}
```


