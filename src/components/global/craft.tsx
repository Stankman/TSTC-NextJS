import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}

const styles = {
  layout: {
    container: "container lg:max-w-350 mx-auto px-5 lg:px-8",
  }
};

const Container = ({ children, className }: BaseProps) => (
  <div className={cn(styles.layout.container, className)}>
    {children}
  </div>
);

const sectionVariants = cva(
  "py-12 md:py-14 lg:py-16",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        dark: "bg-background-secondary text-foreground-secondary",
        secondary: "bg-background-tertiary text-foreground-tertiary"
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

const Section = ({
  children,
  className,
  variant
}: BaseProps &
  VariantProps<typeof sectionVariants>
) => (
  <section className={cn(sectionVariants({ variant, className}))}>
    <Container>
      {children}
    </Container>
  </section>
);

const headingVariants = cva(
  "mb-4",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-4xl md:text-4xl lg:text-5xl",
        h3: "text-3xl md:text-3xl lg:text-4xl",
        h4: "text-xl md:text-2xl lg:text-3xl",
        h5: "text-lg md:text-xl lg:text-2xl",
        h6: "text-base md:text-lg lg:text-xl",
      },
    },
    defaultVariants: {
      size: "h2",
    }
  }
);

const sizeToComp: Record<NonNullable<VariantProps<typeof headingVariants>["size"]>, "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
};

function Heading({
  children,
  className,
  size = "h2",
  asChild = false,
  ...props 
}: BaseProps & 
  NonNullable<VariantProps<typeof headingVariants>> & { 
    asChild?: boolean 
  }) {
  const Comp = asChild ? Slot : sizeToComp[size ?? "h2"];

  return (
    <Comp
      className={cn(headingVariants({ size, className}))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Container, Section, Heading };