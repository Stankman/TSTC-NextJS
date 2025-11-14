import { NewsArticle } from "@/types/wordpress";
import Image from "next/image";
import { Heading } from "../global/craft";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const articleCardVariants = cva(
    "flex rounded overflow-hidden relative bg-card text-foreground-tertiary border h-full",
    {
        variants: {
            size: {
                sm: "flex-col",
                base: "flex-col",
                hero: "flex-col lg:flex-row lg:w-full",
            },
            featured: {
                true: "",
                false: "",
            },
        },
        defaultVariants: {
            size: "base",
            featured: false,
        },
    }
);

const imageVariants = cva(
    "relative grow-0 shrink-0 overflow-hidden",
    {
        variants: {
            size: {
                sm: "",
                base: "",
                hero: "shrink max-h-auto lg:max-h-[362px] basis-auto lg:basis-[643px] h-auto w-full",
            },
            featured: {
                true: "",
                false: "",
            },
        },
        compoundVariants: [
            {
                size: "base",
                featured: true,
                class: "",
            },
        ],
        defaultVariants: {
            size: "base",
            featured: false,
        },
    }
);

const descriptionVariants = cva(
    "shrink-0 grow flex flex-col py-4 px-6 justify-between",
    {
        variants: {
            size: {
                sm: "basis-auto",
                base: "basis-auto",
                hero: "basis-0"
            }
        },
        defaultVariants: {
            size: "base"
        }
    }
);

const headingVariants = cva(
    "font-bold",
    {
        variants: {
            size: {
                sm: "text-lg lg:text-lg",
                base: "text-lg lg:text-xl",
                hero: "text-lg lg:text-3xl"
            }
        },
        defaultVariants: {
            size: "base"
        }
    }
);

interface ArticleCardProps {
    article: NewsArticle;
    size?: 'sm' | 'base' | 'hero';
    featured?: boolean;
}

export default function ArticleCard({ article, size = 'base', featured = false }: ArticleCardProps) {
    const featuredImage = "/dummies/dummy-image-3.jpg"; // Fallback for now
    const imageAlt = article.title.rendered;
    
    // Format date
    const publishDate = new Date(article.date);
    const readingTime = Math.ceil((article.content?.rendered?.replace(/<[^>]*>/g, '').length || 0) / 200);

    return(
        <div className={cn(articleCardVariants({ size, featured }))}>
            <div id="card-media" className={cn(imageVariants({ size, featured }))}>
                <Image 
                    src={featuredImage || "/dummies/dummy-image-3.jpg"} 
                    alt={imageAlt}
                    className="object-cover h-full w-full"
                    width={6907}
                    height={4605}
                />
            </div>
            <div id="card-description" className={cn(descriptionVariants({ size }))}>
                <div id="card-head" className="space-y-2">
                    <div>
                        <Badge variant="outline" className="font-semibold">PRESS RELEASE</Badge>
                    </div>
                    <div className={cn(headingVariants({ size }))}>{article.title.rendered}</div>
                </div>
                <div id="card-timestamp" className="text-foreground-gray font-semibold">
                    <time dateTime={article.date}>
                        {publishDate.toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                        })}
                    </time>
                </div>
            </div>
        </div>
    );
}