import React, { useState, useEffect, useRef } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';

export function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const elementRef = React.useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || target <= 0) return;
    
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, hasStarted]);

  return { count, ref: elementRef };
}

export function useLandingProjects(limit = 6) {
  const { getFechData } = useFetchDataPromise();
  const [recentProjects, setRecentProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRecentProjects = async () => {
      setIsLoading(true);
      try {
        const response = await getFechData({ 
          endPoint: `projects?limit=${limit}&status=Visible`, 
          method: 'GET' 
        });
        
        if (isMounted && response?.code === API_CODES.OK) {
          setRecentProjects(response.data?.data || []);
          setTotalProjects(response.data?.total || 0);
        }
      } catch {
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchRecentProjects();
    return () => { isMounted = false; };
  }, [getFechData, limit]);

  return {
    recentProjects,
    totalProjects,
    isLoading
  };
}
