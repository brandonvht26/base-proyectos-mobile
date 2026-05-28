# SKILL: Patrón de Diseño y Sistema de UI — Base Proyectos

## Resumen

Este documento define el patrón de diseño visual y de comportamiento establecido en el proyecto tras la refactorización completa del módulo de autenticación. Sirve como referencia canónica para todo desarrollo futuro: nuevas pantallas, nuevos features y nuevas iteraciones de UI deben seguir estas reglas.

**Stack:** Expo SDK 54 · Expo Router 6 · React Native 0.81 · NativeWind 4 · Moti 0.30 · TanStack Query 5 · TanStack Form 1 · Zod 3 · Zustand 5 · Supabase JS 2 · sonner-native 0.24

---

## Arquitectura del Proyecto

```
base-proyectos/
├── app/
│   ├── _layout.tsx                  # Root: providers, auth guard (usePathname)
│   ├── index.tsx                    # Splash 2.5s + Welcome screen
│   ├── auth/
│   │   ├── _layout.tsx              # Auth stack (slide_from_right)
│   │   ├── login.tsx                # Wrapper → LoginScreen
│   │   ├── register.tsx             # Wrapper → RegisterScreen
│   │   └── forgot-password.tsx      # Wrapper → ForgotPasswordScreen
│   └── main/
│       ├── _layout.tsx
│       └── index.tsx                # Home placeholder
├── src/
│   ├── features/auth/
│   │   ├── application/use-cases/
│   │   ├── domain/ (entities, repositories, schemas)
│   │   ├── infrastructure/repositories/
│   │   └── presentation/
│   │       ├── components/AuthHeader.tsx
│   │       ├── hooks/useAuth.ts
│   │       ├── screens/ (LoginScreen, RegisterScreen, ForgotPasswordScreen)
│   │       └── store/authStore.ts
│   └── shared/
│       ├── domain/errors/AppError.ts
│       ├── infrastructure/supabase/client.ts
│       └── presentation/
│           ├── theme/colors.ts              # Design tokens centralizados
│           ├── components/ui/               # Button, Input, Divider, KeyboardAwareScrollView
│           └── utils/form.ts
├── assets/
│   └── fonts/ (GoogleSansFlex, Lato)
├── global.css                               # Variables CSS (Tailwind)
└── tailwind.config.js                       # NativeWind theme
```

---

## 1. Design Tokens — Archivo Centralizado

**Archivo:** `src/shared/presentation/theme/colors.ts`

Todos los colores del proyecto se importan desde este único archivo. Ningún componente debe tener colores hardcodeados (hex literales).

```ts
export const colors = {
    primary:      '#18181B',  // Zinc 900 — texto oscuro
    surface:      '#FFFFFF',  // Blanco puro — fondos
    accent:       '#4F46E5',  // Indigo 600 — botones, links, interacciones
    accentLight:  '#A5B4FC',  // Indigo 300 — estados disabled
    accentBg:     '#EEF2FF',  // Indigo 50  — fondos decorativos
    border:       '#E4E4E7',  // Zinc 200 — bordes sutiles
    borderLight:  '#F4F4F5',  // Zinc 100 — bordes disabled
    muted:        '#71717A',  // Zinc 500 — subtítulos, iconos inactivos
    mutedLight:   '#A1A1AA',  // Zinc 400 — placeholders
    danger:       '#EF4444',  // Red 500  — errores
    warning:       '#F59E0B', // Amber 500
    success:      '#10B981',  // Emerald 500

    bgUnfocused:  '#FAFAFA',  // Zinc 50  — inputs sin foco
    bgDisabled:   '#FAFAFA',  // Zinc 50  — botones disabled
    textPrimary:  '#18181B',  // Zinc 900
    textInverse:  '#FFFFFF',  // Blanco
    label:        '#52525B',  // Zinc 600 — labels de input
} as const;
```

**Uso obligatorio en todo componente:**
```ts
import { colors } from '<ruta-relativa>/theme/colors';
// Usar: colors.accent, colors.muted, colors.danger, etc.
```

**Archivos que consumen estos tokens:** `Button.tsx`, `Input.tsx`, `Divider.tsx`, `AuthHeader.tsx`, `LoginScreen.tsx`, `RegisterScreen.tsx`, `ForgotPasswordScreen.tsx`, `app/index.tsx`, `app/main/index.tsx`, `app/_layout.tsx`.

---

## 2. Paleta de Colores — Migración Completa

