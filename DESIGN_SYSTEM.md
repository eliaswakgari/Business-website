# BusinessCMS Design System

## Overview
This document outlines the professional design system implemented for the BusinessCMS template. The design follows modern UI/UX best practices for business and enterprise applications.

## Color Palette

### Primary Colors
- **Primary**: Blue (`hsl(221.2 83.2% 53.3%)`) - Main brand color for CTAs and important elements
- **Info**: Cyan (`hsl(199 89% 48%)`) - Used for informational elements
- **Success**: Green (`hsl(142.1 76.2% 36.3%)`) - Success states and positive actions
- **Warning**: Orange (`hsl(38 92% 50%)`) - Warning states and alerts
- **Destructive**: Red - Error states and destructive actions

### Neutral Colors
- **Background**: Dynamic based on theme
- **Foreground**: Text color
- **Muted**: Subtle backgrounds and secondary text
- **Border**: Border colors for cards and dividers

## Typography

### Font Family
- **Primary**: Inter (Google Fonts) - Clean, professional sans-serif

### Font Sizes
- **Hero**: 3xl - 6xl (responsive)
- **Section Titles**: 3xl - 5xl (responsive)
- **Card Titles**: xl - 2xl
- **Body**: base - lg
- **Small**: sm - xs

### Font Weights
- **Bold**: 700 (Headings)
- **Semibold**: 600 (Subheadings, buttons)
- **Medium**: 500 (Labels)
- **Regular**: 400 (Body text)

## Components

### Cards
- **Border Radius**: 0.75rem (rounded-xl)
- **Border**: 1px solid border color
- **Shadow**: Subtle shadow with hover elevation
- **Hover Effect**: Transform translateY(-4px) with enhanced shadow
- **Padding**: 1.5rem (p-6)

### Buttons
- **Primary**: Solid background with primary color
- **Secondary**: Outlined with border
- **Sizes**: sm, default, lg
- **Border Radius**: 0.5rem
- **Hover**: Opacity change and subtle scale

### Badges
- **Variants**: default, secondary, success, warning, info, destructive
- **Border Radius**: Full (rounded-full)
- **Padding**: px-3 py-1
- **Font Size**: xs
- **Font Weight**: Semibold

### Sections
- **Padding**: py-16 md:py-24 lg:py-32
- **Container**: Max-width with responsive padding
- **Header**: Centered with max-width constraint
- **Spacing**: Consistent mb-16 for headers

## Layout

### Container
- **Max Width**: 1400px (2xl)
- **Padding**: 1rem (mobile) to 2rem (desktop)
- **Centered**: mx-auto

### Grid Systems
- **Features**: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- **Pricing**: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- **Testimonials**: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)

### Spacing
- **Section Gap**: 5rem - 8rem
- **Element Gap**: 1rem - 2rem
- **Card Gap**: 2rem

## Animations

### Hover Effects
- **Duration**: 300ms
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Transform**: translateY(-4px) for cards
- **Shadow**: Enhanced on hover

### Transitions
- **Colors**: 200ms ease
- **Transform**: 300ms ease
- **Opacity**: 200ms ease

### Framer Motion
- **Fade In**: Opacity 0 → 1
- **Slide Up**: translateY(20px) → 0
- **Stagger**: 100ms delay between children

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have clear focus states

### Focus States
- **Ring**: 2px offset with primary color
- **Outline**: Visible on keyboard navigation

### Semantic HTML
- Proper heading hierarchy (h1 → h6)
- ARIA labels for icon-only buttons
- Alt text for all images

## Dark Mode Support

The design system fully supports dark mode with:
- Automatic theme detection
- Manual theme toggle
- Optimized colors for both themes
- Consistent contrast ratios

## Best Practices

### Do's
✓ Use semantic color tokens (primary, muted, etc.)
✓ Maintain consistent spacing scale
✓ Use the card-hover class for interactive cards
✓ Follow the component hierarchy
✓ Use Badge components for status indicators

### Don'ts
✗ Don't use hardcoded colors (gray-900, purple-600)
✗ Don't mix spacing scales
✗ Don't skip heading levels
✗ Don't forget hover states
✗ Don't ignore mobile responsiveness

## Component Examples

### Professional Card
```tsx
<Card className="card-hover">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Section Layout
```tsx
<Section>
  <SectionHeader>
    <SectionTitle>Title</SectionTitle>
    <SectionDescription>Description</SectionDescription>
  </SectionHeader>
  {/* Content */}
</Section>
```

### Badge Usage
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">New</Badge>
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Radix UI Components](https://www.radix-ui.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
