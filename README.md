# URL Shortener API

Acortador de URLs simple construído con Node.js, Express, y MongoDB. La API permite
acortar URLs largas y redirigir a la URL original utilizando el enlace corto generado.

## Índice

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints](#endpoints)

## Instalación

Clona el repositorio en tu máquina local

```bash
git clone https://github.com/tu_usuario/url-shortener.git
cd url-shortener
```

Instala las dependencias necesarias:

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con la siguiente Configuración:

```plaintext
MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
PORT=3000
JWT_SECRET=your_jwt_secret
```

Asegúrate de que MongoDB esté corriendo en tu máquina antes de iniciar la aplicación.

## Ejecución

Para iniciar el servidor:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints

### Autenticación

#### Registro de usuario
- Endpoint: `/api/signup`
- Método: `POST`
- Descripción: Registra un nuevo usuario
```json
// Parámetro de la petición
{
  "email": "user@example.com",
  "password": "password123"
}
// Respuesta
{
  "message": "Usuario registrado exitosamente",
  "token": "jwt_token"
}
```
#### Inicio de sesión
- Endpoint: `/api/signin`
- Método: `POST`
- Descripción: Inicia sesión con un usuario esxistente
```json
// Parámetro de la petición
{
  "email": "user@example.com",
  "password": "password123"
}
// Respuesta
{
  "message": "Inicio de sesión exitoso",
  "token": "jwt_token"
}
```
### Gestión de URLs

#### Acortar una URL

- Endpoint: `/api/shorten`
- Método: `POST`
- Descripción: Crea una URL corta a partir de una URL larga.

```json
// Parámetro de la petición
{
 "originalUrl": "https://www.example.com"
}

// Respuesta

{
 "shortUrl": "http://localhost:3000/abc123"
}
```

#### Redirección a la URL original

- Endpoint: `/:shortUrl`
- Método: `GET`
- Descripción: Redirige a la URL original asociada a la URL corta.

### Estadísticas de URLs

> **Requiere autenticación** Debes incluir el token JWT en el encabezado `Authorization` como `Bearer <token>`.

#### Visitas totales por usuario

- Endpoint: `/user/visits/total`
- Método: `GET`
- Descripción:  Obtiene el total de visitas a todas las URLs creadas por el usuario autenticado.
```json
  // Respuesta
{
  "totalVisits": 150
}
```
#### Total de URLs creadas por usuario

- Endpoint: `/user/links/total`
- Método: `GET`
- Descripción: Obtiene el número total de URLs creadas por el usuario autenticado.
```json
// Respuesta
{
  "totalLinks": 10
}
```

#### Visitas de un link específico por usuario

- Endpoint: `/user/visits/link/:linkId`
- Método: `GET`
- Descripción: Obtiene el número de visitas de una URL específica asociada al usuario autenticado.
```json
// Respuesta
{
  "visits": 25
}
```
#### Visitas totales por fecha para todas las URLs del usuario

- Endpoint: `/user/visits_by_date`
- Método: `GET`
- Descripción: Obtiene un contador de visitas agrupadas por fecha para todas las URLs creadas por el usuario autenticado.
```json
// Respuesta
{
  "visitsByDate": [
    { "date": "2024-09-01", "count": 5 },
    { "date": "2024-09-02", "count": 3 }
  ]
}
```

#### Visitas de cada link ordenado por fecha

- Endpoint: `/user/visits/dates`
- Método: `GET`
- Descripción: Obtiene el número de visitas para cada URL, agrupadas por fecha.
```json
// Respuesta
{
  "visitsByDate": [
    { "date": "2024-09-01", "count": 5 },
    { "date": "2024-09-02", "count": 3 }
  ]
}
```
## Futuras mejoras

- [x] Registro e inicio de sesión de usuarios.
- [x] Almacenamiento de URLs por usuario.
- [ ] Validación avanzada de URLs
- [ ] Límite de URLs creadas por usuario.
- [ ] Mejora en la generación y personalización de URLs cortas.
- [ ] Mejora de estadísticas detalladas para cada URL.
- [x] Contador de visitas de cada URL
- [x] Generador de QRs para compartir fácilmente las URLs

### Cambios realizados:
- Se agregaron secciones sobre autenticación (registro e inicio de sesión).
- Se añadieron detalles sobre las nuevas rutas protegidas por el middleware de autenticación, como el total de visitas por usuario, visitas por fecha, y URLs creadas.
- Se actualizó la sección de futuras mejoras para reflejar posibles adiciones al proyecto.
