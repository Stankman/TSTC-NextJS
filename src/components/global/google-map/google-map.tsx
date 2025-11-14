import { GoogleMapsEmbed } from "@next/third-parties/google";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Fullscreen } from "lucide-react";

export default function GoogleMap() {
  return (
    <div className="w-full h-[450px]">
        <GoogleMapsEmbed
            apiKey="AIzaSyCzkZmPzoe7ca5fpQQ3ndHC4zH426JqdX4"
            mode="place"
            height={450}
            q="TSTC+Waco+Campus"
            style="height:100%;width:100%"
        />
    </div>
  );
}