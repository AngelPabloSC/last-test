import { useState, useEffect } from 'react';

const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const AVATAR_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8E24AA', '#F4511E', '#3949AB'];

export function useGetReviewGoogle() {
  const [state, setState] = useState({
    googleReviews: [],
    googleRating: 4.8, // Fallback defaults
    googleTotal: 247,  // Fallback defaults
    loading: true,
    error: null,
  });

  useEffect(() => {
    let script = document.getElementById('google-maps-places-script');
    
    const fetchReviews = async () => {
      try {
        // Modern Place API usage (suppresses the PlacesService deprecation warning)
        const { Place } = await window.google.maps.importLibrary("places");
        
        const place = new Place({
          id: placeId,
          requestedLanguage: 'en',
        });
        
        await place.fetchFields({
          fields: ['displayName', 'rating', 'userRatingCount', 'reviews']
        });
        
        let formatted = [];
        console.log(place.reviews)
        if (place.reviews && place.reviews.length > 0) {
           formatted = place.reviews.map((r, i) => ({
              id: i, // The new API doesn't always expose time the same way
              name: r.authorAttribution?.displayName || 'Google User',
              initial: r.authorAttribution?.displayName ? r.authorAttribution.displayName.charAt(0).toUpperCase() : 'G',
              avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
              rating: r.rating,
              text: r.text || '',
              url: r.oh || r.authorAttribution?.uri || r.authorUrl || '#',
              // Relative time is no longer a simple string, using publishTime
              date: r.publishTime ? new Date(r.publishTime).toLocaleDateString() : 'Recently',
           }));
        }
        
        setState(prev => ({
          ...prev,
          googleRating: place.rating || prev.googleRating,
          googleTotal: place.userRatingCount || prev.googleTotal,
          googleReviews: place.reviews ? formatted : prev.googleReviews,
          loading: false
        }));
      } catch (err) {
        console.error('Error executing google.maps.places.Place:', err);
        // If it's an INVALID_REQUEST, log it so the user knows about the ID issue
        setState(prev => ({ ...prev, error: err.message, loading: false }));
      }
    };

    if (!script) {
      // Setup dynamic maps loading using modern callback methodology
      script = document.createElement('script');
      script.id = 'google-maps-places-script';
      // Load strictly version v=weekly instead of relying on legacy loaders
      window.initGoogleMaps = () => { fetchReviews(); };
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps&v=weekly&loading=async`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
         setState(prev => ({ ...prev, error: "Failed to load Google Maps script", loading: false }));
      };
      document.head.appendChild(script);
    } else if (window.google && window.google.maps && window.google.maps.importLibrary) {
      fetchReviews();
    } else {
      script.addEventListener('load', fetchReviews);
    }

    return () => {
      if (script) {
        script.removeEventListener('load', fetchReviews);
      }
    };
  }, []);

  return state;
}
