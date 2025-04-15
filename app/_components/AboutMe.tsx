'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useState, useEffect } from 'react';
import { GENERAL_INFO } from '@/lib/data';
gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);
    const imageRef = React.useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle mouse movement for the parallax effect only on desktop
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (container.current) {
                const { left, top, width, height } =
                    container.current.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    useGSAP(
        () => {
            const slideUpEl = container.current?.querySelectorAll('.slide-up');

            if (slideUpEl?.length) {
                gsap.from('.slide-up', {
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 80%',
                        end: 'bottom 80%',
                        scrub: isMobile ? false : 0.5,
                    },
                    opacity: 0,
                    y: isMobile ? 20 : 40,
                    ease: 'none',
                    stagger: isMobile ? 0.2 : 0.4,
                });
            }

            // Initial entrance animation with fade
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: isMobile ? false : 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: isMobile ? 50 : 100,
                opacity: 0,
                stagger: isMobile ? 0.04 : 0.08,
            }).to('.slide-up-and-fade', {
                opacity: 0.3,
                y: isMobile ? -25 : -50,
                stagger: isMobile ? 0.04 : 0.08,
            });

            // Staggered reveal for skills with fade
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.skills-container',
                    start: 'top 90%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            })
                .from('.skill-item', {
                    scale: 0.8,
                    opacity: 0,
                    stagger: isMobile ? 0.05 : 0.1,
                    duration: isMobile ? 0.3 : 0.5,
                    ease: 'back.out(1.7)',
                })
                .to('.skill-item', {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    stagger: isMobile ? 0.05 : 0.1,
                    duration: isMobile ? 0.3 : 0.5,
                });

            // Profile image reveal with fade
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.profile-image',
                    start: 'top 90%',
                    end: 'bottom top',
                    scrub: isMobile ? false : 1,
                },
            })
                .from('.profile-image', {
                    clipPath: 'circle(0% at 50% 50%)',
                    opacity: 0,
                    duration: isMobile ? 0.8 : 1.5,
                    ease: 'power3.out',
                })
                .to('.profile-image', {
                    opacity: 0.3,
                    y: isMobile ? -20 : -40,
                });

            // Horizontal reveal for divider with fade
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.divider',
                    start: 'top 90%',
                    end: 'bottom top',
                    scrub: isMobile ? false : 0.5,
                },
            })
                .from('.divider', {
                    scaleX: 0,
                    opacity: 0,
                    transformOrigin: 'left center',
                    duration: isMobile ? 0.8 : 1.2,
                })
                .to('.divider', {
                    opacity: 0.3,
                    y: isMobile ? -10 : -20,
                });
        },
        { scope: container },
    );

    // Handle hover effect for contact button only on desktop
    useEffect(() => {
        if (isMobile || !isHovering || !imageRef.current) return;

        gsap.to(imageRef.current, {
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            duration: 0.4,
            ease: 'power2.out',
        });

        return () => {
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)',
                });
            }
        };
    }, [mousePosition, isHovering, isMobile]);

    const skills = [
        'React',
        'TypeScript',
        'GSAP',
        'Next.js',
        'Tailwind CSS',
        'UI/UX',
    ];

    return (
        <section
            className="py-20 md:py-36 relative overflow-hidden"
            id="about-me"
        >
            <div
                className="max-w-6xl mx-auto px-4 sm:px-6 relative"
                ref={container}
            >
                {/* Background elements */}
                <div className="absolute -z-10 w-48 md:w-64 h-48 md:h-64 rounded-full bg-primary/5 blur-3xl top-0 left-0 animate-pulse"></div>
                <div
                    className="absolute -z-10 w-72 md:w-96 h-72 md:h-96 rounded-full bg-primary/5 blur-3xl bottom-0 right-0 animate-pulse"
                    style={{ animationDelay: '2s' }}
                ></div>

                {/* Main heading */}
                <h2 className="text-3xl md:text-6xl font-thin mb-16 md:mb-24 max-w-4xl mx-auto text-center slide-up-and-fade leading-tight">
                    Crafting <span className="text-primary">exceptional</span>{' '}
                    digital experiences through innovative{' '}
                    <span className="text-primary">Web solutions</span> and
                    thoughtful design.
                </h2>

                {/* Divider with animation */}
                <div className="divider w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-8 md:my-12"></div>

                <p className="pb-3 text-muted-foreground slide-up-and-fade text-center text-base md:text-lg">
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 gap-8 md:gap-12 mt-12 md:mt-16 items-center">
                    {/* Profile image column */}
                    <div className="md:col-span-5 flex justify-center md:justify-start">
                        <div
                            className="profile-image relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5"
                            style={{ clipPath: 'circle(75% at 50% 50%)' }}
                            ref={imageRef}
                            onMouseEnter={() =>
                                !isMobile && setIsHovering(true)
                            }
                            onMouseLeave={() =>
                                !isMobile && setIsHovering(false)
                            }
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold">
                                T
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-4 md:pb-6">
                                <p className="slide-up-and-fade text-white text-lg md:text-xl font-medium">
                                    {GENERAL_INFO.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bio content column */}
                    <div className="md:col-span-7">
                        <p className="text-4xl md:text-5xl slide-up-and-fade font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                            Hi, I&apos;m {GENERAL_INFO.name}.
                        </p>

                        <div className="text-base md:text-lg text-muted-foreground space-y-4 md:space-y-6">
                            <p className="slide-up-and-fade">
                                I&apos;m a skilled web developer with a focus on
                                creating intuitive and user-friendly websites.
                                I&apos;m passionate about building
                                <span className="text-primary">
                                    {' '}
                                    exceptional digital experiences.
                                </span>
                            </p>

                            <p className="slide-up-and-fade">
                                I have a strong background in web development
                                and have worked on various projects. I&apos;m
                                proficient in a variety of programming languages
                                and technologies, including HTML, CSS,
                                JavaScript, React, Next.js, and more.
                            </p>

                            {/* Skills tags */}
                            <div className="skills-container mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="skill-item px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-all"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="slide-up-and-fade pt-4 md:pt-6">
                                <button className="w-full md:w-auto group relative overflow-hidden px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/20">
                                    <span className="relative z-10">
                                        Let&apos;s Connect
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
