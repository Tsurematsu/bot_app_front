# Documentación API - ActionsPoints

## Descripción General
API para gestión de usuarios, empresas y productos con integración de chatbot mediante Gemini AI.

---

## Base URL
```
/api
```

---

## Autenticación

### Tipos de Middleware
- **MidlewareAdmin**: Requiere rol de administrador
- **MidlewareClient**: Requiere rol de cliente

Los tokens deben enviarse en el header de autorización:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Home Admin
Verifica acceso de administrador.

**Endpoint:** `POST /home`

**Autenticación:** `MidlewareAdmin` (Requiere rol admin)

**Request:**
```json
{}
```

**Response Exitoso (200):**
```json
{
  "success": true,
  "text": "Bienvenido, eres administrador"
}
```

---

### 2. Client Access
Verifica acceso de cliente.

**Endpoint:** `POST /client`

**Autenticación:** `MidlewareClient` (Requiere rol client)

**Request:**
```json
{}
```

**Response Exitoso (200):**
```json
{
  "success": true,
  "text": "Bienvenido, eres cliente"
}
```

---

### 3. Generar Contexto para Chatbot
Genera un SystemPrompt personalizado para el chatbot de la empresa basado en su información y productos.

**Endpoint:** `POST /makeContext`

**Autenticación:** `MidlewareClient`

**Request:**
```json
{}
```

**Response Exitoso (200):**
```json
{
  "success": true,
  "context": "Eres un asistente virtual de [Nombre Empresa]...",
  "metadata": {
    "empresa": "Tienda El Ahorro",
    "productos_count": 15
  }
}
```

**Descripción:**
- Lee la información de la empresa del usuario autenticado
- Obtiene todos los productos registrados
- Utiliza Gemini AI para generar un SystemPrompt personalizado
- Retorna el contexto listo para usar en el chatbot

**Notas:**
- Si no hay información de empresa, usa valores por defecto ("Sin nombre", "Sin especificar", etc.)
- Si no hay productos, indica "No hay productos registrados"

---

### 4. Actualizar Información de Empresa
Actualiza la información de la empresa y crea productos con solo el nombre.

**Endpoint:** `POST /updateCompanyInfo`

**Autenticación:** `MidlewareClient`

**Request:**
```json
{
  "empresa_nombre": "Tienda El Ahorro",
  "empresa_tipo": "SAS",
  "empresa_descripcion": "Tienda de abarrotes y productos de primera necesidad",
  "productos": ["Arroz", "Frijol", "Aceite", "Azúcar", "Sal", "Pasta"]
}
```

**Response Exitoso (200):**
```json
{
  "success": true,
  "message": "Información de empresa actualizada",
  "empresa": {
    "empresa_nombre": "Tienda El Ahorro",
    "empresa_tipo": "SAS",
    "empresa_descripcion": "Tienda de abarrotes y productos de primera necesidad"
  },
  "productos_creados": 6
}
```

**Validaciones:**
- Todos los campos son requeridos
- Los nombres de productos vacíos son ignorados
- Los productos se crean con valores por defecto:
  - `descripcion`: cadena vacía
  - `precio`: 0
  - `stock`: 0

**Errores:**
```json
{
  "error": "Se esperaba: [empresa_nombre, empresa_tipo, empresa_descripcion, productos]"
}
```

---

### 5. Crear Cliente
Crea o actualiza un cliente en el sistema.

**Endpoint:** `POST /makeClient`

**Autenticación:** `MidlewareAdmin` (Solo administradores)

**Request:**
```json
{
  "username": "Juan Pérez",
  "email": "juan.perez@example.com",
  "telefono": "+57 300 123 4567",
  "apiKeys": ["key1", "key2"]
}
```

**Response Exitoso (200):**

**Usuario Nuevo:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "exist": false
}
```

**Usuario Existente (Actualizado):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "exist": true
}
```

**Descripción:**
- Limpia usuarios inactivos antes de crear/actualizar
- Normaliza el número de teléfono (formato colombiano: 57XXXXXXXXXX)
- Encripta el nombre de usuario
- Genera un `temp_token` válido
- Si el usuario existe (por email o teléfono), actualiza su información
- Si no existe, crea uno nuevo con rol "client"

