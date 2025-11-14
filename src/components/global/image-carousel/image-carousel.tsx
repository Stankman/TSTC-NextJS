"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Heading } from "../craft";
import { FeaturedMedia } from "@/types/wordpress";
import { useEffect, useState } from "react";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
    className?: string;
    images: FeaturedMedia[];
    loop?: boolean;
    rtl?: boolean;
}

export default function ImageCarousel({ className, images, loop = true, rtl = false }: ImageCarouselProps) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if(!api) return;
        
        const onSelect = () => setCurrent(api.selectedScrollSnap());

        api.on("select", onSelect);
        
        onSelect();

        return () => {
            api.off("select", onSelect);
        }
    }, [api]);

    const active = images[current];

    return (
        <Carousel
            opts={{
                loop,
                containScroll: false
            }}
            plugins={[
                Fade()
            ]}
            setApi={setApi}
            className={cn("grid lg:grid-cols-3 gap-2 lg:gap-12", className)}
        >
            <div className={`${rtl ? 'lg:order-2' : 'lg:order-1'} flex flex-col-reverse gap-4 lg:flex-col order-2 lg:col-span-1 lg:self-end lg:py-5`}>
                <div>
                    <Heading size="h6">{ active?.title?.rendered || "No Title" }</Heading>
                    <p className="text-base">{ active?.caption?.rendered || "No Caption" }</p>
                </div>
                <div className="flex items-center gap-3">
                    <CarouselPrevious className="static translate-y-0 rotate-0" />
                    <div className="text-sm font-medium">
                        { current + 1 } / { images.length }
                    </div>
                    <CarouselNext className="static translate-y-0 rotate-0" />
                </div>
            </div>
            <div className={`${rtl ? 'lg:order-1' : 'lg:order-2'} lg:col-span-2`}>
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={image?.source_url}
                                    width={1920}
                                    height={1080}
                                    alt={image?.alt_text || "Image description"}
                                    className="h-full object-cover rounded"
                                />
                            </AspectRatio>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </div>
        </Carousel>
    );
}