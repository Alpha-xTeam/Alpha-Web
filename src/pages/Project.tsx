import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectCard } from '../components/ui/card-21';
import { LiquidGlassCard } from '../components/ui/liquid-glass-card';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Project: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
    if (id) {
      fetchSingleProject(id);
    } else {
      fetchProjects();
    }
  }, [id]);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
    } else {
      setTeamMembers(data || []);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const fetchSingleProject = async (projectId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      navigate('/projects');
    } else {
      setSelectedProject(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Content */}
      <div className="relative z-10 pt-24 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Single Project View */}
          {selectedProject && (
            <div className="mb-8">
              <button
                onClick={() => navigate('/projects')}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Image */}
                <LiquidGlassCard className="w-full h-96" blurIntensity="lg" glowIntensity="md" shadowIntensity="lg">
                  <div className="relative w-full h-full">
                    <img
                      src={selectedProject.image || '/placeholder-project.jpg'}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </LiquidGlassCard>

                {/* Project Details */}
                <LiquidGlassCard className="w-full" blurIntensity="lg" glowIntensity="md" shadowIntensity="lg">
                  <div className="p-6 space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-4">
                        {selectedProject.title}
                      </h1>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Developer Info */}
                    <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                      <p className="text-sm text-gray-400 mb-3">Developed by</p>
                      <div className="flex flex-wrap gap-3">
                        {(selectedProject.developer_ids || []).map((developerId: string) => {
                          const developer = teamMembers.find(m => m.id === developerId);
                          return developer ? (
                            <div key={developerId} className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
                              <img
                                src={developer.image || '/placeholder-avatar.jpg'}
                                alt={developer.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                              />
                              <div>
                                <p className="text-white font-medium">{developer.name}</p>
                                <p className="text-gray-400 text-sm">{developer.role}</p>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                      {(selectedProject.developer_ids || []).length === 0 && (
                        <div className="flex items-center gap-3">
                          <img
                            src={selectedProject.developer_image || '/placeholder-avatar.jpg'}
                            alt={selectedProject.developer_name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                          />
                          <div>
                            <p className="text-white font-medium">{selectedProject.developer_name}</p>
                            <p className="text-gray-400 text-sm">Developer</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hashtags */}
                    {selectedProject.hashtags && selectedProject.hashtags.length > 0 && (
                      <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                        <p className="text-sm text-gray-400 mb-3">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.hashtags.map((hashtag: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm font-medium bg-indigo-600/20 text-indigo-300 rounded-full border border-indigo-500/30"
                            >
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Meta */}
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(selectedProject.created_at).toLocaleDateString()}</span>
                      </div>
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>
            </div>
          )}

          {/* Projects Grid View */}
          {!selectedProject && (
            <>
              {/* Hero Section - Using Home Page Style */}
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-center mb-6">
                  {/* Hero Text Section - Using HeroGeometric style */}
                  <div className="max-w-4xl xl:max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 md:mb-8">
                      <Circle className="h-2 w-2 fill-rose-500/80" />
                      <span className="text-sm text-white/60 tracking-wide">
                        Alpha Team Projects
                      </span>
                    </div>

                    <div>
                      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                          Innovative
                        </span>
                        <br />
                        <span
                          className={cn(
                            "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                          )}
                        >
                          Projects
                        </span>
                      </h1>
                    </div>

                    <div>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/40 mb-6 leading-relaxed font-light tracking-wide max-w-2xl xl:max-w-3xl mx-auto px-4">
                        Discover the cutting-edge projects developed by our talented team members
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a href="#projects-grid">
                    <ShimmerButton className="shadow-2xl">
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                        Explore Projects
                      </span>
                    </ShimmerButton>
                  </a>
                  <a href="#contact">
                    <ShimmerButton className="shadow-2xl">
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                        Get In Touch
                      </span>
                    </ShimmerButton>
                  </a>
                </div>
              </div>

              {/* Projects Grid */}
              <div id="projects-grid" className="mt-16">
                {loading ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading projects...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">No projects found</p>
                    <p className="text-gray-500 mt-2">Check back later for new projects</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        imageUrl={project.image || '/placeholder-project.jpg'}
                        title={project.title}
                        developer={project.developer_name}
                        developerImage={project.developer_image || '/placeholder-avatar.jpg'}
                        developerIds={project.developer_ids}
                        teamMembers={teamMembers}
                        href={`/project-info/${project.id}`}
                        themeColor="0 100% 50%"
                        hashtags={project.hashtags || []}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;