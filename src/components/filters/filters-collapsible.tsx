"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TaxonomyFilter from "./taxonomy-filter";
import { Taxonomy } from "@/types/wordpress";

interface FiltersCollapsibleProps {
    taxonomyKey: string;
    label: string;
    singularLabel: string;
    items: Taxonomy[];
    availableItems?: Taxonomy[];
}

export default function FiltersCollapsible({ taxonomyKey, label, singularLabel, items, availableItems }: FiltersCollapsibleProps) {
    if(!items || items.length === 0) return null;

    return (
        <Collapsible defaultOpen={true}>
            <CollapsibleTrigger className="text-lg font-medium mb-3">{singularLabel}</CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
                {items.map((item) => (
                    <TaxonomyFilter key={item.id} taxonomyType={taxonomyKey} taxonomy={item} label={item.name} disabled={false} />
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}