'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const amongUsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bubbleTextRef = useRef<HTMLDivElement>(null);
    const [showBubble, setShowBubble] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messages = [
        'Kinda sus... ඞ',
        "I'm not the imposter",
        'I was in electrical',
        'Vote red! 𐐘',
        'Emergency meeting!',
        'Where was everybody?',
        'I saw blue vent!',
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    // Function to animate typing effect
    const typeText = (text: string, i = 0) => {
        if (i === 0) {
            setDisplayText('');
            setIsTyping(true);
        }

        if (i < text.length) {
            setDisplayText(text.substring(0, i + 1));
            setTimeout(() => typeText(text, i + 1), 50); // Adjust speed here
        } else {
            setIsTyping(false);
        }
    };

    useGSAP((context, contextSafe) => {
        if (window.innerWidth < 768) return;

        // Initialize position to prevent getting stuck at top
        if (containerRef.current) {
            gsap.set(containerRef.current, {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 0,
            });
        }

        // Rotate Among Us animation
        gsap.to(amongUsRef.current, {
            rotation: 360,
            duration: 6,
            repeat: -1,
            ease: 'none',
        });

        // Create subtle floating animation for Among Us
        gsap.to(amongUsRef.current, {
            y: '+=5',
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // Show speech bubble at intervals
        const showBubbleInterval = setInterval(() => {
            setShowBubble(true);
            // Get random message
            const randomMessage =
                messages[Math.floor(Math.random() * messages.length)];
            setCurrentMessage(randomMessage);
            typeText(randomMessage);

            // Hide the bubble after message duration + typing time
            const messageDuration = 1000;
            const typingTime = randomMessage.length * 50;
            setTimeout(() => {
                setShowBubble(false);
            }, messageDuration + typingTime);
        }, 8000);

        const handleMouseMove = contextSafe?.((e: MouseEvent) => {
            if (!svgRef.current || !containerRef.current) return;

            const { clientX, clientY } = e;

            // Update cursor position immediately
            gsap.to(svgRef.current, {
                x: clientX,
                y: clientY,
                ease: 'power2.out',
                duration: 0.15,
                opacity: 1,
            });

            // Update container position with a small lag and offset
            gsap.to(containerRef.current, {
                x: clientX + 30,
                y: clientY + 30,
                ease: 'power1.out',
                duration: 0.5,
                opacity: 1,
            });
        }) as any;

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(showBubbleInterval);
        };
    });

    return (
        <>
            <svg
                width="27"
                height="30"
                viewBox="0 0 27 30"
                className="hidden md:block fixed top-0 left-0 opacity-0 z-[50] pointer-events-none"
                fill="none"
                id="cursor"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
                ref={svgRef}
            >
                <path
                    d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                    className="fill-foreground stroke-background/50"
                />
            </svg>

            {/* Main container for Among Us and bubble */}
            <div
                ref={containerRef}
                className="hidden md:block fixed top-0 left-0 opacity-0 z-[50] pointer-events-none"
            >
                {/* Speech Bubble - Among Us Style */}
                <div
                    className={`absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white rounded-lg p-3 text-sm whitespace-nowrap shadow-md ${
                        showBubble ? 'opacity-100' : 'opacity-0'
                    } transition-opacity border-2 border-gray-600`}
                    style={{
                        minWidth: '140px',
                        textAlign: 'center',
                        backgroundColor: '#1a1c29',
                        fontFamily:
                            '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                    }}
                >
                    <div ref={bubbleTextRef}>
                        {displayText}
                        {isTyping && (
                            <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>
                        )}
                    </div>
                    {/* Speech bubble triangle - Among Us style */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-800 border-t-[#1a1c29]"></div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-600"></div>
                </div>

                {/* Among Us character */}
                <div
                    ref={amongUsRef}
                    style={{ transformOrigin: 'center center' }}
                >
                    <Image
                        src="/amongus.png"
                        alt="Among Us"
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                </div>
            </div>
        </>
    );
};

export default CustomCursor;
