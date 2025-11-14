"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Taxonomy } from "@/types/wordpress";

interface TaxonomyFilterProps {
    taxonomyType: string;
    taxonomy: Taxonomy;
    label: string;
    checked?: boolean;
    disabled?: boolean;
}

export default function TaxonomyFilter({ taxonomyType, taxonomy, label, checked, disabled }: TaxonomyFilterProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={`${taxonomyType}-${taxonomy.id}`}
                className="size-5 data-[state=checked]:bg-primary data-[state=checked]:border-none cursor-pointer disabled:cursor-default"
                checked={checked}
                disabled={disabled}
                onCheckedChange={() => {}}
            />
            <Label
                className="text-base font-normal cursor-pointer peer-disabled:cursor-default"
                htmlFor={`${taxonomyType}-${taxonomy.id}`}
                dangerouslySetInnerHTML={{ __html: label }}
            />
        </div>
    );
}