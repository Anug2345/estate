import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'drag' | 'play' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth delay follow
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkTouch = () => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
      };
      checkTouch();
      window.addEventListener('resize', checkTouch);
      return () => window.removeEventListener('resize', checkTouch);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Inspect target elements to dynamically change cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target is interactive or has custom attributes
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('select') || 
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');

      const customCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (customCursor) {
        setCursorType(customCursor as any);
      } else if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  // Custom visual styles for different hover actions
  const getCursorStyle = () => {
    switch (cursorType) {
      case 'pointer':
        return {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(200, 169, 106, 0.15)',
          borderColor: 'rgba(200, 169, 106, 0.8)',
          borderWidth: 1.5,
        };
      case 'drag':
        return {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(200, 169, 106, 0.9)',
          borderColor: '#C8A96A',
          borderWidth: 1,
        };
      case 'play':
        return {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(17, 17, 17, 0.9)',
          borderColor: '#C8A96A',
          borderWidth: 1.5,
        };
      case 'view':
        return {
          width: 72,
          height: 72,
          backgroundColor: 'rgba(200, 169, 106, 0.2)',
          borderColor: '#C8A96A',
          borderWidth: 2,
        };
      default:
        return {
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          borderColor: 'rgba(200, 169, 106, 0.6)',
          borderWidth: 1.5,
        };
    }
  };

  return (
    <>
      {/* Outer follow circle */}
      <motion.div
        id="custom-cursor-outer"
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-9999 flex items-center justify-center overflow-hidden mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          ...getCursorStyle(),
        }}
        animate={{
          scale: isVisible ? 1 : 0,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {cursorType === 'drag' && (
          <span className="text-[10px] font-mono tracking-widest text-[#111111] font-bold uppercase select-none">
            Drag
          </span>
        )}
        {cursorType === 'play' && (
          <span className="text-[10px] font-mono tracking-widest text-[#C8A96A] font-bold uppercase select-none">
            Play
          </span>
        )}
        {cursorType === 'view' && (
          <span className="text-[10px] font-mono tracking-widest text-white font-bold uppercase select-none">
            View
          </span>
        )}
      </motion.div>

      {/* Tiny inner precision point */}
      <motion.div
        id="custom-cursor-inner"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#C8A96A] rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isVisible ? (cursorType === 'default' ? 1 : 0.5) : 0,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
      />
    </>
  );
}
