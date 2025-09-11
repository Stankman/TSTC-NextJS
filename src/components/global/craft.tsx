import { cn } from "@/lib/utils";

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

const styles = {
  layout: {
    container: "container mx-auto px-4 md:px-6 lg:px-8",
    section: "py-12 md:py-14 lg:py-16",
  }
};

const Container = ({ children, className, id }: BaseProps) => (
  <div className={cn(styles.layout.container, className)} id={id}>
    {children}
  </div>
);

const Section = ({ children, className, id }: BaseProps) => (
  <section className={cn(styles.layout.section, className)} id={id}>
    <Container>
      {children}
    </Container>
  </section>
);

export { Container, Section };