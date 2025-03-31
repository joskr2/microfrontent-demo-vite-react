# Pokémon Microfrontends Project

```markdown:/Users/josuepatricio/Desktop/microfrontends-project/README.md
# Pokémon Microfrontends Project

Una aplicación de Pokémon construida con arquitectura de microfrontends usando Vite, React, TypeScript y Bun.

## Estructura del Proyecto

- **Shell**: Aplicación principal que actúa como contenedor
- **Microfrontend1**: Contiene el detalle de Pokémon
- **Microfrontend2**: Contiene la vista de Pokémon recientes

## Requisitos

- [Bun](https://bun.sh/) v1.0.0 o superior
- Node.js v18 o superior

## Instalación

Clona el repositorio e instala las dependencias en cada proyecto:

```bash
# Instalar dependencias en Shell
cd /Users/josuepatricio/Desktop/microfrontends-project/shell
bun install

# Instalar dependencias en Microfrontend1
cd /Users/josuepatricio/Desktop/microfrontends-project/microfrontend1
bun install

# Instalar dependencias en Microfrontend2
cd /Users/josuepatricio/Desktop/microfrontends-project/microfrontend2
bun install
```

## Desarrollo Local

Ejecuta cada aplicación en una terminal separada:

```bash
# Terminal 1: Shell
cd /Users/josuepatricio/Desktop/microfrontends-project/shell
bun run dev

# Terminal 2: Microfrontend1
cd /Users/josuepatricio/Desktop/microfrontends-project/microfrontend1
bun run dev

# Terminal 3: Microfrontend2
cd /Users/josuepatricio/Desktop/microfrontends-project/microfrontend2
bun run dev
```

Accede a la aplicación en:
- Shell: http://localhost:3000
- Microfrontend1: http://localhost:3001
- Microfrontend2: http://localhost:3002

## Construcción para Producción

```bash
# Construir Shell
cd /Users/josuepatricio/Desktop/microfrontends-project/shell
bun run build

# Construir Microfrontend1
cd /Users/josuepatricio/Desktop/microfrontends-project/microfrontend1
bun run build

# Construir Microfrontend2
cd /Users/josuepatricio/Desktop/microfrontends-project/microfrontend2
bun run build
```

## Tecnologías Utilizadas

- Vite
- React 19
- TypeScript
- Redux Toolkit
- Module Federation
- TailwindCSS
- Bun
```

```

## Capturas de pantalla

<img width="1554" alt="Screenshot 2025-03-31 at 12 21 53" src="https://github.com/user-attachments/assets/763b3a1c-f7c9-472a-a130-fc437cf986fc" />
<img width="1564" alt="Screenshot 2025-03-31 at 12 22 01" src="https://github.com/user-attachments/assets/41a2908d-53db-4a16-a253-43cc22cbe021" />
<img width="1514" alt="Screenshot 2025-03-31 at 12 22 12" src="https://github.com/user-attachments/assets/805d23ff-6ad3-4aff-80f4-00036c21e011" />
<img width="1680" alt="Screenshot 2025-03-31 at 12 23 14" src="https://github.com/user-attachments/assets/b0320dbe-1585-4422-987b-09325c410978" />
<img width="326" alt="Screenshot 2025-03-31 at 12 23 35" src="https://github.com/user-attachments/assets/01239248-ab09-4486-9475-8d07bb899751" />
<img width="327" alt="Screenshot 2025-03-31 at 12 23 51" src="https://github.com/user-attachments/assets/9c9212ea-e033-4b59-b856-17bac5b321db" />

```
