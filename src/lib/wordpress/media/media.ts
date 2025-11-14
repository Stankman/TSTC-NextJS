import { FeaturedMedia } from "@/types/wordpress";
import { getItemById } from "../wordpress";

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  return getItemById<FeaturedMedia>("media", id);
}

export async function getFeaturedMediaByIdAndSize(id: number, size: string = 'program-card'): Promise<FeaturedMedia & { sized_url: string }> {
  const media = await getItemById<FeaturedMedia>("media", id);

  const sizedUrl = media.media_details?.sizes?.[size]?.source_url || media.source_url;
  
  return {
    ...media,
    sized_url: sizedUrl
  };
}