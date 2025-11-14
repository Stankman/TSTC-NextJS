"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Heading, Section } from "./craft";
import { usePathname } from "next/navigation";
import React from "react";

interface PageHeaderProps {
   title: string;
   breadcrumbs?: boolean;
}

function PageHeader({ title, breadcrumbs = true }: PageHeaderProps) {
    const pathname = usePathname();

    const segments = React.useMemo(() => {
        if (!pathname) return [] as string[];
        return pathname.split("/").filter(Boolean);
    }, [pathname]);

    const crumbs = React.useMemo(
        () => segments.map((seg, idx) => ({
            label: decodeURIComponent(seg.replace(/[-_]/g, " ")).replace(/\b\w/g, c => c.toUpperCase()),
            href: "/" + segments.slice(0, idx + 1).join("/"),
            isLast: idx === segments.length - 1,
        })),
        [segments]
    );

    return (
        <Section variant="primary">
            {breadcrumbs && (
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            {crumbs.length === 0 ? (
                                <BreadcrumbPage>Home</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {crumbs.map(crumb => (
                            <React.Fragment key={crumb.href}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {crumb.isLast ? (
                                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
            <Heading size="h2">
                <div dangerouslySetInnerHTML={{ __html: title }} />
            </Heading>
        </Section>
    );
}

export default PageHeader;