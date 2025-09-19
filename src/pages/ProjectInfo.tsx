import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar, ExternalLink, User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { LiquidGlassCard } from '../components/ui/liquid-glass-card';
import { ShimmerButton } from '../components/ui/shimmer-button';

const ProjectInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject(id);
      fetchTeamMembers();
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

  const fetchProject = async (projectId: string) => {
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
      setProject(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist.</p>
          <ShimmerButton onClick={() => navigate('/projects')}>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white">
              Back to Projects
            </span>
          </ShimmerButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-8 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Project Image */}
              <LiquidGlassCard className="w-full h-96 lg:h-[500px]" blurIntensity="lg" glowIntensity="md" shadowIntensity="lg">
                <div className="relative w-full h-full">
                  <img
                    src={project.image || '/placeholder-project.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                </div>
              </LiquidGlassCard>

              {/* Project Overview */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {project.title}
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project Meta */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Project
                    </a>
                  )}
                </div>

                {/* Hashtags */}
                {project.hashtags && project.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.hashtags.map((hashtag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium bg-indigo-600/20 text-indigo-300 rounded-full border border-indigo-500/30"
                      >
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Developer Section */}
          <LiquidGlassCard className="mb-8" blurIntensity="lg" glowIntensity="md" shadowIntensity="lg">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <User className="w-6 h-6" />
                Project Developers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(project.developer_ids || []).map((developerId: string) => {
                  const developer = teamMembers.find(m => m.id === developerId);
                  return developer ? (
                    <div key={developerId} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                      <img
                        src={developer.image || '/placeholder-avatar.jpg'}
                        alt={developer.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{developer.name}</h3>
                        <p className="text-gray-400 text-sm">{developer.role}</p>
                        {developer.bio && (
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{developer.bio}</p>
                        )}
                      </div>
                    </div>
                  ) : null;
                })}
                {(project.developer_ids || []).length === 0 && project.developer_name && (
                  <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <img
                      src={project.developer_image || '/placeholder-avatar.jpg'}
                      alt={project.developer_name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{project.developer_name}</h3>
                      <p className="text-gray-400 text-sm">Developer</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </LiquidGlassCard>

          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <LiquidGlassCard className="mb-8" blurIntensity="lg" glowIntensity="md" shadowIntensity="lg">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.images.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                        <span className="text-white font-medium">View Image</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </LiquidGlassCard>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <LiquidGlassCard className="inline-block" blurIntensity="lg" glowIntensity="md" shadowIntensity="lg">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">Interested in this project?</h2>
                <p className="text-gray-300 mb-6">Get in touch with our team to learn more about our work</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact">
                    <ShimmerButton className="shadow-2xl">
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white">
                        Contact Us
                      </span>
                    </ShimmerButton>
                  </a>
                  <a href="/projects">
                    <ShimmerButton className="shadow-2xl">
                      <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white">
                        View All Projects
                      </span>
                    </ShimmerButton>
                  </a>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;