| Token CSS / Tailwind | Valor | Uso |
|---|---|---|
| `--color-primary` | `#18181B` | Zinc 900 — Texto oscuro |
| `--color-surface` | `#FFFFFF` | Fondos limpios |
| `--color-accent` | `#4F46E5` | Indigo 600 — Botones, links |
| `--color-border` | `#E4E4E7` | Zinc 200 — Bordes |
| `--color-muted` | `#71717A` | Zinc 500 — Subtítulos |
| `--color-danger` | `#EF4444` | Rojo — Errores |
| `--color-warning` | `#F59E0B` | Ámbar |
| `--color-success` | `#10B981` | Esmeralda |

Mapeo viejo → nuevo (referencia para migraciones futuras):
```
#2563EB → #4F46E5    #3B6FD4 → #4F46E5    #93C5FD → #A5B4FC
#E2E8F0 → #E4E4E7    #F8FAFC → #FAFAFA    #0F172A → #18181B
#475569 → #52525B    #64748B → #71717A    #94A3B8 → #A1A1AA
#EBF1FC → #EEF2FF    #8A8E94 → #71717A    #1E2A3A → #18181B
#CBD2DC → #E4E4E7    #F7F8FA → #FFFFFF    #D94F4F → #EF4444
#D4A017 → #F59E0B    #2E9E5B → #10B981
```

Archivos actualizados con la nueva paleta: `global.css`, `tailwind.config.js`, `app/_layout.tsx` (AppTheme + Toaster).

---

## 3. Patrón Visual de Pantallas Auth — Tarjeta Curva (Bottom Sheet)

**Este es EL patrón canónico para TODA pantalla de autenticación.**

```
┌──────────────────────────────────────┐
│ SafeAreaView (flex: 1, bg: accent)    │  ← fondo índigo completo
│                                      │
│   ┌──────────────────────────────┐   │
│   │ AuthHeader                   │   │  ← icono, título, subtítulo EN BLANCO
│   │  (icon, title, subtitle)     │   │     opcional: showBack (botón volver)
│   └──────────────────────────────┘   │
│                                      │
│ ╔══════════════════════════════════╗  │  ← tarjeta blanca con bordes
│ ║ View (flex: 1, bg: surface,     ║  │     superiores redondeados
│ ║  borderTopLeftRadius: 40,       ║  │     marginTop: -20 superpone
│ ║  borderTopRightRadius: 40,      ║  │     overflow: 'visible' evita
│ ║  marginTop: -20,                ║  │     recortar bordes de inputs
│ ║  overflow: 'visible',           ║  │
│ ║  paddingTop: 36,                ║  │
│ ║  paddingHorizontal: 28)         ║  │
│ ║                                 ║  │
│ ║   KeyboardAwareScrollView       ║  │  ← manejo de teclado (ver §4)
│ ║    ├── Inputs                   ║  │
│ ║    ├── Buttons                  ║  │
│ ║    └── Links de navegación      ║  │
│ ╚══════════════════════════════════╝  │
└──────────────────────────────────────┘
```

**Código estructural obligatorio para pantallas auth:**
```tsx
<SafeAreaView style={{ flex: 1, backgroundColor: colors.accent }}>
    <AuthHeader title="..." subtitle="..." icon="..." showBack />

    <View style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -20,
        paddingTop: 36,
        paddingHorizontal: 28,
        overflow: 'visible',                  // ← CRÍTICO: evita clipping de inputs
    }}>
        <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 32 }}
            extraScrollPadding={40}
        >
            {/* Inputs, botones, links */}
        </KeyboardAwareScrollView>
    </View>
</SafeAreaView>
```

**Reglas de este patrón:**
- El `SafeAreaView` tiene fondo `colors.accent` (índigo), NO blanco.
- `AuthHeader` recibe `showBack` en vez de un botón de retroceso independiente.
- La tarjeta blanca SIEMPRE tiene `overflow: 'visible'` para que los inputs animados no se recorten.
- `marginTop: -20` crea el efecto de superposición sobre el área azul.
- Todo el contenido scrolleable va dentro de `KeyboardAwareScrollView`.

---

## 4. Manejo de Teclado — KeyboardAwareScrollView

**Archivo:** `src/shared/presentation/components/ui/KeyboardAwareScrollView.tsx`

### Implementación actual (robusta, cross-platform)

```tsx
// iOS:     KeyboardAvoidingView (behavior="padding")
//          + Keyboard listener para paddingBottom dinámico
//          + auto scrollToEnd al enfocar input
// Android: View wrapper
//          + Keyboard listener para paddingBottom dinámico
//          + auto scrollToEnd al enfocar input
//          + softwareKeyboardLayoutMode: "resize" en app.json
```

