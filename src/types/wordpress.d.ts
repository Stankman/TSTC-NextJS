import { FlexibleContent } from "./acf";

export interface WordPressPaginationHeaders {
  totalResults: number;
  totalPages: number;
}

export interface WordPressResponse<T> {
  data: T;
  headers: WordPressPaginationHeaders;
}

interface WPEntity {
    id: number;
    date: string;
    date_gmt: string;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: "publish" | "future" | "draft" | "pending" | "private";
    link: string;
    guid: {
        rendered: string;
    }
}

interface RenderedContent {
    rendered: string;
    protected: boolean;
}

interface RenderedTitle {
    rendered: string;
}

interface MediaSize {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
}

interface MediaDetails {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, MediaSize>;
}

export interface FeaturedMedia extends WPEntity {
    title: RenderedTitle;
    author: number;
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: MediaDetails;
    source_url: string;
    featured_media: number;
}

export interface Page extends WPEntity {
    title: RenderedTitle;
    content: RenderedContent;
    excerpt: RenderedContent;
    author: number;
    featured_media: number;
    parent: number;
    menu_order: number;
    comment_status: "open" | "closed";
    ping_status: "open" | "closed";
    template: string;
    meta: Record<string, unknown>;
    acf: {
        blocks: FlexibleContentBlock[];
    }
}

interface AccordionBlock extends FlexibleContentBlock {
    content: {
        header: string;
        description: string;
        items: {
            title: string;
            content: string;
            link: ACFLink;
        }[];
    },
    options: {
        style: string;
        position: string;
    }
}

interface DefaultBlock extends FlexibleContentBlock {
    content: {
        header: string;
        description: string;
        image: number;
    },
    options: {
        style: string;
        position: string;
    }
}

interface GridBlock extends FlexibleContentBlock {
    content: {
        header: string;
        description: string;
        items: {
            title: string;
            content: string;
            link: ACFLink;
        }[];
    },
    options: {
        style: string;
        columns: number;
    }
}

interface StatsBlock extends FlexibleContentBlock {
    content: {
        header: string;
        description: string;
        items: {
            title: string;
            value: number;
            type: string;
            link: ACFLink;
        }[];
    },
    options: {
    }
}

interface TabsBlock extends FlexibleContentBlock {
    content: {
        header: string;
        description: string;
        items: {
            title: string;
            content: string;
            link: ACFLink;
        }[];
    },
    options: {
        style: string;
        position: string;
    }
}

interface FlexibleContentBlock {
    acf_fc_layout: string;
    content: any;
    options: any;
}

interface ACFLink {
    title: string;
    url: string;
    target: string;
}

export interface Post extends WPEntity {
    title: RenderedTitle;
    content: RenderedContent;
    excerpt: RenderedContent;
    author: number;
    featured_media: number;
    comment_status: "open" | "closed";
    ping_status: "open" | "closed";
    sticky: boolean;
    template: string;
    format:
        | "standard"
        | "aside"
        | "chat"
        | "gallery"
        | "link"
        | "image"
        | "quote"
        | "status"
        | "video"
        | "audio";
    categories: number[];
    tags: number[];
    meta: Record<string, unknown>;
}

export interface Program extends Post {
    acf: {
        featured_media: number;
        short_description: string;
        kuali_id: string;
        tier: number;
        instructors?: number[];
        testimonials?: number[];
        onet_ids: OnetProps[];
        degree_plans_whitelist?: Array<{
            degree_plan_title?: string;
            degree_plan_id: string;
        }>
        events?: number[];
        facilities?: Array<{
            facility: number;
        }>
    };
    industry: number[];
    schedule: number[];
    award: number[];
    campus: number[];
}

export interface OnetProps {
    onet_id: string;
    onet_url: string;
}

export interface NewsArticle extends Post {
    acf: {
        featured: boolean;
    };
    industry: number[];
    campus: number[];
}

export interface Taxonomy {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    meta: Record<string, unknown>;
}

export interface Campus extends Taxonomy {
    taxonomy: "campus";
    acf?: {
        code?: string;
    };
}

export interface Industry extends Taxonomy {
    taxonomy: "industry";
}

export interface Schedule extends Taxonomy {
    taxonomy: "schedule";
}

export interface Award extends Taxonomy {
    taxonomy: "award";
}