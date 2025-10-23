# Sistema de Internacionalización (i18n)

Este proyecto utiliza **i18next** con **react-i18next** para soportar múltiples idiomas.

## 📁 Estructura de archivos

```
src/
  ├── i18n/
  │   └── config.ts          # Configuración de i18next
  ├── locales/
  │   ├── en/
  │   │   └── translation.json  # Traducciones en inglés
  │   └── es/
  │       └── translation.json  # Traducciones en español
  ├── hooks/
  │   └── useLanguage.ts     # Hook personalizado para gestionar idioma
  └── components/
      └── LanguageSwitcher.tsx  # Botón para cambiar idioma
```

## 🚀 Uso básico

### 1. En componentes

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
};
```

### 2. Con interpolación (variables)

```tsx
// En translation.json:
// "welcome": "Bienvenido, {{name}}!"

const { t } = useTranslation();
<p>{t('welcome', { name: 'Alejandro' })}</p>
// Resultado: "Bienvenido, Alejandro!"
```

### 3. Con HTML

```tsx
// En translation.json:
// "description": "Soy un <strong>desarrollador</strong>"

const { t } = useTranslation();
<p dangerouslySetInnerHTML={{ __html: t('description') }} />
```

## 🌍 Idiomas soportados

- **Español (es)** - Idioma por defecto
- **Inglés (en)**

## 🔄 Cambio de idioma

El idioma se puede cambiar de 3 formas:

1. **Botón en la UI**: Usando el componente `<LanguageSwitcher />`
2. **Detección automática**: El sistema detecta el idioma del navegador
3. **localStorage**: El idioma seleccionado se guarda automáticamente

## 📝 Agregar nuevas traducciones

1. Abre los archivos en `src/locales/[idioma]/translation.json`
2. Agrega tu nueva clave:

```json
{
  "newSection": {
    "title": "Mi nuevo título",
    "description": "Mi descripción"
  }
}
```

3. Úsalo en tu componente:

```tsx
<h1>{t('newSection.title')}</h1>
```

## ⚙️ Configuración

La configuración se encuentra en `src/i18n/config.ts`:

```typescript
i18n.init({
  fallbackLng: 'es',  // Idioma por defecto si falla la detección
  lng: 'es',          // Idioma inicial
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage']
  }
});
```

## 🎨 Componentes actualizados

Los siguientes componentes ya tienen soporte de traducciones:

- ✅ `Header.tsx` - Navegación
- ✅ `HomeSection.tsx` - Sección de inicio
- ✅ `WorkSection.tsx` - Sección de trabajos
- ✅ `AboutSection.tsx` - Sección acerca de
- ✅ `ContactSection.tsx` - Sección de contacto

## 🔗 Recursos

- [Documentación de i18next](https://www.i18next.com/)
- [Documentación de react-i18next](https://react.i18next.com/)
