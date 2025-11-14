"use client";

import { Taxonomy } from "@/types/wordpress";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import FiltersCollapsible from "./filters-collapsible";

interface FiltersDrawerProps {
    taxonomyKey: string;
    label: string;
    singularLabel: string;
    items: Taxonomy[];
    availableItems?: Taxonomy[];
}

export default function FiltersDrawer({ taxonomyKey, label, singularLabel, items, availableItems }: FiltersDrawerProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">{singularLabel}</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{singularLabel}</DrawerTitle>
                </DrawerHeader>
                <div className="mt-auto flex flex-col gap-2 p-4">
                    <FiltersCollapsible label={label} singularLabel={singularLabel} taxonomyKey={taxonomyKey} items={items} />
                </div>
                <DrawerFooter className="grid grid-cols-2 gap-4">
                    <Button variant="ghost">Clear All</Button>
                    <DrawerClose asChild>
                        <Button variant="accent">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}