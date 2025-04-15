'use client';
import React, { useEffect, useRef, useState } from 'react';

const ScrollProgressIndicator = () => {
    const scrollBarRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const handleScroll = () => {
            if (scrollBarRef.current) {
                const { scrollHeight, clientHeight } = document.documentElement;
                const scrollableHeight = scrollHeight - clientHeight;
                const scrollY = window.scrollY;
                const scrollProgress = (scrollY / scrollableHeight) * 100;

                setProgress(Math.round(scrollProgress));
                scrollBarRef.current.style.transform = `translateY(-${
                    100 - scrollProgress
                }%)`;
            }
        };

        checkMobile();
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div
            className={`fixed ${
                isMobile
                    ? 'bottom-4 right-4'
                    : 'top-[50svh] right-[2%] -translate-y-1/2'
            } flex items-center gap-2`}
        >
            <span
                className={`${
                    isMobile ? 'text-xs' : 'text-sm'
                } font-medium text-primary`}
            >
                {progress}%
            </span>
            <div
                className={`w-1 ${
                    isMobile ? 'h-[60px]' : 'h-[100px]'
                } rounded-full bg-background-light overflow-hidden`}
            >
                <div
                    className="w-full bg-primary rounded-full h-full transition-transform duration-150"
                    ref={scrollBarRef}
                ></div>
            </div>
        </div>
    );
};

export default ScrollProgressIndicator;
