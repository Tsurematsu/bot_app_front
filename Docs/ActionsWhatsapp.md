
# 📘 **Documentación del módulo WhatsApp AI**

### **Ruta base**
```
/api/whatsapp
```

> Todos los endpoints de este módulo usan `MidlewareClient`, el cual autentica la solicitud y añade al contexto `c.get("user")` un objeto `UserData`.

---

## 🔐 **Autenticación requerida**

**Middleware:** `MidlewareClient`

El middleware valida el token del usuario y adjunta la información del usuario autenticado:

```ts
interface UserData {
  id: string;
  name: string;
  telefono: string;
  email: string;
  api_key?: string[];
  contexto?: any;
}
```

El nombre del usuario (`name`) se decodifica con `CryptoManager.decodeWeak()` antes de usarse.

---

## ⚙️ **Descripción general**

Este módulo permite controlar un **bot de WhatsApp AI** personalizado por usuario.  
Cada usuario puede tener **una instancia activa** (`WhatsappAiModule`), almacenada en memoria en `listWhatsApp`.

El bot corre como **proceso hijo** y mantiene su propio estado interno (app, login, escucha, etc.).

---

## 📍 **Endpoints**

---

### **1️⃣ POST /make**
Crea un nuevo bot o reutiliza uno existente.

**Descripción:**  
Inicializa un proceso del módulo `WhatsappAiModule` asociado al número de teléfono del usuario.  
Si el usuario ya tiene un bot en ejecución, simplemente devuelve su existencia.

**Request**
```
POST /api/whatsapp/make
Headers:
  Authorization: Bearer <token>
```
*(sin cuerpo de petición)*

**Proceso interno**
- Busca al usuario por su `id` (`User.findById`).
- Construye un objeto `IntoData` con:
  ```ts
  {
    name, telefono, email, apiKeys, context
  }
  ```
- Instancia un nuevo `WhatsappAiModule` y lo asocia a `listWhatsApp[telefono]`.

**Respuestas**
| Código | Respuesta | Descripción |
|--------|------------|--------------|
| 200 | `{ "succes": true, "status": "creando servicio", "exist": false }` | Bot creado e inicializado |
| 200 | `{ "succes": true, "status": "servicio creado", "exist": true }` | Ya existía una instancia activa |

---

### **2️⃣ GET /status**
Obtiene el estado actual del bot del usuario.

**Descripción:**  
Devuelve el estado de ejecución del proceso hijo (`WhatsappAiModule`), incluyendo sus propiedades públicas (`App`, `Login`, `Code`, `Listen`, etc.).

**Request**
```
GET /api/whatsapp/status
Headers:
  Authorization: Bearer <token>
```

**Respuestas**
| Código | Ejemplo | Descripción |
|--------|----------|-------------|
| 200 | `{ "succes": true, "status": { "log": "...", "app": "on", "login": true, "code": "", "listen": "running", "isRunning": true }}` | Estado actual del bot |
| 200 | `{ "succes": false, "status": "El usuario no tiene un bot activo" }` | No hay bot activo |

---

### **3️⃣ GET /link**
Conecta o vincula el bot manualmente.

**Descripción:**  
Ejecuta el método `link()` del bot (probablemente usado para volver a enlazar la sesión o regenerar un código QR).

**Request**
```
GET /api/whatsapp/link
Headers:
  Authorization: Bearer <token>
```

**Respuestas**
| Código | Ejemplo | Descripción |
|--------|----------|-------------|
| 200 | `{ "succes": true, "status": "se ha apagado el bot" }` | (Mensaje heredado — se recomienda cambiar a “enlace iniciado”) |
| 200 | `{ "succes": false, "status": "El usuario no tiene un bot activo" }` | No existe bot activo |

---

### **4️⃣ GET /kill**
Detiene y elimina el bot de la memoria.

**Descripción:**  
Ejecuta `kill()` en la instancia del bot, finalizando el proceso hijo y reseteando todos los estados internos.

