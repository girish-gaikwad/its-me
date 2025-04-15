'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLHeadingElement>(null);
    const statsRef = React.useRef<HTMLDivElement>(null);

    // Initial animations when the component mounts
    useGSAP(
        () => {
            // Staggered entrance for elements
            const tl = gsap.timeline();

            tl.from('.banner-title-part', {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
            })
                .from(
                    '.banner-description',
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    '-=0.3',
                )
                .from(
                    '.banner-button',
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                    },
                    '-=0.2',
                )
                .from(
                    '.stat-item',
                    {
                        scale: 0.8,
                        opacity: 0,
                        stagger: 0.15,
                        duration: 0.7,
                        ease: 'back.out(1.7)',
                    },
                    '-=0.3',
                );

            // Floating animation for background elements
            gsap.to('.floating-bg-element', {
                y: -30,
                x: 15,
                rotation: 5,
                duration: 6,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                yoyoEase: 'sine.inOut',
            });

            gsap.to('.floating-bg-element-2', {
                y: 30,
                x: -20,
                rotation: -7,
                duration: 7,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 0.5,
                yoyoEase: 'sine.inOut',
            });
        },
        { scope: containerRef },
    );

    // Scroll animation
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    // Parallax effect on mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Calculate mouse position as percentage of window
            const mouseXpercentage = Math.round((clientX / windowWidth) * 100);
            const mouseYpercentage = Math.round((clientY / windowHeight) * 100);

            if (titleRef.current) {
                gsap.to(titleRef.current, {
                    x: (mouseXpercentage - 50) * 0.1,
                    y: (mouseYpercentage - 50) * 0.05,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            }

            if (statsRef.current) {
                gsap.to(statsRef.current, {
                    x: (mouseXpercentage - 50) * -0.05,
                    y: (mouseYpercentage - 50) * -0.03,
                    duration: 0.8,
                    ease: 'power2.out',
                });
            }

            // Parallax for background elements
            gsap.to('.floating-bg-element', {
                x: (mouseXpercentage - 50) * 0.2 + 15,
                y: (mouseYpercentage - 50) * 0.1 - 30,
                duration: 1.2,
                ease: 'power1.out',
            });

            gsap.to('.floating-bg-element-2', {
                x: (mouseXpercentage - 50) * -0.15 - 20,
                y: (mouseYpercentage - 50) * -0.05 + 30,
                duration: 1.5,
                ease: 'power1.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Animate counter for stats
    useEffect(() => {
        const inViewObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetElement = entry.target;
                        const finalValue = parseInt(
                            targetElement.getAttribute('data-value') || '0',
                        );
                        const duration = 2;

                        gsap.fromTo(
                            targetElement,
                            { innerText: '0' },
                            {
                                innerText: finalValue,
                                duration: duration,
                                ease: 'power1.inOut',
                                snap: { innerText: 1 }, // Ensures whole numbers
                                onUpdate: function () {
                                    targetElement.textContent =
                                        Math.ceil(
                                            parseFloat(
                                                targetElement.textContent ||
                                                    '0',
                                            ),
                                        ) +
                                        (targetElement.getAttribute(
                                            'data-suffix',
                                        ) || '');
                                },
                            },
                        );

                        // Unobserve after animation
                        inViewObserver.unobserve(targetElement);
                    }
                });
            },
            { threshold: 0.5 },
        );

        // Observe each counter element
        document.querySelectorAll('.counter-animation').forEach((counter) => {
            inViewObserver.observe(counter);
        });

        return () => {
            document
                .querySelectorAll('.counter-animation')
                .forEach((counter) => {
                    inViewObserver.unobserve(counter);
                });
        };
    }, []);

    return (
        <section
            className="relative overflow-hidden h-[100svh] min-h-[530px]"
            id="banner"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="floating-bg-element absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
                <div className="floating-bg-element-2 absolute bottom-[15%] right-[5%] w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_70%)]"></div>
            </div>

            <ArrowAnimation />

            <div
                className="container h-full min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px] slide-up-and-fade">
                    <h1
                        className="banner-title leading-[.95] text-6xl sm:text-[80px] font-anton relative"
                        ref={titleRef}
                    >
                        <span className="banner-title-part block text-primary relative overflow-hidden">
                            FULLSTACK
                            <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/20"></span>
                        </span>
                        <span className="banner-title-part ml-4 block relative">
                            DEVELOPER
                            <div className="absolute -z-10 left-0 bottom-0 w-1/3 h-2 bg-gradient-to-r from-primary/30 to-transparent"></div>
                        </span>
                    </h1>

                    <p className="banner-description mt-6 text-lg text-muted-foreground slide-up-and-fade">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground relative inline-block">
                            {GENERAL_INFO.name}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40"></span>
                        </span>
                        . A passionate Web Developer dedicated to crafting
                        elegant, user-centric web experiences with modern
                        technologies and best practices.
                    </p>

                    <div className="relative mt-9">
                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${GENERAL_INFO.email}&su=${GENERAL_INFO.emailSubject}&body=${GENERAL_INFO.emailBody}`}
                            variant="primary"
                            className="banner-button slide-up-and-fade relative z-10 group"
                        >
                            <span className="relative z-10">Hire Me</span>
                            <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                            <span className="absolute -right-2 -bottom-2 w-6 h-6 border-r-2 border-b-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                        <div className="absolute -left-2 -top-2 w-6 h-6 border-l-2 border-t-2 border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>

                <div
                    className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right slide-up-and-fade"
                    ref={statsRef}
                >
                    <div
                        className="stat-item relative p-4 md:p-5"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5 flex items-center justify-center md:justify-end">
                            <span
                                className="counter-animation"
                                data-value=""
                                data-suffix="+"
                            >
                                0+
                            </span>
                        </h5>
                        <p className="text-muted-foreground">
                            Years of Experience
                        </p>
                        <span className="absolute inset-0 bg-primary/5 -z-10 rounded-lg transform md:skew-x-6"></span>
                    </div>

                    <div
                        className="stat-item relative p-4 md:p-5"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5 flex items-center justify-center md:justify-end">
                            <span
                                className="counter-animation"
                                data-value="4"
                                data-suffix="+"
                            >
                                0+
                            </span>
                        </h5>
                        <p className="text-muted-foreground">
                            Completed Projects
                        </p>
                        <span className="absolute inset-0 bg-primary/5 -z-10 rounded-lg transform md:skew-x-6"></span>
                    </div>

                    <div
                        className="stat-item relative p-4 md:p-5"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5 flex items-center justify-center md:justify-end">
                            <span
                                className="counter-animation"
                                data-value="5"
                                data-suffix="K+"
                            >
                                0K+
                            </span>
                        </h5>
                        <p className="text-muted-foreground">Hours Worked</p>
                        <span className="absolute inset-0 bg-primary/5 -z-10 rounded-lg transform md:skew-x-6"></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
