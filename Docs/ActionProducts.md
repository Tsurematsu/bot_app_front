
# 📦 API de Productos (`/products`)

Esta API gestiona los productos asociados a cada usuario autenticado.
Todas las rutas requieren autenticación mediante `MidlewareClient`.

---

## 🔐 Autenticación

Todos los endpoints usan el middleware `MidlewareClient`, que valida al usuario y añade la información del mismo en el contexto como `c.get('user')`.

---

## 🧾 Endpoints

### **1. Crear producto**

**POST** `/products/add`

Crea un nuevo producto asociado al usuario autenticado.

#### 🔸 Body (JSON)

```json
{
  "nombre": "Camiseta negra",
  "descripcion": "Talla M, 100% algodón",
  "precio": "35000",
  "stock": "12"
}
```

#### 🔸 Respuesta (201)

```json
{
  "success": true,
  "text": "Producto registrado correctamente",
  "data": {
    "id": 1,
    "user_id": 5,
    "nombre": "Camiseta negra",
    "descripcion": "Talla M, 100% algodón",
    "precio": 35000,
    "stock": 12
  }
}
```

---

### **2. Listar productos**

**GET** `/products/list?limit=50&offset=0`

Obtiene todos los productos del usuario autenticado con soporte de paginación.

#### 🔸 Parámetros de consulta (Query)

| Parámetro | Tipo   | Descripción                             | Por defecto |
| --------- | ------ | --------------------------------------- | ----------- |
| `limit`   | number | Cantidad máxima de productos a devolver | 50          |
| `offset`  | number | Índice de inicio para la paginación     | 0           |

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "data": [ /* array de productos */ ],
  "pagination": {
    "total": 124,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### **3. Obtener producto por ID**

**POST** `/products/get`

Obtiene la información de un producto específico, siempre que pertenezca al usuario autenticado.

#### 🔸 Body (JSON)

```json
{
  "id": "1"
}
```

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 5,
    "nombre": "Camiseta negra",
    "descripcion": "Talla M, 100% algodón",
    "precio": 35000,
    "stock": 12
  }
}
```

#### 🔸 Errores posibles

* `400`: ID inválido
* `403`: No autorizado (producto no pertenece al usuario)
* `404`: Producto no encontrado

---

### **4. Buscar productos por nombre**

**POST** `/products/search`

Busca productos cuyo nombre coincida total o parcialmente con el texto proporcionado.

#### 🔸 Body (JSON)

```json
{
  "nombre": "camiseta"
}
```

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "data": [ /* productos encontrados */ ],
  "total": 3
}
```

#### 🔸 Errores posibles

* `400`: Nombre de búsqueda requerido

---

### **5. Actualizar producto**

**POST** `/products/update`

Permite modificar uno o varios campos de un producto existente.

#### 🔸 Body (JSON)

```json
{
  "id": "1",
  "nombre": "Camiseta gris",
  "precio": "38000"
}
```

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "text": "Producto actualizado correctamente",
  "data": {
    "id": 1,
    "nombre": "Camiseta gris",
    "precio": 38000,
    "stock": 12
  }
}
```

#### 🔸 Errores posibles

* `400`: ID inválido o sin campos para actualizar
* `404`: Producto no encontrado o no autorizado

---

### **6. Eliminar producto**

**POST** `/products/delete`

Elimina un producto perteneciente al usuario autenticado.

#### 🔸 Body (JSON)

```json
{
  "id": "1"
}
```

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "text": "Producto eliminado correctamente",
  "data": {
    "id": 1,
    "nombre": "Camiseta gris"
  }
}
```

#### 🔸 Errores posibles

* `400`: ID inválido
* `404`: Producto no encontrado o no autorizado

---

### **7. Actualizar stock**

**POST** `/products/update-stock`

Actualiza el stock de un producto sumando o restando unidades.

#### 🔸 Body (JSON)

```json
{
  "id": "1",
  "cantidad": "5"
}
```

> 🔹 Si `cantidad` es positiva, se suma al stock.
> 🔹 Si es negativa, se resta.

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "text": "Stock actualizado correctamente",
  "data": {
    "id": 1,
    "stock": 17
  }
}
```

#### 🔸 Errores posibles

* `400`: ID o cantidad inválida
* `404`: Producto no encontrado o no autorizado
* `400`: Stock resultante negativo

---

### **8. Productos con stock bajo**

**GET** `/products/low-stock?threshold=5`

Devuelve los productos cuyo stock sea menor o igual al umbral especificado.

#### 🔸 Parámetros de consulta (Query)

| Parámetro   | Tipo   | Descripción                                   | Por defecto |
| ----------- | ------ | --------------------------------------------- | ----------- |
| `threshold` | number | Límite máximo de stock para considerarlo bajo | 5           |

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "data": [ /* productos con stock bajo */ ],
  "total": 2,
  "threshold": 5
}
```

---

### **9. Obtener solo los nombres de los productos**

**GET** `/products/names`

Devuelve un arreglo con los nombres de todos los productos del usuario autenticado.

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "data": [
    "Camiseta negra",
    "Pantalón azul",
    "Chaqueta gris"
  ],
  "total": 3
}
```

---

### **10. Estadísticas de productos**

**GET** `/products/stats`

Devuelve estadísticas agregadas del inventario del usuario.

#### 🔸 Respuesta (200)

```json
{
  "success": true,
  "data": {
    "totalProductos": 42,
    "totalStock": 380,
    "valorInventario": 12450000,
    "precioPromedio": 29642.85
  }
}
```

---

## ⚠️ Posibles códigos de estado

| Código | Descripción                                        |
| ------ | -------------------------------------------------- |
| `200`  | Solicitud exitosa                                  |
| `201`  | Recurso creado exitosamente                        |
| `400`  | Solicitud inválida (datos incorrectos o faltantes) |
| `403`  | No autorizado                                      |
| `404`  | Recurso no encontrado                              |
| `500`  | Error interno del servidor                         |

---
