interface WorkComponentProps {
  videoSrc: string;
  description?: string;
  title?: string;
  isVideo?: boolean;
  link?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}
const WorkComponent: React.FC<WorkComponentProps> = ({
  videoSrc,
  description,
  title,
  link,
  isVideo = true,
  ref,
}) => {
  return (
    <div
      ref={ref}
      className="w-full max-w-5xl h-auto rounded-lg overflow-hidden"
    >
      <a
        target="_blank"
        href={link || "#"}
        className="block hover:opacity-90 transition-opacity"
      >
        {isVideo ? (
          <video autoPlay loop muted className="h-auto rounded-lg">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={videoSrc}
            alt={title || "Work preview"}
            className="w-full h-auto rounded-lg"
          />
        )}
      </a>

      <div className="p-4 bg-foreground">
        {description && <p className="text-secondary">{description}</p>}

        {title && (
          <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
        )}
      </div>
    </div>
  );
};

export default WorkComponent;
