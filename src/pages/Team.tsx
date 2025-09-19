import React, { useState } from 'react';
import FadeContent from '../components/FadeContent';
import SEO from '../components/SEO';
import InfiniteCarousel from '../components/InfiniteCarousel';
import { Component as AnimatedBackground } from '../components/ui/raycast-animated-black-background';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShimmerButton } from '../components/ui/shimmer-button';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Hassanein Abbas',
      role: 'Co-Leader',
      bio: 'Full-stack developer with expertise in modern web technologies and cloud solutions.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Hassnien.jpg',
      skills: ['React', 'TypeScript', 'AWS', 'Docker'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Hassan Ali',
      role: 'Developer',
      bio: 'Creative designer focused on user experience and modern design principles.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Hassan.jpg',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Elaf Mohammed',
      role: 'Writer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Elaf.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Karrar Ameer',
      role: 'Developer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Karrar.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Humam Ali',
      role: 'Developer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Humam.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sajad Firas',
      role: 'Developer',
      bio: 'Organized and driven project manager with experience in agile methodologies.',
      image: 'https://coohqntmfkyzudxwyizd.supabase.co/storage/v1/object/public/images/Sajad.jpg',
      skills: ['Agile', 'Scrum', 'Jira', 'Communication'],
      social: { github: '#', linkedin: '#', twitter: '#' }
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

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the talented members of Alpha Team - skilled developers, designers, and innovators driving technological advancement at the University of Babylon."
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

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
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
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
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-2xl xl:max-w-3xl mx-auto px-4">
                  Discover the talented individuals driving innovation and shaping the future of technology
                </p>
              </motion.div>
            </div>
          </FadeContent>

          <FadeContent delay={600} className="text-center mb-16">
            <div className="glass p-6 md:p-8 lg:p-12 max-w-4xl xl:max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-base md:text-lg lg:text-xl text-white mb-8">
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

          <InfiniteCarousel speed={15} direction="left">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card-modern hover:scale-105 transition-all duration-300 flex-shrink-0 w-80 mx-4 overflow-hidden cursor-pointer"
                style={{
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '320px'
                }}
                onClick={() => openModal(member)}
              >
                <div className="flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <span className="text-white font-semibold text-base">{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </InfiniteCarousel>

          <FadeContent delay={1200} className="text-center">
            <div className="glass p-6 md:p-8 lg:p-12 max-w-5xl xl:max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-8">Become Part of Our Team</h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
                Are you passionate about technology and innovation? Do you want to collaborate
                with talented individuals on cutting-edge projects? Join Alpha Team and be part
                of a community that values creativity, excellence, and continuous learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:contact@alphateam.edu">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                      Apply Now
                    </span>
                  </ShimmerButton>
                </a>
                <a href="mailto:contact@alphateam.edu">
                  <ShimmerButton className="shadow-2xl">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                      Contact Us
                    </span>
                  </ShimmerButton>
                </a>
              </div>
            </div>
          </FadeContent>
        </div>

        {/* Member Modal */}
        {isModalOpen && selectedMember && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-white transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                {/* Header with Image */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-cover bg-center bg-no-repeat border-4 border-white flex-shrink-0"
                    style={{ backgroundImage: `url(${selectedMember.image})` }}
                  ></div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold gradient-text mb-2">{selectedMember.name}</h2>
                    <p className="text-xl text-white font-semibold mb-4">{selectedMember.role}</p>
                    <p className="text-gray-300 leading-relaxed">{selectedMember.bio}</p>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
                  <div className="flex gap-4">
                    <a
                      href={selectedMember.social.github}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a
                      href={selectedMember.social.linkedin}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href={selectedMember.social.twitter}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
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