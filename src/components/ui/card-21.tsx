import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Define the props for the ProjectCard component
interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  developer: string;
  developerImage: string;
  developerIds?: string[];
  teamMembers?: any[];
  href: string;
  themeColor: string; // e.g., "150 50% 25%" for a deep green
  hashtags?: string[];
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ imageUrl, title, developer, developerImage, developerIds, teamMembers = [], href, themeColor, hashtags = [] }) => {
    return (
      <div className="w-full min-h-72 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
           style={{
             boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`,
             "--theme-color": themeColor,
           } as React.CSSProperties}>
        <Link
          to={href}
          className="relative block w-full h-full"
          aria-label={`Explore details for ${title}`}>
          {/* Image Section */}
          <div className="h-32 overflow-hidden relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Themed Gradient Overlay for Image */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.3) 30%, transparent 60%)`,
              }}
            />
          </div>

          {/* Content Section */}
          <div className="p-6 bg-black/80">
            <h3 className="text-lg font-bold tracking-tight mb-3 line-clamp-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {title}
            </h3>

            {/* Developer Info */}
            <div className="flex items-center gap-3">
              {developerIds && developerIds.length > 1 ? (
                <div className="flex -space-x-2">
                  {developerIds.slice(0, 3).map((developerId: string) => {
                    const dev = teamMembers.find(m => m.id === developerId);
                    return dev ? (
                      <img
                        key={developerId}
                        src={dev.image || '/placeholder-avatar.jpg'}
                        alt={dev.name}
                        className="w-6 h-6 rounded-2xl object-cover border-2 border-white"
                        title={dev.name}
                      />
                    ) : null;
                  })}
                  {developerIds.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center text-xs text-white">
                      +{developerIds.length - 3}
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={developerImage}
                  alt={developer}
                  className="w-8 h-8 rounded-2xl object-cover border-2 border-white/50"
                />
              )}
              <div className="flex-1">
                <p className="text-xs text-white/70" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Developed by</p>
                <p className="text-sm font-medium text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 4px', borderRadius: '4px' }}>
                  {developerIds && developerIds.length > 1
                    ? `${developerIds.length} developers`
                    : developer
                  }
                </p>
              </div>
            </div>

            {/* Hashtags */}
            {hashtags && hashtags.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {hashtags.slice(0, 3).map((hashtag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-[hsl(var(--theme-color)/0.2)] text-white rounded-full border border-[hsl(var(--theme-color)/0.3)]"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {hashtag}
                    </span>
                  ))}
                  {hashtags.length > 3 && (
                    <span
                      className="px-2 py-1 text-xs font-medium bg-gray-600/50 text-white rounded-full border border-gray-500/50"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      +{hashtags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Explore Button */}
            <div className="mt-6 flex items-center justify-between bg-[hsl(var(--theme-color)/0.2)] backdrop-blur-md border border-[hsl(var(--theme-color)/0.3)] 
                           rounded-lg px-4 py-3 
                           transition-all duration-300 hover:bg-[hsl(var(--theme-color)/0.4)] hover:border-[hsl(var(--theme-color)/0.5)]">
              <span className="text-sm font-semibold tracking-wide" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>View Project</span>
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };