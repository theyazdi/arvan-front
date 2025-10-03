# Design System Rules - آرون تراول (Arun Travel)

## Overview
This is a Persian travel agency website built with Next.js 14, featuring a comprehensive design system using UnoCSS, Shadcn/ui components, and custom Persian typography.

## 1. Design Token Definitions

### Color System
The project uses a sophisticated color system based on OKLCH color space for better perceptual uniformity:

**Location**: `src/styles/uno.css` (lines 14-82)

```css
:root {
  --background: 1 0 0;           /* White background */
  --foreground: 0.141 0.005 285.823; /* Dark text */
  --primary: 0.21 0.006 285.885;     /* Brand primary */
  --secondary: 0.967 0.001 286.375;  /* Light secondary */
  --accent: 0.967 0.001 286.375;     /* Accent color */
  --destructive: 0.577 0.245 27.325;  /* Error/delete */
  --border: 0.92 0.004 286.32;        /* Border color */
  --radius: 0.5rem;                   /* Border radius */
}
```

**Usage Pattern**:
```tsx
// Use CSS variables with oklch() function
className="bg-background text-foreground border-border"
```

### Typography System
**Location**: `src/app/layout.tsx` (lines 10-102)

**Font Stack**:
- Primary: YekanBakhFaNum (Persian numerals)
- Secondary: YekanBakh (Persian text)
- Fallback: Segoe UI, Tahoma, Geneva, Verdana

**Font Weights Available**:
- 100 (Thin)
- 300 (Light) 
- 400 (Regular)
- 600 (SemiBold)
- 700 (Bold)
- 800 (ExtraBold)
- 900 (Black)
- 950 (ExtraBlack)

**Usage Pattern**:
```tsx
className="font-yekan text-lg font-bold"
```

### Spacing System
**Location**: `unocss.config.ts` (lines 43-79)

**Spacing Scale** (rem-based):
- 0-20: 0.125rem increments
- 24-96: 1rem increments

**Usage Pattern**:
```tsx
className="p-4 m-8 gap-6" // padding-1rem, margin-2rem, gap-1.5rem
```

## 2. Component Library Architecture

### Component Structure
**Location**: `src/components/ui/`

**Architecture Pattern**:
- Uses Radix UI primitives as base
- Class Variance Authority (CVA) for variant management
- Shadcn/ui component patterns
- Custom Persian/RTL adaptations

**Example - Button Component**:
```tsx
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        // ... more variants
      },
      size: {
        default: "h-10 px-4 py-3",
        sm: "h-11 rounded-xl px-4 py-4",
        lg: "h-11 rounded-full px-8",
        icon: "h-12 w-12 rounded-full p-4",
      },
    }
  }
);
```

### Component Naming Convention
- PascalCase for component files: `Button.tsx`
- camelCase for props interfaces: `ButtonProps`
- kebab-case for CSS classes: `button-variants`

## 3. Frameworks & Libraries

### Core Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: UnoCSS + Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Icons**: Fluent UI Icons (via Iconify)
- **Fonts**: Custom Persian fonts (YekanBakh)

### Key Dependencies
```json
{
  "next": "^14.0.0",
  "unocss": "^0.58.0",
  "@radix-ui/react-*": "^1.0.0",
  "class-variance-authority": "^0.7.0",
  "@iconify-json/fluent": "^1.0.0"
}
```

## 4. Asset Management

### Font Assets
**Location**: `public/font/woff2/`
- 112 font files in woff2 format
- Optimized for web performance
- Local font loading with `next/font/local`

### Image Assets
**Location**: `public/img/`
- PNG/JPG formats
- Airline logos in dedicated folder
- Optimized for web delivery

### Asset Optimization
- Next.js automatic image optimization
- Font display: swap for performance
- Local font loading to avoid FOUT

## 5. Icon System

### Icon Library
**Source**: Fluent UI Icons via Iconify
**Location**: `unocss.config.ts` (lines 84-95)

### Usage Pattern
```tsx
// UnoCSS icon classes
<span className="i-fluent:search-24-regular"></span>
<span className="i-fluent:calendar-arrow-right-24-regular"></span>
```

### Icon Naming Convention
- Format: `i-fluent:{icon-name}-{size}-{style}`
- Size: 16, 20, 24, 48 (regular sizes)
- Style: regular, filled

## 6. Styling Approach

### CSS Methodology
- **Utility-First**: UnoCSS/Tailwind approach
- **Component-Scoped**: CVA for component variants
- **Global Styles**: Minimal global CSS in `globals.css`

### Responsive Design
**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px

**Usage Pattern**:
```tsx
className="text-sm md:text-lg lg:text-xl"
className="flex-col md:flex-row"
```

### RTL Support
**Location**: `src/app/globals.css` (lines 15-17)
```css
html, body {
  direction: rtl;
  text-align: right;
}
```

**RTL-Specific Classes**:
```tsx
className="flex-row-reverse" // For RTL layouts
className="text-right"       // Right-aligned text
```

## 7. Project Structure

### Directory Organization
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Route groups
│   ├── components/         # Page-specific components
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   └── share/             # Shared components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── styles/
    └── uno.css           # Generated UnoCSS styles
```

### Component Organization Pattern
- **Page Components**: In `src/app/{page}/`
- **Reusable Components**: In `src/components/ui/`
- **Shared Components**: In `src/components/share/`
- **Business Logic**: In `src/lib/`

### Import Patterns
```tsx
// Absolute imports with @ alias
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

// Relative imports for same-level components
import { ComponentA } from "./ComponentA";
```

## 8. Figma Integration Guidelines

### Design Token Mapping
When integrating Figma designs:

1. **Colors**: Map Figma colors to CSS custom properties
2. **Typography**: Use YekanBakh font family
3. **Spacing**: Use rem-based spacing scale
4. **Components**: Follow Shadcn/ui patterns

### Component Creation Workflow
1. Create component in `src/components/ui/`
2. Define variants using CVA
3. Add RTL support with `dir="rtl"`
4. Test with Persian content
5. Document props interface

### Responsive Design Integration
- Mobile-first approach
- Use Tailwind breakpoints
- Test on Persian content
- Ensure RTL compatibility

## 9. Best Practices

### Code Standards
- TypeScript strict mode
- ESLint + Biome for linting
- Consistent naming conventions
- RTL-first design approach

### Performance
- UnoCSS for minimal CSS bundle
- Next.js automatic optimizations
- Local font loading
- Image optimization

### Accessibility
- Semantic HTML structure
- ARIA labels for Persian content
- Keyboard navigation support
- Screen reader compatibility

## 10. Common Patterns

### Component Variants
```tsx
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { /* variants */ },
      size: { /* sizes */ }
    },
    defaultVariants: { /* defaults */ }
  }
);
```

### RTL Layout
```tsx
<div className="flex flex-row-reverse items-center gap-4" dir="rtl">
  <span>Text</span>
  <Icon />
</div>
```

### Persian Typography
```tsx
<h1 className="font-yekan text-2xl font-bold text-right">
  متن فارسی
</h1>
```

This design system provides a solid foundation for maintaining consistency across the Persian travel agency website while ensuring optimal performance and accessibility.
