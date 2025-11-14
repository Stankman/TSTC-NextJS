import Video from 'next-video';

export default function VideoHeader() {
    return (
        <div className="relative h-60 md:h-100 lg:h-150 xl:h-200 overflow-hidden">
            <span className="absolute inset-0 z-10 bg-gradient-to-t bg-blend-multiply from-primary/90 to-secondary/50"></span>
            <Video
                src="https://worksite.org/wp-content/uploads/sites/2/2024/12/worksite-hero-video.mp4"
                controls={false}
                autoPlay={true}
                loop={true}
                muted={true}
                className='relative w-full h-full object-cover'
            />
        </div>
    );
}