**Validaciones:**
- Teléfono se normaliza automáticamente:
  - Elimina "+57" y espacios
  - Agrega prefijo "57" si no lo tiene
  - Formato final: `57XXXXXXXXXX`

**Estados del Usuario Creado:**
- `active`: "false" (debe activarse posteriormente)
- `valid_temp_token`: "true"
- `role`: "client"
- `token_into`: "" (vacío inicialmente)

**Errores:**
```json
{
  "error": "No autorizado"
}
```
```json
{
  "error": "Se esperaba: [username, email, telefono, apiKeys]"
}
```

---

## Rutas Adicionales

### WhatsApp Actions
```
/whatsapp/*
```
Gestión de integraciones con WhatsApp (Ver documentación de `ActionsWhatsapp`)

### Products Actions
```
/products/*
```
Gestión completa de productos (Ver documentación de `ActionsProducts`)

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 400 | Datos inválidos o incompletos |
| 401 | No autenticado |
| 403 | No autorizado (rol incorrecto) |
| 500 | Error del servidor |

---

## Modelos de Datos

### UserData
```typescript
{
  id?: number
  name?: string                    // Encriptado
  email?: string                   // Único
  telefono?: string                // Único, formato: 57XXXXXXXXXX
  id_device?: string               // Único
  password_hash?: string
  token_into?: string
  role?: 'admin' | 'client'
  created_at?: Date
  temp_token?: string
  valid_temp_token?: string        // 'true' | 'false'
  active?: string                  // 'true' | 'false'
  permisos?: string
  contexto?: string
  api_key?: string[]
  empresa_nombre?: string
  empresa_tipo?: string
  empresa_descripcion?: string
}
```

### ProductoData
```typescript
{
  id?: number
  user_id?: number
  nombre?: string
  descripcion?: string
  precio?: number
  stock?: number
  created_at?: Date
}
```

---

## Notas Importantes

1. **Limpieza Automática**: El endpoint `/makeClient` ejecuta limpieza de usuarios inactivos (más de 15 minutos sin activar)

2. **Tokens Temporales**: Los `temp_token` generados son válidos hasta que el usuario se active

3. **Normalización de Teléfonos**: Todos los teléfonos se normalizan al formato colombiano (57XXXXXXXXXX)

4. **Encriptación**: Los nombres de usuario se encriptan usando `CryptoManager.encodeWeak()`

5. **API Keys**: Se pueden asignar múltiples API keys a un usuario durante su creación o actualización

6. **Gemini AI**: El endpoint `/makeContext` utiliza un archivo de instrucciones (`Instrucciones.txt`) para configurar el comportamiento de Gemini

---

## Ejemplos de Uso

### Flujo Completo: Crear Cliente y Configurar Empresa

```bash
# 1. Admin crea un cliente
curl -X POST https://api.ejemplo.com/makeClient \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "María García",
    "email": "maria@tienda.com",
    "telefono": "300 123 4567",
    "apiKeys": []
  }'

# Response: { "token": "CLIENT_TEMP_TOKEN", "exist": false }

# 2. Cliente actualiza información de empresa
curl -X POST https://api.ejemplo.com/updateCompanyInfo \
  -H "Authorization: Bearer CLIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "empresa_nombre": "Tienda Doña María",
    "empresa_tipo": "Individual",
    "empresa_descripcion": "Venta de productos de aseo y papelería",
    "productos": ["Jabón", "Detergente", "Cuadernos", "Lápices"]
  }'

# 3. Cliente genera contexto para chatbot
curl -X POST https://api.ejemplo.com/makeContext \
  -H "Authorization: Bearer CLIENT_TOKEN" \
  -H "Content-Type: application/json"

# Response: SystemPrompt personalizado listo para usar
```

---

## Variables de Entorno Requeridas

```env
GEMINI_API_KEY_ADMIN=your_gemini_api_key_here
```

---

## Dependencias

- **Hono**: Framework web
- **Gemini AI**: Generación de contexto para chatbot
- **PostgreSQL**: Base de datos
- **JWT**: Autenticación con tokens
- **CryptoManager**: Encriptación de datos
- **CodeGenerator**: Generación de códigos aleatorios

---

## Contacto y Soporte

Para más información sobre los endpoints de productos y WhatsApp, consulte sus respectivas documentaciones.