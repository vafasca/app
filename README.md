# 🌸 Flores, Gatitos y Shawarma 🐱🌯

Una novela visual interactiva sobre el amor, las decisiones y el crecimiento personal.

## 🎮 Juega Ahora

**[👉 Jugar en línea](https://eittpsyg7ld3s.ok.kimi.link)**

## 📖 Sinopsis

En tu cumpleaños número 18, mientras disfrutas de flores frescas, un gatito curioso y un delicioso shawarma, tu corazón te lleva a reflexionar sobre historias pasadas. Cinco personajes de diferentes culturas representan diferentes tipos de relaciones tóxicas y el amor verdadero que finalmente llegó.

### 🎭 Las Historias

| Personaje | País | Tema | Trama |
|-----------|------|------|-------|
| **Aamir** 🇵🇰 | Pakistán | Abandono emocional | Prefería a sus amigos/familia, nunca la priorizó |
| **Arjun** 🇮🇳 | India | Abandono en crisis | La dejó sola cuando más lo necesitaba, volvió tarde |
| **Hiro** 🇯🇵 | Japón | Uso y manipulación | La usaba para su placer, la manipulaba emocionalmente |
| **Mikhail** 🇷🇺 | Rusia | Ausencia de protección | Estaba cerca físicamente pero nunca la defendió |
| **Bruno** 🇵🇪 | Perú | ❤️ Amor verdadero | La ama, la protege, nunca la abandona |

### 🐾 Nuestra Familia
- **Tima** 🐱 - Gatita blanca con gris
- **Thor** 🐕 - Perro negro lobo

### 💑 Los Protagonistas
- **Dasha** 👩 - La protagonista, desde Rusia
- **Bruno** 👨 - Su amor verdadero, desde Perú

Tus decisiones afectan cuatro variables clave:
- **Confianza** 🤝
- **Complicidad** 💕
- **Autonomía** 🦋
- **Humor** 😄

## ✨ Características

- 🌍 **Bilingüe**: Disponible en Español y Ruso
- 💾 **Guardado automático**: Continúa tu partida cuando quieras
- 📱 **Responsive**: Diseñado para móvil primero, funciona en cualquier dispositivo
- 🎨 **Arte original**: Fondos y personajes generados con IA
- 🎭 **Historias expandidas**: 45+ nodos con tramas profundas y emotivas
- 💔 **Finales tristes realistas**: Cada ex tiene su propio final detallado
- 🔥 **Escenas íntimas**: Momentos candentes y apasionados con Bruno
- ❤️ **Final especial**: Ruta de Perú con botón "Ver nuestras fotos"
- 📸 **Galería de fotos**: Sistema de fotos personalizable para el final
- 🖼️ **Menú personalizado**: Fondo de Kemerovo con Dasha y Bruno
- 📜 **Scroll en diálogo**: Texto largo con scroll para mejor lectura
- ♿ **Accesible**: Compatible con lectores de pantalla

## 🛠️ Tecnologías

- **React + TypeScript + Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **localStorage** para guardado

## 📁 Estructura del Proyecto

```
├── public/
│   ├── story.json          # Historia y diálogos
│   └── assets/
│       ├── backgrounds/    # Fondos de escenas
│       ├── characters/     # Personajes (PNG transparente)
│       └── ui/             # Elementos de UI
├── src/
│   ├── components/         # Componentes React
│   ├── hooks/              # Hooks personalizados
│   ├── types/              # Tipos TypeScript
│   └── App.tsx             # App principal
└── dist/                   # Build para producción
```

## 🚀 Despliegue en GitHub Pages

1. **Crea un repositorio en GitHub**

2. **Sube el contenido de la carpeta `dist/`**
   ```bash
   cd dist
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

3. **Configura GitHub Pages**
   - Ve a Settings > Pages
   - Selecciona "Deploy from a branch"
   - Selecciona la rama "main" y carpeta "/ (root)"
   - Guarda y espera unos minutos

4. **Tu juego estará disponible en**: `https://TU_USUARIO.github.io/TU_REPO`

## 📝 Personalización

### Modificar la historia

Edita el archivo `public/story.json`:

```json
{
  "start": "intro",
  "characters": { ... },
  "nodes": {
    "intro": {
      "title": "Título de escena",
      "background": "assets/backgrounds/imagen.jpg",
      "character": "id_personaje",
      "text_es": "Texto en español",
      "text_ru": "Texto en ruso",
      "choices": [
        {
          "text_es": "Opción 1",
          "text_ru": "Вариант 1",
          "next": "siguiente_nodo",
          "effects": { "confianza": 10 }
        }
      ]
    }
  }
}
```

### Cambiar imágenes

Reemplaza los archivos en:
- `public/assets/backgrounds/` - Fondos (recomendado 16:9)
- `public/assets/characters/` - Personajes (PNG con transparencia)
- `public/assets/ui/` - Elementos de UI

### 📸 Personalizar las fotos del final especial (Perú)

Para la ruta de Perú, hay un **final especial** con fotos de la pareja. Para personalizarlas:

1. Reemplaza estos archivos con tus fotos reales:
   - `public/assets/ui/photo_placeholder_1.png` - Foto de la pareja
   - `public/assets/ui/photo_placeholder_2.png` - Foto de Tima y Thor

2. Las fotos deben ser:
   - Formato: PNG o JPG
   - Ratio recomendado: 3:4 (vertical)
   - Tamaño: ~800x1000px o similar

3. Rebuild y redeploy:
   ```bash
   npm run build
   # Copiar public/ a dist/ y deploy
   ```

### Agregar nuevos idiomas

1. Agrega traducciones en `story.json` (ej: `text_en`, `text_fr`)
2. Actualiza el tipo `Language` en `src/types/game.ts`
3. Modifica el selector de idioma en los componentes

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Rosa Claro | `#FFD6E8` | Fondos |
| Rosa Principal | `#FF69B4` | Acentos, botones |
| Rosa Suave | `#FFC0CB` | Detalles |
| Crema | `#FFF0F5` | Fondo general |
| Texto Oscuro | `#5B3750` | Texto principal |

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 480px (diseño principal)
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo, modificarlo y distribuirlo.

---

**Creado con ❤️ y mucho ☕**

*¿Preguntas o sugerencias? Abre un issue en GitHub.*
