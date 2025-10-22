# Veciapp Communications Microservice

Microservicio encargado del envío de correos transaccionales a los usuarios de Veciapp.

## Requisitos Previos en el Servidor

Antes de desplegar, asegúrate de que tu servidor (VPS) tenga instalado lo siguiente:

- **Git** (si usas el método de Git)
- **Docker**
- **Docker Compose**

## Pasos para el Despliegue en Producción

### 1. Conexión al Servidor

Conéctate a tu VPS usando SSH.

```sh
ssh usuario@ip_del_servidor
```

### 2. Subir el Código al Servidor

Tienes dos opciones para subir el código. Elige la que prefieras.

#### Opción A: Usando `rsync` (Recomendado para despliegues rápidos)

Desde tu máquina **local**, ejecuta el siguiente comando para sincronizar los archivos del proyecto con el servidor. Este método es rápido y excluye la carpeta `node_modules`.

```sh
rsync -av --exclude='node_modules' ./ usuario@ip_del_servidor:/opt/delivery-mailer/
```

Después de ejecutarlo, conéctate por SSH al servidor y navega a la carpeta del proyecto:

```sh
ssh usuario@ip_del_servidor
cd /opt/delivery-mailer
```

#### Opción B: Usando Git

Clona el proyecto desde tu repositorio de Git. Si ya existe, asegúrate de tener la última versión con `git pull`.

```sh
# En el servidor, si es la primera vez
git clone <URL_DEL_REPOSITORIO>
cd veciapp-communications-ms

# Si ya existe
cd veciapp-communications-ms
git pull
```

### 3. Crear el Archivo de Variables de Entorno

Dentro de la carpeta del proyecto en tu servidor, crea un archivo llamado `.env`.

```sh
nano .env
```

Añade el siguiente contenido, reemplazando los valores con tus credenciales de producción:

```
# Puerto del servidor
PORT=3002

# Credenciales del servicio de correo (Gmail)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```

Guarda y cierra el archivo (en `nano`, se hace con `Ctrl + X`, luego `Y`, y `Enter`).

### 4. Construir y Ejecutar la Aplicación con Docker

Utiliza Docker Compose para construir la imagen de producción y levantar el contenedor en segundo plano. Es **muy importante** usar el archivo `docker-compose.prod.yml`.

```sh
docker-compose -f docker-compose.prod.yml up -d --build
```

- `-f docker-compose.prod.yml`: Especifica que se debe usar el archivo de configuración de producción.
- `-d`: (Detached) Ejecuta el contenedor en segundo plano.
- `--build`: Fuerza la reconstrucción de la imagen de Docker, aplicando cualquier cambio reciente en el código.

¡Y eso es todo! El microservicio estará corriendo en el puerto especificado.

## Comandos Útiles de Docker

- **Ver los logs en tiempo real:**
  ```sh
  docker logs -f veciapp-communications-ms
  ```

- **Verificar que el contenedor está corriendo:**
  ```sh
  docker ps
  ```

- **Detener el servicio:**
  ```sh
  docker-compose -f docker-compose.prod.yml down
  ```

- **Iniciar el servicio (sin reconstruir la imagen):**
  ```sh
  docker-compose -f docker-compose.prod.yml up -d
  ```
