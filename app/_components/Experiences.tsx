'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useGSAP(
        () => {
            // Timeline entrance animation with improved easing
            gsap.from('.timeline-line', {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 75%',
                    end: 'bottom 50%',
                    toggleActions: 'play reverse play reverse',
                },
            });

            // Timeline dots animation with improved staggering
            gsap.from('.timeline-dot', {
                scale: 0,
                opacity: 0,
                stagger: 0.3,
                duration: 0.6,
                ease: 'elastic.out(1.2, 0.5)',
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 75%',
                    end: 'bottom 50%',
                    toggleActions: 'play reverse play reverse',
                },
            });

            // Experience cards animation with improved entrance and exit
            gsap.fromTo(
                '.experience-card',
                {
                    x: (i, el) => {
                        if (window.innerWidth < 768) return 0;
                        return i % 2 === 0 ? -70 : 70;
                    },
                    y: (i, el) => {
                        return window.innerWidth < 768 ? 60 : 0;
                    },
                    opacity: 0,
                },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    stagger: 0.3,
                    duration: 0.9,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 65%',
                        end: 'bottom 30%',
                        toggleActions: 'play reverse play reverse',
                    },
                },
            );
        },
        { scope: containerRef },
    );

    const handleMouseEnter = (index: number) => {
        setActiveIndex(index);
        gsap.to(`.experience-card-${index}`, {
            scale: 1.03,
            duration: 0.4,
            ease: 'power2.out',
        });
        gsap.to(`.timeline-dot-${index}`, {
            scale: 1.8,
            duration: 0.4,
            boxShadow: '0 0 12px rgba(var(--primary-rgb), 0.6)',
            ease: 'power2.out',
        });
        gsap.to(`.experience-accent-${index}`, {
            width: '60px',
            duration: 0.4,
            ease: 'power2.out',
        });
        gsap.to(`.experience-card-${index} .card-content`, {
            backgroundColor: 'rgba(var(--primary-rgb), 0.03)',
            duration: 0.4,
        });
    };

    const handleMouseLeave = (index: number) => {
        setActiveIndex(null);
        gsap.to(`.experience-card-${index}`, {
            scale: 1,
            duration: 0.3,
        });
        gsap.to(`.timeline-dot-${index}`, {
            scale: 1,
            boxShadow: 'none',
            duration: 0.3,
        });
        gsap.to(`.experience-accent-${index}`, {
            width: '40px',
            duration: 0.3,
        });
        gsap.to(`.experience-card-${index} .card-content`, {
            backgroundColor: 'var(--background-light)',
            duration: 0.3,
        });
    };

    return (
        <section className="py-28 bg-background relative" id="my-experience">
            {/* Background pattern overlay */}
            <div className="absolute inset-0 opacity-5 pattern-grid-lg pointer-events-none"></div>

            <div
                className="container max-w-6xl mx-auto px-4 md:px-8"
                ref={containerRef}
            >
                <SectionTitle title="Professional Journey" />
                <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
                    My career path and professional experiences that have shaped
                    my expertise and skills over the years.
                </p>

                <div className="relative mt-20 flex" ref={timelineRef}>
                    {/* Timeline - hidden on mobile, visible on md and above */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border">
                        <div className="timeline-line absolute left-0 top-0 w-full h-full bg-primary"></div>
                    </div>

                    {/* Mobile timeline - visible only on mobile */}
                    <div className="md:hidden absolute left-8 top-0 h-full w-1 bg-border">
                        <div className="timeline-line absolute left-0 top-0 w-full h-full bg-primary"></div>
                    </div>

                    <div className="w-full relative">
                        {MY_EXPERIENCE.map((item, index) => (
                            <div
                                key={item.title}
                                className={`experience-card experience-card-${index} flex mb-20 ${
                                    index % 2 === 0
                                        ? 'md:flex-row'
                                        : 'md:flex-row-reverse'
                                } flex-row`} // Default to row on mobile
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {/* Timeline dot - centered on md+ screens */}
                                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                                    <div
                                        className={`timeline-dot timeline-dot-${index} w-5 h-5 rounded-full bg-primary transition-all duration-300 ${
                                            activeIndex === index
                                                ? 'ring-4 ring-primary ring-opacity-30'
                                                : ''
                                        }`}
                                    ></div>
                                </div>

                                {/* Mobile timeline dot - aligned to left */}
                                <div className="md:hidden absolute left-8 transform -translate-x-1/2 z-10">
                                    <div
                                        className={`timeline-dot timeline-dot-${index} w-4 h-4 rounded-full bg-primary transition-all duration-300 ${
                                            activeIndex === index
                                                ? 'ring-4 ring-primary ring-opacity-30'
                                                : ''
                                        }`}
                                    ></div>
                                </div>

                                {/* Mobile spacer for timeline indentation */}
                                <div className="md:hidden w-16"></div>

                                {/* Content container - full width on mobile, half width on md+ */}
                                <div
                                    className={`w-full md:w-1/2 ${
                                        index % 2 === 0
                                            ? 'md:pr-12'
                                            : 'md:pl-12'
                                    } pl-8 md:pl-0`}
                                >
                                    <div
                                        className={`card-content relative bg-background-light rounded-xl p-7 shadow-lg border border-border hover:border-primary/30 transition-all duration-300 ${
                                            index % 2 === 0
                                                ? 'md:text-right'
                                                : 'md:text-left'
                                        } text-left`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-lg font-medium text-primary">
                                                {item.company}
                                            </p>
                                            <p className="text-sm absolute right-2 top-2 font-medium text-muted-foreground px-3 py-1 bg-background/50 rounded-full border border-border">
                                                {item.duration}
                                            </p>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-anton leading-tight mb-4 text-foreground">
                                            {item.title}
                                        </h3>

                                        {/* Skills/Technologies badges */}
                                        {item.skills && (
                                            <div
                                                className={`flex flex-wrap gap-2 mb-5 ${
                                                    index % 2 === 0
                                                        ? 'md:justify-end'
                                                        : 'md:justify-start'
                                                } justify-start`}
                                            >
                                                {item.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-md"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Description */}
                                        {item.description && (
                                            <p className="text-muted-foreground mb-5">
                                                {item.description}
                                            </p>
                                        )}

                                        <div
                                            className={`experience-accent-${index} h-1 bg-primary rounded-full w-10 transition-all duration-300 ${
                                                index % 2 === 0
                                                    ? 'md:ml-auto'
                                                    : 'md:mr-auto'
                                            }`}
                                        ></div>
                                    </div>
                                </div>

                                {/* Empty space for the other side - hidden on mobile */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experiences;
