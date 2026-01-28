import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  container?: boolean
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, container = true, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-16 md:py-24 lg:py-32", className)}
        {...props}
      >
        {container ? (
          <div className="container px-4 md:px-6">{children}</div>
        ) : (
          children
        )}
      </section>
    )
  }
)
Section.displayName = "Section"

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center text-center space-y-4 mb-12 md:mb-16", className)}
    {...props}
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl",
      className
    )}
    {...props}
  />
))
SectionTitle.displayName = "SectionTitle"

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
      className
    )}
    {...props}
  />
))
SectionDescription.displayName = "SectionDescription"

export { Section, SectionHeader, SectionTitle, SectionDescription }
