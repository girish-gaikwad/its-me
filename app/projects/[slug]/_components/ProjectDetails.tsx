'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Initial page transition animation with overlays
    useEffect(() => {
        const tl = gsap.timeline();

        // First overlay (primary color)
        tl.to('.overlay-primary', {
            duration: 0.8,
            y: '-100%',
            ease: 'power3.inOut',
            delay: 0.2,
        });

        // Second overlay (black)
        tl.to('.overlay-black', {
            duration: 0.8,
            y: '-100%',
            ease: 'power3.inOut',
            delay: -0.6,
        });
    }, []);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 1.2, // Increased delay to accommodate overlays
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    // Enhanced parallax effect on images
    useGSAP(
        () => {
            gsap.utils
                .toArray<HTMLDivElement>('.image-container')
                .forEach((imageDiv, i) => {
                    // Scale effect on scroll
                    gsap.fromTo(
                        imageDiv,
                        {
                            scale: 0.9,
                            autoAlpha: 0.5,
                        },
                        {
                            scale: 1,
                            autoAlpha: 1,
                            duration: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: imageDiv,
                                start: 'top bottom',
                                end: 'center center',
                                scrub: 1,
                            },
                        },
                    );

                    // Background position parallax effect
                    const imageElement = imageDiv.querySelector('.image-bg');
                    if (imageElement) {
                        gsap.to(imageElement, {
                            backgroundPosition: `center 10%`,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: imageDiv,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1,
                            },
                        });
                    }
                });
        },
        { scope: containerRef },
    );

    // Animation for section transitions
    useGSAP(
        () => {
            const sections = gsap.utils.toArray('.reveal-section');

            sections.forEach((section, i) => {
                const sectionOverlay =
                    section.querySelector('.section-overlay');

                gsap.set(sectionOverlay, {
                    y: '100%',
                });

                ScrollTrigger.create({
                    trigger: section as Element,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.to(sectionOverlay, {
                            y: '0%',
                            duration: 0.6,
                            ease: 'power3.inOut',
                            onComplete: () => {
                                gsap.to(sectionOverlay, {
                                    y: '-100%',
                                    duration: 0.6,
                                    delay: 0.1,
                                    ease: 'power3.inOut',
                                });
                            },
                        });
                    },
                    once: true,
                });
            });
        },
        { scope: containerRef },
    );

    return (
        <>
            {/* Page transition overlays */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-50 pointer-events-none"
            >
                <div className="overlay-black absolute inset-0 bg-black"></div>
                <div className="overlay-primary absolute inset-0 bg-primary"></div>
            </div>

            <section className="pt-5 pb-14">
                <div className="container" ref={containerRef}>
                    <TransitionLink
                        back
                        href="/"
                        className="mb-16 inline-flex gap-2 items-center group h-12"
                    >
                        <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                        Back
                    </TransitionLink>

                    <div
                        className="top-0 min-h-[calc(100svh-100px)] flex"
                        id="info"
                    >
                        <div className="relative w-full">
                            <div className="flex items-start gap-6 mx-auto mb-10 max-w-[635px]">
                                <h1 className="fade-in-later opacity-0 text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
                                    <span className="inline-block">
                                        {project.title}
                                    </span>
                                </h1>

                                <div className="fade-in-later opacity-0 flex gap-2">
                                    {project.sourceCode && (
                                        <a
                                            href={project.sourceCode}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="hover:text-primary"
                                        >
                                            <Github size={30} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="hover:text-primary"
                                        >
                                            <ExternalLink size={30} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* New layout with revealing sections */}
                            <div className="max-w-[635px] mx-auto">
                                <div className="reveal-section relative overflow-hidden mb-12 p-4">
                                    <div className="section-overlay absolute inset-0 bg-primary"></div>
                                    <div className="relative z-10">
                                        <p className="text-muted-foreground font-anton mb-3">
                                            Year
                                        </p>
                                        <div className="text-lg fade-in-later">
                                            {project.year}
                                        </div>
                                    </div>
                                </div>

                                <div className="reveal-section relative overflow-hidden mb-12 p-4">
                                    <div className="section-overlay absolute inset-0 bg-black"></div>
                                    <div className="relative z-10">
                                        <p className="text-muted-foreground font-anton mb-3">
                                            Tech & Technique
                                        </p>
                                        <div className="text-lg fade-in-later">
                                            {project.techStack.join(', ')}
                                        </div>
                                    </div>
                                </div>

                                <div className="reveal-section relative overflow-hidden mb-12 p-4">
                                    <div className="section-overlay absolute inset-0 bg-primary"></div>
                                    <div className="relative z-10">
                                        <p className="text-muted-foreground font-anton mb-3">
                                            Description
                                        </p>
                                        <div className="text-lg fade-in-later">
                                            <Markdown
                                                className="markdown-text"
                                                remarkPlugins={[remarkGfm]}
                                            >
                                                {project.description}
                                            </Markdown>
                                        </div>
                                    </div>
                                </div>

                                {project.role && (
                                    <div className="reveal-section relative overflow-hidden mb-12 p-4">
                                        <div className="section-overlay absolute inset-0 bg-black"></div>
                                        <div className="relative z-10">
                                            <p className="text-muted-foreground font-anton mb-3">
                                                My Role
                                            </p>
                                            <div className="text-lg fade-in-later">
                                                <Markdown
                                                    className="markdown-text"
                                                    remarkPlugins={[remarkGfm]}
                                                >
                                                    {project.role}
                                                </Markdown>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <ArrowAnimation />
                        </div>
                    </div>

                    <div
                        className="fade-in-later relative flex flex-col gap-12 max-w-[800px] mx-auto mt-24"
                        id="images"
                    >
                        {project.images.map((image, index) => (
                            <div
                                key={image}
                                className={`reveal-section relative overflow-hidden image-container ${
                                    index % 2 === 0
                                        ? 'translate-x-0'
                                        : 'translate-x-0'
                                }`}
                            >
                                <div
                                    className={`section-overlay absolute inset-0 ${
                                        index % 2 === 0
                                            ? 'bg-primary'
                                            : 'bg-black'
                                    }`}
                                ></div>

                                <div className="relative z-10 p-4">
                                    <div
                                        className="image-bg group relative w-full aspect-[750/400] bg-background-light rounded shadow-lg transform transition-transform duration-500 hover:scale-[1.01]"
                                        style={{
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center 50%',
                                            backgroundRepeat: 'no-repeat',
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Image number indicator */}
                                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-anton text-lg size-8 flex items-center justify-center rounded-full z-10">
                                            {index + 1}
                                        </div>

                                        <a
                                            href={image}
                                            target="_blank"
                                            className="absolute bottom-4 right-4 bg-background/70 text-foreground size-12 inline-flex justify-center items-center transition-all opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100 rounded"
                                        >
                                            <ExternalLink />
                                        </a>

                                        {/* Caption that appears on hover */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white font-medium text-lg">
                                                {project.title} - Image{' '}
                                                {index + 1}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectDetails;