**Request**
```
GET /api/whatsapp/kill
Headers:
  Authorization: Bearer <token>
```

**Respuestas**
| Código | Ejemplo | Descripción |
|--------|----------|-------------|
| 200 | `{ "succes": true, "status": "se ha apagado el bot" }` | Bot finalizado correctamente |
| 200 | `{ "succes": false, "status": "El usuario no tiene un bot activo" }` | No existe bot para detener |

---

### **5️⃣ GET /start**
Inicia el bot existente.

**Descripción:**  
Envía el evento `"start"` al proceso hijo del bot, reiniciando su ciclo de escucha.

**Request**
```
GET /api/whatsapp/start
Headers:
  Authorization: Bearer <token>
```

**Respuestas**
| Código | Ejemplo | Descripción |
|--------|----------|-------------|
| 200 | `{ "succes": true, "status": "se ha apagado el bot" }` | (Mensaje heredado — se recomienda cambiar a “bot iniciado correctamente”) |
| 200 | `{ "succes": false, "status": "El usuario no tiene un bot activo" }` | No hay bot activo |

---

### **6️⃣ GET /stop**
Detiene temporalmente el bot (sin eliminarlo).

**Descripción:**  
Envía el evento `"stop"` al proceso hijo, deteniendo temporalmente el flujo del bot sin matarlo.

**Request**
```
GET /api/whatsapp/stop
Headers:
  Authorization: Bearer <token>
```

**Respuestas**
| Código | Ejemplo | Descripción |
|--------|----------|-------------|
| 200 | `{ "succes": true, "status": "se ha apagado el bot" }` | (Mensaje heredado — se recomienda cambiar a “bot detenido correctamente”) |
| 200 | `{ "succes": false, "status": "El usuario no tiene un bot activo" }` | No hay bot activo |

---

## 🧠 **Clase relacionada: WhatsappAiModule**

Esta clase maneja la comunicación con el proceso hijo `WhatsappAi.ts`, encargado de la ejecución del bot de WhatsApp.

### **Constructor**
```ts
new WhatsappAiModule(intoData: IntoData)
```

Inicializa un proceso hijo con `child_process.fork()` y configura comunicación bidireccional.

### **Propiedades**
| Propiedad | Tipo | Descripción |
|------------|------|-------------|
| `Log` | `string` | Último mensaje registrado |
| `App` | `"off" \| "loading" \| "on"` | Estado general del bot |
| `Login` | `boolean \| null` | Estado del login |
| `Code` | `string` | Código de autenticación (QR u otro) |
| `Listen` | `"off" \| "loading" \| "waiting" \| "running"` | Estado de escucha de mensajes |
| `child` | `ChildProcess \| null` | Proceso hijo en ejecución |

### **Métodos públicos**
| Método | Descripción |
|--------|--------------|
| `start()` | Inicia el bot (envía evento `"start"`) |
| `stop()` | Detiene temporalmente el bot |
| `link()` | Relanza la conexión de enlace (login QR, etc.) |
| `kill()` | Termina el proceso hijo y limpia los estados |
| `restart()` | Mata y reinicia el proceso hijo completo |
| `getStatus()` | Devuelve todos los estados actuales |

---

### **Ejemplo de respuesta de `getStatus()`**
```json
{
  "log": "Esperando conexión a WhatsApp",
  "app": "on",
  "login": true,
  "code": "",
  "listen": "running",
  "isRunning": true
}
```

---

## 🧩 **Recomendaciones**
- Cambiar las respuestas de texto fijo (“se ha apagado el bot”) por mensajes acordes a la acción.
- Agregar un endpoint `/restart` que invoque `userBot.restart()`.
- Implementar un sistema persistente (por ejemplo, Redis o DB) para mantener los bots entre reinicios del servidor.
- Añadir esquema OpenAPI para facilitar la documentación automática.

---