**Mecanismo:**
1. `Keyboard.addListener` detecta cuándo aparece/desaparece el teclado.
2. Al aparecer: `setKeyboardPadding(keyboardHeight + extraScrollPadding)` y `scrollToEnd`.
3. Al desaparecer: restaura `paddingBottom` al valor base.
4. Esto funciona independientemente de la jerarquía de vistas — no depende de `KeyboardAvoidingView` estar en un ancestro específico ni de que el `borderRadius` no fuerce `overflow: hidden`.

**Props:**
```ts
interface KeyboardAwareScrollViewProps {
    children: ReactNode;
    contentContainerStyle?: ViewStyle;
    extraScrollPadding?: number;    // default: 40
    keyboardVerticalOffset?: number; // default: 0
}
```

**Uso obligatorio:** Toda pantalla que contenga `TextInput` debe usar este componente como contenedor de scroll. Reemplaza cualquier combinación manual de `KeyboardAvoidingView + ScrollView`.

**Configuración Android (`app.json`):**
```json
"android": {
    "softwareKeyboardLayoutMode": "resize"
}
```

---

## 5. Navegación Inteligente

### 5.1 Auth Guard (`app/_layout.tsx`)

Usa `usePathname()` (no `useSegments()`) para evitar conflictos con typed routes.

```ts
const pathname = usePathname();
const isIndex = pathname === '/';
const inAuthGroup = pathname.startsWith('/auth');

if (!user && !inAuthGroup && !isIndex) → router.replace('/auth/login')
if (user && inAuthGroup) → router.replace('/main')
```

La ruta `/` (index) está explícitamente excluida para permitir que el splash y welcome se muestren sin interrupción.

### 5.2 Flujos de navegación

| Evento | Comportamiento |
|--------|---------------|
| App inicia, sin sesión | Loading → Splash 2.5s → Welcome |
| App inicia, con sesión | Loading → Splash 2.5s → Redirect a `/main` |
| Login exitoso | Toast + `router.replace('/main')` |
| Registro exitoso | Toast + setUser + `router.replace('/main')` (auto-login) |
| Forgot password exitoso | Toast → 1.5s de espera → `router.replace('/auth/login')` |
| Logout | `router.replace('/auth/login')` |

### 5.3 Mapa de navegación

```
/ (index)
  ├─→ /auth/login         [Botón "Iniciar Sesión"]
  └─→ /auth/register      [Botón "Crear cuenta"]

/auth/login
  ├─→ /auth/register      [Link "¿No tienes cuenta?"]
  ├─→ /auth/forgot-password [Link "¿Olvidaste tu contraseña?"]
  └─→ /main               [Login exitoso]

/auth/register
  ├─→ /auth/login         [Link "¿Ya tienes cuenta?"]
  └─→ /main               [Registro exitoso]

/auth/forgot-password
  └─→ /auth/login         [1.5s post-éxito, router.replace]

/main
  └─→ /auth/login         [Logout]
```

---

## 6. Componentes UI Compartidos

### 6.1 Button (`src/shared/presentation/components/ui/Button.tsx`)

**Props:** `title`, `variant` (`'primary'|'outline'|'ghost'`), `loading`, `disabled`, `icon`, `onPress`.

**Comportamiento:**
- Efecto de aplastamiento: `withSpring(0.94)` con `damping: 15, stiffness: 300`.
- Haptic feedback: `Haptics.impactAsync(Light)`.
- Loading: muestra `ActivityIndicator` en vez del texto.
- Importa colores desde `theme/colors.ts`.

**Variantes:**
- `primary`: fondo `colors.accent`, texto blanco, sombra.
- `outline`: fondo blanco, borde `colors.border`, texto `colors.textPrimary`.
- `ghost`: transparente, texto `colors.accent`.

**Uso en Welcome:** Ambos botones usan `variant="primary"` (el usuario pidió explícitamente "botones morados").

### 6.2 Input (`src/shared/presentation/components/ui/Input.tsx`)

**Props:** `label`, `error`, `icon` (Ionicons), `isPassword`, `onBlur`, + todos los `TextInputProps`.

