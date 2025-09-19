"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight, Calendar, Users } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function NewsBackgroundPaths({
    title = "Latest News",
    subtitle = "Stay updated with our latest announcements and achievements",
    onExploreNews
}: {
    title?: string;
    subtitle?: string;
    onExploreNews?: () => void;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900" dir="rtl">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full border border-blue-500/30">
                            <Newspaper className="w-12 h-12 text-blue-400" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tighter text-right" dir="rtl">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block ml-4 last:ml-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text
                                        bg-gradient-to-r from-white to-gray-300"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="flex justify-center gap-8 mb-8"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                                <span className="text-2xl font-bold text-white">24/7</span>
                            </div>
                            <p className="text-gray-400 text-sm">Updates</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-5 h-5 text-purple-400 mr-2" />
                                <span className="text-2xl font-bold text-white">100+</span>
                            </div>
                            <p className="text-gray-400 text-sm">Articles</p>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="inline-block group relative bg-gradient-to-b from-blue-500/20 to-purple-600/20
                        p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl
                        transition-shadow duration-300"
                    >
                        <Button
                            onClick={onExploreNews}
                            variant="ghost"
                            className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                            bg-black/50 hover:bg-black/70 text-white transition-all duration-300
                            group-hover:-translate-y-0.5 border border-blue-500/30 hover:border-blue-400/50
                            hover:shadow-lg hover:shadow-blue-500/20"
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                Explore News
                            </span>
                            <ArrowRight className="ml-3 w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}