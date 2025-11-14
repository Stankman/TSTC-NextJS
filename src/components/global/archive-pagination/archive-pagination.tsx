"use client";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

interface ArchivePaginationProps {
    totalPages: number;
    currentPage: number;
    /**
     * Current page query parameters. Pass the value from `useSearchParams()` (App Router) or construct a `URLSearchParams`.
     * These will be preserved while only the `page` param is updated/removed.
     */
    currentParams?: URLSearchParams;
}

export default function ArchivePagination({ totalPages, currentPage, currentParams }: ArchivePaginationProps) {
    if(totalPages <= 1) return null;

    const pathname = usePathname();

    const createPaginationUrl = (page: number) => {
        const params = new URLSearchParams(currentParams ? currentParams.toString() : undefined);

        if (page <= 1) {
            params.delete("page");
        } else {
            params.set("page", page.toString());
        }

        const qs = params.toString();
        // If qs empty, return current pathname (no query). Otherwise include pathname + query.
        return qs ? `${pathname}?${qs}` : pathname;
    };


    return (
        <Pagination>
            <PaginationContent>
                { currentPage > 1 && (
                <PaginationItem>
                    <PaginationPrevious href={createPaginationUrl(currentPage - 1)} />
                </PaginationItem>
                )}
                
                { Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                        return (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            Math.abs(pageNum - currentPage) <= 1
                        );
                    }).map((pageNum, index, array) => {
                        const showEllipsis = index > 0 && pageNum - array[index - 1] > 1;
                        return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink href={createPaginationUrl(pageNum)} isActive={pageNum === currentPage}>{pageNum}</PaginationLink>
                        </PaginationItem>
                        );
                    })
                }

                { currentPage < totalPages && (
                <PaginationItem>
                    <PaginationNext href={createPaginationUrl(currentPage + 1)} />
                </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}