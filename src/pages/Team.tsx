import React, { useState, useEffect, useRef } from 'react';
import FadeContent from '../components/FadeContent';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidGlassCard } from '../components/ui/liquid-glass-card';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    linktree: string;
  };
}

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const teamMembers: TeamMember[] = [
    {
      name: 'Hussein Haider',
      role: 'Team Leader',
      bio: 'Passionate about technology and innovation. Leading our team with vision and expertise.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Hussein.jpg',
      skills: ['Leadership', 'React', 'Node.js', 'AI/ML'],
      social: { linktree: 'https://linktr.ee/hsabadix' }
    },
    {
      name: 'Hassanein Abbas',
      role: 'Co-Leader',
      bio: 'Full-stack developer with expertise in modern web technologies and cloud solutions.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Hassnien.jpg',
      skills: ['React', 'TypeScript', 'AWS', 'Docker'],
      social: { linktree: 'https://linktr.ee/4pv_1?utm_source=linktree_admin_share' }
    },
    {
      name: 'Hassan Ali',
      role: 'Developer',
      bio: 'Creative designer focused on user experience and modern design principles.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Hassan.jpg',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping'],
      social: { linktree: 'https://linktr.ee/Hasan.21' }
    },
    {
      name: 'Elaf Mohammed',
      role: 'Writer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Elaf.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { linktree: 'linktr.ee/elaf_8' }
    },
    {
      name: 'Karrar Ameer',
      role: 'Developer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Karrar.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { linktree: 'http://linktr.ee/wski4' }
    },
    {
      name: 'Humam Ali',
      role: 'Developer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Humam.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { linktree: 'https://linktr.ee/humam1500' }
    },
    {
      name: 'Sajad Firas',
      role: 'Developer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Sajad.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { linktree: 'https://linktr.ee/sa_is1' }
    }
  ];

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 5; // سرعة التمرير (بكسل في كل إطار)
    let intervalId: NodeJS.Timeout;

    const autoScroll = () => {
      scrollContainer.scrollLeft += scrollSpeed;
      
      // إعادة التمرير إلى البداية عند الوصول للنهاية
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
        scrollContainer.scrollLeft = 0;
      }
    };

    console.log('Starting auto scroll with setInterval');
    intervalId = setInterval(autoScroll, 50);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the talented members of Alpha Team - skilled developers, designers, and innovators driving technological advancement at the University of Babylon."
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 md:pt-40">
          <FadeContent delay={200} className="text-center mb-8">
            {/* Hero Text Section */}
            <div className="max-w-4xl xl:max-w-6xl mx-auto text-center">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
              >
                <Circle className="h-2 w-2 fill-rose-500/80" />
                <span className="text-sm text-white/60 tracking-wide">
                  Alpha Team
                </span>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    Meet Our
                  </span>
                  <br />
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                    )}
                  >
                    Amazing Team
                  </span>
                </h1>
              </motion.div>

              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-2xl xl:max-w-3xl mx-auto px-4">
                  Discover the talented individuals driving innovation and shaping the future of technology
                </p>
              </motion.div>
            </div>
          </FadeContent>

          <FadeContent delay={600} className="text-center mb-16">
            <div className="glass p-6 md:p-8 lg:p-12 max-w-4xl xl:max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-sm md:text-base lg:text-lg text-white mb-8">
                We are a passionate team of developers, designers, and innovators committed to pushing the boundaries of technology and creating solutions that make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/team">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                      Join Our Team
                    </span>
                  </ShimmerButton>
                </Link>
                <a href="#team-members">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                      Meet the Team
                    </span>
                  </ShimmerButton>
                </a>
              </div>
            </div>
          </FadeContent>
        </div>

        {/* Team Members Section */}
        <div className="container mx-auto px-4 py-16" id="team-members">
          <FadeContent delay={100} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text mb-6 animate-fade-in">
              Team Members
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 font-light">
              Get to know the talented individuals who make Alpha Team exceptional
            </p>
          </FadeContent>

          <div className="relative">
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {teamMembers.concat(teamMembers).concat(teamMembers).map((member, index) => (
                <div key={`${member.name}-${index}`} className="flex-shrink-0 snap-center">
                  <LiquidGlassCard
                    className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300"
                    blurIntensity="xl"
                    glowIntensity="lg"
                    shadowIntensity="lg"
                    borderRadius="24px"
                  >
                    <div
                      className="relative w-full h-80 bg-cover bg-center bg-no-repeat rounded-2xl cursor-pointer"
                      style={{
                        backgroundImage: `url(${member.image})`,
                      }}
                      onClick={() => openModal(member)}
                    >
                      {/* Glass overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl backdrop-blur-[1px]" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-white">
                          <h3 className="text-lg sm:text-xl font-bold mb-1 drop-shadow-lg">{member.name}</h3>
                          <span className="text-white/90 font-semibold text-sm sm:text-base drop-shadow-md">{member.role}</span>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
                  </LiquidGlassCard>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Member Modal */}
        {isModalOpen && selectedMember && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="glass max-w-sm sm:max-w-lg md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-white transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-4 sm:p-6 md:p-8">
                {/* Header with Image */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                  <div
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-cover bg-center bg-no-repeat border-4 border-white flex-shrink-0 mx-auto sm:mx-0"
                    style={{ backgroundImage: `url(${selectedMember.image})` }}
                  ></div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">{selectedMember.name}</h2>
                    <p className="text-lg sm:text-xl text-white font-semibold mb-4">{selectedMember.role}</p>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{selectedMember.bio}</p>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium border border-white/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-4">Connect</h3>
                  <div className="flex justify-center">
                    <a
                      href={selectedMember.social.linktree}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Linktree
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;