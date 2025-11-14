"use client";

import { motion } from "motion/react";
import { Heading } from "@/components/global/craft";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AudienceContentProps {
    title: string;
    content: string;
    buttonText: string;
    imageSrc: string;
}

export default function AudienceContent({ title, content, buttonText, imageSrc }: AudienceContentProps) {
    return (
    <motion.div
      key={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col-reverse lg:flex-row gap-5"
    >
      <div className="lg:w-3/5 flex-1 lg:flex-none">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageSrc}
            alt="Dummy Image"
            width={1920}
            height={1080}
            className="h-full rounded object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex-1">
        <Heading size="h4">{title}</Heading>
        <p dangerouslySetInnerHTML={{ __html: content }} className="mb-4" />
        <Button variant="default">{buttonText}</Button>
      </div>
    </motion.div>
    );
}