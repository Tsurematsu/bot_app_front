
# 🔐 API de Autenticación (`/auth`)

Esta API gestiona el **inicio de sesión**, **autenticación temporal** mediante **códigos de acceso** y la **creación de tokens** de sesión.
Todos los endpoints devuelven respuestas en formato JSON.

---

## 🧩 Dependencias principales

Estos endpoints hacen uso de los siguientes módulos internos:

* `validateAndFillNested`: Valida y rellena los campos requeridos en el cuerpo de la solicitud.
* `CryptoManager`: Maneja el cifrado y verificación de contraseñas.
* `TokenManager`: Genera y valida JWT o tokens personalizados.
* `CodeGenerator`: Crea códigos alfanuméricos temporales.
* `HTMLProcessor`: Carga y reemplaza variables en plantillas HTML.
* `AccessCodeDB`: Almacena códigos de acceso temporales con caducidad.
* `Gmail`: Envía correos electrónicos con el código o enlace de acceso.

---

## 🧾 Endpoints

---

### **1. Iniciar sesión (administrador)**

**POST** `/auth/login`

Permite iniciar sesión mediante usuario y contraseña.
Solo disponible para usuarios con rol `"admin"`.

#### 🔸 Body (JSON)

```json
{
  "username": "admin",
  "password": "123456"
}
```

#### 🔸 Respuesta (200)

```json
{
  "validPassword": true
}
```

#### 🔸 Cookies generadas

* `token`: Token de sesión (`token_into`) asociado al usuario autenticado.

#### 🔸 Errores posibles

* `400`: Campos faltantes o formato inválido.
* `404`: Usuario inválido o contraseña incorrecta.
* `403`: Acceso denegado (rol no autorizado).

---

### **2. Ingreso con token temporal**

**POST** `/auth/into`

Permite ingresar utilizando un **token temporal** (`temp_token`), generado previamente mediante `/make_access_code`.

#### 🔸 Body (JSON)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

#### 🔸 Respuesta (200)

```json
{
  "msg": "ok, are you logged!!"
}
```

#### 🔸 Cookies generadas

* `clientToken`: Token de sesión del cliente autenticado.

#### 🔸 Errores posibles

* `400`: Token inválido o faltante.
* `404`: Usuario no existe o token inválido.
* `403`: Inicio no autorizado.

---

### **3. Generar código de acceso**

**POST** `/auth/make_access_code`

Genera un **código de acceso temporal** (válido por 15 minutos) y un **token temporal**, y los envía por correo electrónico.

#### 🔸 Body (JSON)

```json
{
  "email": "usuario@dominio.com",
  "url": "https://miapp.com/auth?token=__token__"
}
```

> El marcador `__token__` en la URL será reemplazado automáticamente por el token temporal generado.

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "msg": "Codigo enviado a usuario@dominio.com"
}
```

#### 🔸 Ejemplo de correo enviado

```
Asunto: Código o enlace de ingreso
Hola [nombre_usuario],
Tu código de acceso es: 4D9F-QW2E
O haz clic en el siguiente enlace:
https://miapp.com/auth?token=eyJhbGciOiJI...
```

#### 🔸 Errores posibles

* `400`: Campos faltantes o formato incorrecto.
* `404`: Usuario no encontrado.
* `500`: Error al enviar el correo electrónico.

---

### **4. Ingreso con código o token**

**POST** `/auth/into_access_code`

Permite iniciar sesión utilizando **un código de acceso recibido por correo** o **un token temporal**.
Una vez validado, genera un token de sesión persistente (`clientToken`).

#### 🔸 Body (opción 1: código)

```json
{
  "email": "usuario@dominio.com",
  "code": "4D9F-QW2E",
  "token": ""
}
```

#### 🔸 Body (opción 2: token)

```json
{
  "email": "usuario@dominio.com",
  "code": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "msg": "Has iniciado session con el codigo"
}
```

ó

```json
{
  "success": true,
  "msg": "Has iniciado session con el token"
}
```

#### 🔸 Cookies generadas

* `clientToken`: Token de sesión del cliente autenticado.

#### 🔸 Errores posibles

* `400`: Campos faltantes.
* `404`: Usuario no encontrado.
* `403`: Código o token inválido.
* `500`: Error interno al generar sesión.

---

## ⚙️ Tokens y flujo de autenticación

| Etapa               | Descripción                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `/make_access_code` | Se envía un código + token temporal al correo del usuario.          |
| `/into_access_code` | Se valida el código o token temporal, y se genera un `clientToken`. |
| `/login`            | Ingreso directo (solo administradores) que genera `token_into`.     |
| `/into`             | Transforma un `temp_token` en un `clientToken` permanente.          |

---

## 🧁 Cookies utilizadas

| Cookie        | Descripción                                    | Generada en                  | Expira                           |
| ------------- | ---------------------------------------------- | ---------------------------- | -------------------------------- |
| `token`       | Token de sesión para administradores (`login`) | `/login`                     | Según configuración del servidor |
| `clientToken` | Token persistente para clientes                | `/into`, `/into_access_code` | Según configuración del servidor |

---

## ⚠️ Códigos de estado

| Código | Descripción                 |
| ------ | --------------------------- |
| `200`  | Solicitud exitosa           |
| `400`  | Datos inválidos o faltantes |
| `403`  | Acceso no autorizado        |
| `404`  | Usuario no encontrado       |
| `500`  | Error interno del servidor  |

---

