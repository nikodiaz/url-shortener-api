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
```

Asegúrate de que MongoDB esté corriendo en tu máquina antes de iniciar la aplicación.

## Ejecución

Para iniciar el servidor:

```bash
npm run start
```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints

### Acortar una URL

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

### Redirección a la URL original

- Endpoint: `/:shortUrl`
- Método: `GET`
- Descripción: Redirige a la URL original asociada a la URL corta.

## Futuras mejoras

- [ ] Registro e inicio de sesión de usuarios.
- [ ] Almacenamiento de URLs por usuario.
- [ ] Validación de URLs
- [ ] Contador de visitas de cada URL
- [ ] Generador de QRs para compartir fácilmente las URLs
