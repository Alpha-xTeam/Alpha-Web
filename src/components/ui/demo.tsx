"use client";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Skiper31 } from "@/components/ui/text-scroll-animation";
import { FeatureSteps } from "@/components/ui/feature-section";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const timelineData = [
	{
		id: 1,
		title: "Planning",
		date: "Jan 2024",
		content: "Project planning and requirements gathering phase.",
		category: "Planning",
		icon: Calendar,
		relatedIds: [2],
		status: "completed" as const,
		energy: 100,
	},
	{
		id: 2,
		title: "Design",
		date: "Feb 2024",
		content: "UI/UX design and system architecture.",
		category: "Design",
		icon: FileText,
		relatedIds: [1, 3],
		status: "completed" as const,
		energy: 90,
	},
	{
		id: 3,
		title: "Development",
		date: "Mar 2024",
		content: "Core features implementation and testing.",
		category: "Development",
		icon: Code,
		relatedIds: [2, 4],
		status: "in-progress" as const,
		energy: 60,
	},
	{
		id: 4,
		title: "Testing",
		date: "Apr 2024",
		content: "User testing and bug fixes.",
		category: "Testing",
		icon: User,
		relatedIds: [3, 5],
		status: "pending" as const,
		energy: 30,
	},
	{
		id: 5,
		title: "Release",
		date: "May 2024",
		content: "Final deployment and release.",
		category: "Release",
		icon: Clock,
		relatedIds: [4],
		status: "pending" as const,
		energy: 10,
	},
];

const features = [
	{
		step: "Step 1",
		title: "Foundation",
		content:
			"Establishing Alpha Team at the University of Babylon to spread technology culture and build a strong tech community.",
		image:
			"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
	},
	{
		step: "Step 2",
		title: "Development",
		content:
			"Developing innovative technology projects and organizing specialized workshops for skill development.",
		image:
			"https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
	},
	{
		step: "Step 3",
		title: "Community",
		content:
			"Building an active tech community and sharing knowledge with students through collaboration and innovation.",
		image:
			"https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
	},
	{
		step: "Step 4",
		title: "Achievements",
		content:
			"Winning awards in programming competitions and technological innovation, and expanding project scope.",
		image:
			"https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?q=80&w=2070&auto=format&fit=crop",
	},
];

export function RadialOrbitalTimelineDemo() {
	return (
		<>
			<RadialOrbitalTimeline timelineData={timelineData} />
		</>
	);
}

export function DemoOne() {
	return <Skiper31 />;
}

export function FeatureStepsDemo() {
	return (
		<FeatureSteps
			features={features}
			title="Our Journey at Alpha Team"
			autoPlayInterval={4000}
		/>
	);
}

export function FollowingPointerDemo() {
  return (
    <div className="w-80 mx-auto">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
          <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
            <img
              src={'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop'}
              alt="thumbnail"
              className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200 w-full h-full`}
            />
          </div>
          <div className=" p-4">
            <h2 className="font-bold my-4 text-lg text-zinc-700">
              {blogContent.title}
            </h2>
            <h2 className="font-normal my-4 text-sm text-zinc-500">
              {blogContent.description}
            </h2>
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-gray-500">{blogContent.date}</span>
              <div className="relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs">
                Read More
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Alpha Team",
  date: "17th September, 2025",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/demo/thumbnail.png",
  authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="avatar"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);