**Animaciones:**
- Al enfocar: `borderColor` cambia a `colors.accent`, `borderWidth` de 1 → 1.5, `shadowOpacity` de 0 → 0.1.
- Al error: borde y label en `colors.danger`.
- **NO tiene `scale`** — fue removido porque causaba clipping de bordes en la tarjeta curva.
- El wrapper tiene `overflow: 'visible'` explícito.
- La sombra en estado no enfocado usa `'transparent'` (no `#000`) para evitar artefactos.

### 6.3 Divider (`src/shared/presentation/components/ui/Divider.tsx`)

Línea horizontal con texto opcional centrado. Colores: `colors.border` para la línea, `colors.muted` para el texto.

### 6.4 AuthHeader (`src/features/auth/presentation/components/AuthHeader.tsx`)

**Props:** `title`, `subtitle`, `icon` (Ionicons), `showBack` (boolean).

**Estructura:**
- Sin SVG ni posicionamiento absoluto (eliminado por problemas de solapamiento).
- Ícono dentro de círculo con fondo semitransparente (`rgba(255,255,255,0.15)`).
- Título y subtítulo en blanco sobre el fondo índigo del `SafeAreaView`.
- Botón "Volver" integrado via `showBack` — no se renderiza un `Pressable` independiente en las pantallas.

---

## 7. Pantalla Welcome / Splash (`app/index.tsx`)

### Fase 1: Splash (2.5 segundos)
- Animación Moti pura (sin dependencia de Lottie).
- Logo "B" con rotación 360° + fade in del nombre "Base Proyectos" + subtítulo.
- El timer **no arranca hasta que `isLoading` (auth check) es `false`**, evitando que expire antes de tiempo.
- Fondo `colors.accent`.

### Fase 2: Welcome
- Misma estructura que las pantallas auth: área índigo superior + tarjeta blanca con `borderTopLeftRadius: 40`.
- Logo "B" en círculo semitransparente.
- Título "Bienvenido" en blanco, subtítulo en `colors.accentBg`.
- **Ambos botones usan el componente `Button` con `variant="primary"`** (fondo índigo):
  - "Iniciar Sesión" → `/auth/login`
  - "Crear cuenta" → `/auth/register`

### Lógica de renderizado
```tsx
if (isLoading)          → ActivityIndicator
if (showSplash)         → SplashScreen (Moti)
if (user)               → <Redirect href="/main" />
                        → WelcomeScreen
```

---

## 8. Validaciones Zod (`auth.schema.ts`)

**Contraseña:** 8-30 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número o símbolo.
**Nombre:** 2-40 caracteres, solo letras (incluye acentos españoles), espacios y apóstrofes.

---

## 9. Tipografía

| Rol | Fuente | Peso |
|-----|--------|------|
| Títulos / Encabezados | `GoogleSansFlex-Bold` | 700 |
| Botones | `GoogleSansFlex-Bold` | 700 |
| Texto cuerpo | `Lato-Regular` | 400 |
| Texto énfasis / Links | `Lato-Bold` | 700 |

Fuentes cargadas en `app/_layout.tsx` via `useFonts` de `expo-font`.

---

## 10. Checklist de Implementación

- [x] `src/shared/presentation/theme/colors.ts` — Design tokens centralizados
- [x] `KeyboardAwareScrollView.tsx` — Con Keyboard listeners nativos (iOS + Android)
- [x] `Button.tsx` — Migrado a `theme/colors`, spring + haptic
- [x] `Input.tsx` — Migrado a `theme/colors`, sin scale, `overflow: visible`
- [x] `Divider.tsx` — Migrado a `theme/colors`
- [x] `AuthHeader.tsx` — Simplificado (sin SVG), `showBack` integrado
- [x] `LoginScreen.tsx` — Patrón tarjeta curva + KeyboardAwareScrollView
- [x] `RegisterScreen.tsx` — Patrón tarjeta curva + KeyboardAwareScrollView
- [x] `ForgotPasswordScreen.tsx` — Patrón tarjeta curva + KeyboardAwareScrollView
- [x] `app/index.tsx` — Splash 2.5s (Moti) + Welcome con Button components
- [x] `app/main/index.tsx` — Migrado a `theme/colors`
- [x] `app/_layout.tsx` — Auth guard con `usePathname()`, AppTheme + Toaster nuevos
- [x] `useAuth.ts` — Navegación inteligente (1.5s forgot password, auto-login)
- [x] `auth.schema.ts` — Validaciones estrictas (contraseña + nombre)
- [x] `global.css` — Nueva paleta Zinc/Indigo
- [x] `tailwind.config.js` — Nuevos colores de theme
- [x] `app.json` — `softwareKeyboardLayoutMode: "resize"`
