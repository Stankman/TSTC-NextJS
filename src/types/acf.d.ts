export interface FlexibleContent {
    content: Block[];
    settings: Record<string, unknown>;
}

export type Block =
  | HeaderBlock
  | DefaultBlock
  | CustomersBlock
  | FeaturedProgramsBlock
  | AllEventsBlock
  | CtaBlock
  // fallback for unexpected layouts so your app doesn’t crash on new ones:
  | UnknownBlock;

interface BaseBlock {
  acf_fc_layout: string;
  options?: Record<string, unknown> | null;
}

export interface HeaderBlock extends BaseBlock {
  acf_fc_layout: 'header-block';
  content: {
    title: string;
    subtitle: string;
    link: string; // may be empty string
  };
  options: {
    background_type: 'video' | 'image' | 'color' | string;
    background_color?: string | null;
    background_image?: number | null; // WP media ID
    background_video?: number | null; // WP media ID
  };
}

export interface DefaultBlock extends BaseBlock {
  acf_fc_layout: 'default-block';
  content: {
    title: string;
    body: string; // HTML string
    show_image: boolean;
    image: number | null; // WP media ID
  };
  options?: {
    rtl?: boolean;
    [key: string]: unknown;
  } | null;
}

export interface CustomersBlock extends BaseBlock {
  acf_fc_layout: 'customers-block';
  content: {
    title: string;
    content?: string; // HTML string/intro
    customers: Customer[];
  };
}

export interface Customer {
  logo: number; // WP media ID
  name: string;
  website_url?: {
    title?: string;
    url: string;
    target?: '_blank' | '' | string;
  };
  custom_classes?: string;
  block_custom_classes?: string;
}

export interface FeaturedProgramsBlock extends BaseBlock {
  acf_fc_layout: 'featured-programs-block';
  content: {
    title: string; // may include anchor HTML
    courses: number[]; // course IDs
  };
}

export interface AllEventsBlock extends BaseBlock {
  acf_fc_layout: 'all-events-block';
  content: {
    title: string;
    courses: number[];
  };
  options?: {
    hidden?: boolean;
    [key: string]: unknown;
  } | null;
}

export interface CtaBlock extends BaseBlock {
  acf_fc_layout: 'cta-block';
  content: {
    title: string;
    description?: string;
    cta_link?: Link;
    phone_link?: Link;
    footer?: string;
    email_title?: string;
    email_description?: string;
    email_contacts?: null | Contact[];
    call_title?: string;
    call_description?: string;
    call_contacts?: { name?: string; phone: string }[];
  };
}

export interface Link {
  title?: string;
  url: string;
  target?: '_blank' | '' | string;
}

export interface Contact {
  name?: string;
  email?: string;
}

export interface UnknownBlock extends BaseBlock {
  // keep the discriminant and carry the payload through
  content?: Record<string, unknown>;
}