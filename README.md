🛒 CyberStore (eGalaxify)

Aplicación fullstack de e-commerce desarrollada con Angular + .NET (C#) + SQL Server, enfocada en demostrar habilidades reales de desarrollo para entornos profesionales.

🚀 Funcionalidades
👤 Autenticación y usuarios
Registro de usuarios
Login con JWT
Manejo de roles:
USER
ADMIN

🛍️ Cliente (USER)
Visualización de catálogo de productos
Carrito de compras dinámico (contador reactivo)
Proceso de checkout
Generación de órdenes

🛠️ Administrador (ADMIN)
CRUD completo de productos
Visualización de órdenes
Relación de órdenes con usuario y detalle de compra

✅ UI & Validaciones
Validaciones en formularios
Mensajes dinámicos:
éxito
error

🧰 Tecnologías utilizadas
Frontend
Angular
Backend
ASP.NET Core Web API
Entity Framework Core
Base de datos
SQL Server

⚙️ Instalación y ejecución

🔧 Backend
dotnet run

💻 Frontend
npm install
ng serve

👥 Roles de prueba
Rol	Permisos
USER	Compra de productos
ADMIN	Gestión de productos y órdenes

🗄️ Base de datos

La base de datos es gestionada mediante Entity Framework Core (Code First).

Para inicializarla correctamente, ejecutar:

dotnet ef database update (o crear la bd manualmente en sqlserver con el nombre que se ve en el proyecto)

Esto creará la base de datos y sus tablas automáticamente.

🧪 Datos iniciales

⚠️ La base de datos no incluye datos precargados automáticamente.
Es necesario insertar manualmente usuarios y productos de prueba (incluyendo un usuario con rol ADMIN) para utilizar todas las funcionalidades del sistema.
📌 Estado del proyecto

✔ Funcional como MVP
✔ Arquitectura fullstack completa
✔ Preparado para demostración técnica

🚧 Mejoras futuras (V2)
Implementación de pagos (simulación)
CRUD completo de usuarios
Mejoras en UI/UX
Optimización de manejo de estado
Seguridad avanzada

🎯 Objetivo

Proyecto desarrollado como práctica profesional para consolidar conocimientos en desarrollo fullstack y servir como parte de portafolio para oportunidades laborales junior.
