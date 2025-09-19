import React from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { Home as HomeIcon, Users, MessageSquare, Newspaper, FolderOpen } from 'lucide-react';
import logo from '../assets/ALPHA-LOGO.png';

const Header: React.FC<{ isVisible?: boolean }> = ({ isVisible = true }) => {

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="h-4 w-4 text-white" />,
    },
    {
      name: "Team",
      link: "/team",
      icon: <Users className="h-4 w-4 text-white" />,
    },
    {
      name: "Projects",
      link: "/projects",
      icon: <FolderOpen className="h-4 w-4 text-white" />,
    },
    {
      name: "News",
      link: "/news",
      icon: <Newspaper className="h-4 w-4 text-white" />,
    },
    {
      name: "Contact",
      link: "mailto:contact@alphateam.edu",
      icon: <MessageSquare className="h-4 w-4 text-white" />,
    },
  ];

  return (
    <>
      {/* Floating Navigation Bar with Logo and Brand */}
      <FloatingNav
        navItems={navItems}
        logo={logo}
        brandName="Alpha Team"
        isVisible={isVisible}
      />
    </>
  );
};

export default Header;