import { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Button, Container, Grid, IconButton, Pagination, Skeleton, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import PhoneIcon from '@mui/icons-material/Phone';
import CreateIcon from '@mui/icons-material/Create';

import {
  TRUST_ITEMS,
  STATS,
  REVIEW_FILTERS,
  REVIEWS,
  GOOGLE_REVIEWS,
} from '@/data/reviewsData';

import ReviewStarRating from '@/components/ui/ReviewStarRating';
import ReviewCard from '@/components/cards/ReviewCard';
import GoogleReviewCard from '@/components/cards/GoogleReviewCard';
import { usePublicReviews } from '@/hooks/usePublicReviews';
import { useGetReviewGoogle } from '@/hooks/useGetReviewGoogle';
import SEO from '@/components/ui/SEO';

const HERO_BG = 'https://images.unsplash.com/photo-1577032229954-61f1e6f63973?w=1440&q=80';
const CTA_BG = 'https://images.unsplash.com/photo-1761509844483-38db3cfab696?w=1440&q=80';





function HeroSection(props) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 4, md: 15 },
        py: { xs: 8, md: 10 },
        minHeight: { xs: 450, md: 520 },
        backgroundImage: `url('${HERO_BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #000000EE 0%, #000000BB 55%, #00000055 100%)' }} />
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', maxWidth: 550, flexDirection: 'column', gap: 2.5 }}>
        <Box sx={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: 1, borderRadius: 999, bgcolor: `${gold}20`, px: 2, py: 0.75 }}>
          <StarIcon sx={{ fontSize: 14, color: gold }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: gold }}>
            {props.count || '500+'} Five-Star Reviews
          </Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.1, color: 'white' }}>
          Real Reviews.<br />Real Results.
        </Typography>
        <Typography sx={{ fontSize: 18, lineHeight: 1.6, color: '#CCCCCC' }}>
          Trusted by 500+ homeowners across the Capital Region for over 5 years
          of roofing, siding & gutter excellence.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ReviewStarRating rating={Math.round(props.average || 5)} size={20} />
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{props.average || '4.8'}/5</Typography>
          <Typography sx={{ fontSize: 14, color: '#888' }}>· {props.count || '500+'} verified reviews</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} href="/About/Contact-us" sx={{ bgcolor: gold, color: 'black', fontWeight: 700, px: 4, py: 1.5, borderRadius: '16px', textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}>
            Get Free Inspection
          </Button>
          <Button variant="outlined" href="#reviews" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, px: 4, py: 1.5, borderRadius: '16px', textTransform: 'none', '&:hover': { borderColor: 'rgba(255,255,255,0.6)', bgcolor: 'transparent' } }}>
            Read Reviews
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [googlePage, setGooglePage] = useState(1);
  const itemsPerPage = 6;
  const theme = useTheme();
  const gold = theme.palette.primary.main;

  const { list, totalPages, currentPage, total, loading, serviceTypes, summary, fetchReviews } = usePublicReviews({
    serviceTypeId: activeFilter,
    limit: 6
  });

  const {
    googleReviews,
    googleRating,
    googleTotal,
    loading: googleLoading,
    error: googleError,
  } = useGetReviewGoogle();

  // Memoized derived state – only recomputed when their dependencies change
  const dynamicStats = useMemo(() => [
    { value: `${summary.average}/5`, label: 'Average Rating' },
    { number: summary.count, value: `${summary.count}`, label: 'Verified Reviews' },
    { value: `${Math.round((summary.average / 5) * 100)}%`, label: 'Satisfaction Rate' }
  ], [summary.average, summary.count]);

  const dynamicFilters = useMemo(() => [
    { id: 'all', label: 'All Reviews' },
    ...serviceTypes.map((s) => ({ id: s.id, label: s.name }))
  ], [serviceTypes]);

  const dynamicPlatforms = useMemo(() => [
    { 
      name: 'Google', 
      rating: googleRating, 
      reviews: `${googleTotal} reviews`, 
      color: '#4285F4', 
      badge: 'Top Rated',
      url: 'https://www.google.com/maps/place/Nova+Solutions+Home+Improvement/@42.8932304,-74.007822,8z/data=!4m6!3m5!1s0x23cbf34f42fba98b:0x5465d1384779fc11!8m2!3d42.8932304!4d-74.007822!16s%2Fg%2F11z14g_zfs?entry=ttu'
    },
    { 
      name: 'BBB', 
      rating: 'A+', 
      reviews: 'Accredited Business', 
      color: '#00599C', 
      badge: 'Accredited',
      url: 'https://www.bbb.org/us/ny/albany/profile/residential-roofing/nova-solutions-home-improvement-0041-236028882'
    }
  ], [googleRating, googleTotal]);

  const handlePageChange = useCallback((event, value) => {
    fetchReviews(value);
    const element = document.getElementById('reviews');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [fetchReviews]);

  const formattedReviews = useMemo(() => list.map((r) => ({
    ...r,
    name: r.fullName,
    text: r.review,
    service: r.serviceType?.name || 'General',
    date: new Date(r.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  })), [list]);

  const totalGooglePages = useMemo(() => Math.ceil(googleReviews.length / itemsPerPage), [googleReviews.length, itemsPerPage]);
  const googleReviewsPaginated = useMemo(
    () => googleReviews.slice((googlePage - 1) * itemsPerPage, googlePage * itemsPerPage),
    [googleReviews, googlePage, itemsPerPage],
  );
  
  const featuredReview = googleReviews[0] || null;

  const handleGooglePageChange = useCallback((event, value) => {
    setGooglePage(value);
    const element = document.getElementById('google-reviews-section');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#111111', color: 'white' }}>
      <SEO 
        title="Customer Reviews | Nova Solutions Restoration | Trusted in Albany"
        description="See what our happy customers say about our roofing, siding, and gutter services in Albany and the Capital Region. Trusted home restoration specialists with 5-star results."
        keywords="customer reviews Albany, roofing testimonials Capital Region, siding contractor reviews NY, Nova Solutions Restoration feedback"
      />
      <HeroSection count={summary.count} average={summary.average} />

      {/* Trust Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 3, md: 6 }, flexWrap: 'wrap', bgcolor: gold, px: { xs: 4, md: 15 }, py: 2 }}>
        {TRUST_ITEMS.map((item) => (
          <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#111' }} />
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{item}</Typography>
          </Box>
        ))}
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, bgcolor: '#0A0A0A', px: { xs: 4, md: 15 }, py: { xs: 5, md: 6 } }}>
        {dynamicStats.map(({ value, label }) => (
          <Box key={label} sx={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, borderRadius: '20px', border: '1px solid #2A2A2A', bgcolor: '#1A1A1A', p: 4 }}>
            <Typography sx={{ fontSize: { xs: 36, md: 44 }, fontWeight: 800, color: gold }}>{value}</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#AAAAAA' }}>{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Reviews Section */}
      <Box id="reviews" sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: { xs: 4, md: 15 }, py: { xs: 6, md: 9 }, background: `radial-gradient(ellipse 120% 120% at 50% 20%, ${gold}08 0%, transparent 100%), #111111` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: gold }}>Testimonials</Typography>
          <Typography sx={{ fontSize: { xs: 32, md: 38 }, fontWeight: 800, color: 'white' }}>Hear From Our Happy Customers</Typography>
          <Box sx={{ height: 4, width: 60, borderRadius: 999, bgcolor: gold }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <ReviewStarRating rating={Math.round(summary.average || 5)} size={22} />
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{summary.average}/5</Typography>
          <Box sx={{ height: 24, width: '1px', bgcolor: '#444' }} />
          <Typography sx={{ fontSize: 14, color: '#999' }}>Based on {summary.count || '0'} verified reviews</Typography>
        </Box>

        {/* Filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mt: 2 }}>
          {dynamicFilters.map(({ id, label }) => (
            <Box
              key={id}
              component="button"
              onClick={() => setActiveFilter(id)}
              sx={{
                borderRadius: 999, px: 3, py: 1.25, fontSize: 13, fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer',
                bgcolor: activeFilter === id ? gold : 'transparent',
                color: activeFilter === id ? '#111' : '#AAAAAA',
                border: activeFilter === id ? `1px solid ${gold}` : '1px solid #444',
                '&:hover': activeFilter !== id ? { borderColor: '#666' } : {},
              }}
            >
              {label}
            </Box>
          ))}
        </Box>

        {loading ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Skeleton variant="rectangular" height={280} sx={{ borderRadius: '20px', bgcolor: '#1A1A1A' }} />
              </Grid>
            ))}
          </Grid>
        ) : formattedReviews.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {formattedReviews.map((r) => (
              <Grid size={{ xs: 12, md: 4 }} key={r.id} sx={{ display: 'flex' }}>
                <ReviewCard review={r} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography sx={{ color: '#666', fontSize: 18 }}>
              No reviews found for this category.
            </Typography>
          </Box>
        )}

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#888',
                  borderColor: '#2A2A2A',
                  '&.Mui-selected': {
                    bgcolor: gold,
                    color: 'black',
                    '&:hover': { bgcolor: '#EAB308' }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'white'
                  }
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap', pt: 2 }}>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} href="/About/Contact-us" sx={{ bgcolor: gold, color: 'black', fontWeight: 700, px: 4, py: 1.5, borderRadius: '20px', textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}>
            Get Free Inspection
          </Button>
          <Button 
            variant="outlined" 
            href="https://g.page/r/CRH8eUc40WVUEAE/review" 
            target="_blank"
            sx={{ borderColor: gold, color: gold, fontWeight: 700, px: 4, py: 1.5, borderRadius: '20px', textTransform: 'none', '&:hover': { bgcolor: `${gold}10`, borderColor: gold } }}
          >
            Leave a Review
          </Button>
        </Box>
      </Box>

      {/* Google Reviews Section */}
      <Box id="google-reviews-section" sx={{ display: 'flex', flexDirection: 'column', gap: 6, bgcolor: '#0A0A0A', px: { xs: 4, md: 15 }, py: { xs: 6, md: 10 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, color: '#4285F4' }}>Google Reviews</Typography>
          <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: 'white' }}>Verified by Google</Typography>
          <Box sx={{ height: 3, width: 40, borderRadius: 999, bgcolor: gold }} />
          <Typography sx={{ maxWidth: 560, fontSize: 14, lineHeight: 1.7, color: '#888' }}>
            Real reviews from real customers — straight from our Google Business Profile
          </Typography>
        </Box>

        {/* Google Summary Banner */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, borderRadius: '16px', border: '1px solid #2A2A2A', bgcolor: '#1A1A1A', p: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: { lg: 320 }, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontSize: 28, fontWeight: 900, color: '#4285F4' }}>G</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Google Reviews</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 72, fontWeight: 800, lineHeight: 1, color: 'white' }}>{googleRating}</Typography>
              <ReviewStarRating rating={Math.round(googleRating)} size={20} color="#FBBC05" />
              <Typography sx={{ fontSize: 13, color: '#888', mt: 1 }}>{googleTotal} reviews</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                { stars: 5, pct: Math.min(100, Math.max(0, (googleRating - 4) * 100)) || 85 },
                { stars: 4, pct: 10 },
                { stars: 3, pct: 3 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 }
              ].map(({ stars, pct }) => (
                <Box key={stars} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ width: 16, textAlign: 'right', fontSize: 11, color: '#888' }}>{stars}★</Typography>
                  <Box sx={{ height: 8, flex: 1, borderRadius: 999, bgcolor: '#2A2A2A', overflow: 'hidden' }}>
                    <Box sx={{ height: '100%', width: `${pct}%`, bgcolor: gold, borderRadius: 999 }} />
                  </Box>
                  <Typography sx={{ width: 28, fontSize: 11, color: '#888' }}>{pct}%</Typography>
                </Box>
              ))}
            </Box>
            <Button variant="outlined" endIcon={<LaunchIcon sx={{ fontSize: 14 }} />} href="https://www.google.com/maps/place/Nova+Solutions+Home+Improvement/@42.8932304,-74.007822,8z/data=!4m6!3m5!1s0x23cbf34f42fba98b:0x5465d1384779fc11!8m2!3d42.8932304!4d-74.007822!16s%2Fg%2F11z14g_zfs?entry=ttu" target="_blank" sx={{ mt: 1, width: 'fit-content', borderColor: '#4285F4', color: '#4285F4', fontWeight: 700, borderRadius: '8px', textTransform: 'none', '&:hover': { bgcolor: '#4285F410', borderColor: '#4285F4' } }}>
              View all on Google
            </Button>
          </Box>

          <Box 
            component={featuredReview?.url && featuredReview.url !== '#' ? "a" : "div"}
            href={featuredReview?.url && featuredReview.url !== '#' ? featuredReview.url : undefined}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '12px', bgcolor: '#111111', p: { xs: 3, md: 4 }, textDecoration: 'none', transition: 'all 0.2s', '&:hover': featuredReview?.url ? { bgcolor: '#161616', transform: 'translateY(-2px)' } : {} }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {googleLoading ? (
                  <Skeleton variant="circular" width={44} height={44} sx={{ bgcolor: '#2A2A2A' }} />
                ) : (
                  <Box sx={{ display: 'flex', height: 44, width: 44, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', bgcolor: featuredReview?.avatarColor || '#4285F4' }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{featuredReview?.initial || 'N'}</Typography>
                  </Box>
                )}
                <Box>
                  {googleLoading ? (
                    <>
                      <Skeleton width={100} height={20} sx={{ bgcolor: '#2A2A2A' }} />
                      <Skeleton width={60} height={14} sx={{ bgcolor: '#2A2A2A' }} />
                    </>
                  ) : (
                    <>
                      <Typography sx={{ fontWeight: 700, color: 'white' }}>{featuredReview?.name || 'Nova Customer'}</Typography>
                      <Typography sx={{ fontSize: 12, color: '#666' }}>{featuredReview?.date || 'Just now'}</Typography>
                    </>
                  )}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 24, fontWeight: 900, color: '#4285F4' }}>G</Typography>
            </Box>
            {googleLoading ? (
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: '8px', bgcolor: '#2A2A2A' }} />
            ) : (
              <>
                <ReviewStarRating rating={featuredReview?.rating || 5} size={16} color="#FBBC05" />
                <Typography sx={{ flex: 1, fontSize: 14, lineHeight: 1.7, color: '#BBBBBB', fontStyle: 'italic' }}>
                  "{featuredReview?.text || 'Great service and quality work!'}"
                </Typography>
              </>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #2A2A2A', pt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontWeight: 900, color: '#4285F4' }}>G</Typography>
                <Typography sx={{ fontSize: 11, color: '#666' }}>Posted on Google</Typography>
              </Box>
              <Typography sx={{ borderRadius: 999, bgcolor: '#34A85320', px: 1.25, py: 0.5, fontSize: 10, fontWeight: 600, color: '#34A853' }}>✓ Verified Review</Typography>
            </Box>
          </Box>
        </Box>

        {googleLoading ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[1, 2, 3].map((i) => (
              <Grid size={{ xs: 12, md: 4 }} key={`google-skeleton-${i}`}>
                <Skeleton variant="rectangular" height={240} sx={{ borderRadius: '16px', bgcolor: '#1A1A1A' }} />
              </Grid>
            ))}
          </Grid>
        ) : googleReviewsPaginated.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {googleReviewsPaginated.map((r) => (
              <Grid size={{ xs: 12, md: 4 }} key={r.id} sx={{ display: 'flex' }}>
                <GoogleReviewCard review={r} />
              </Grid>
            ))}
          </Grid>
        ) : googleError ? (
          <Typography sx={{ color: '#E53E3E', textAlign: 'center', mt: 2 }}>
            Error loading Google verification {googleError}
          </Typography>
        ) : (
          <Typography sx={{ color: '#888', textAlign: 'center', mt: 2 }}>
            No Google reviews found.
          </Typography>
        )}

        {/* Google Reviews Pagination */}
        {totalGooglePages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination 
              count={totalGooglePages} 
              page={googlePage} 
              onChange={handleGooglePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#888',
                  borderColor: '#2A2A2A',
                  '&.Mui-selected': {
                    bgcolor: gold,
                    color: 'black',
                    '&:hover': { bgcolor: '#EAB308' }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'white'
                  }
                }
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReviewStarRating rating={Math.round(googleRating)} size={16} color="#FBBC05" />
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#AAAAAA' }}>{googleRating} · {googleTotal} reviews on Google</Typography>
          </Box>
          <Typography sx={{ fontSize: 14, color: '#888' }}>See what {googleTotal} happy homeowners are saying about us</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" endIcon={<LaunchIcon sx={{ fontSize: 14 }} />} href="https://www.google.com/maps/place/Nova+Solutions+Home+Improvement/@42.8932304,-74.007822,8z/data=!4m6!3m5!1s0x23cbf34f42fba98b:0x5465d1384779fc11!8m2!3d42.8932304!4d-74.007822!16s%2Fg%2F11z14g_zfs?entry=ttu" target="_blank" sx={{ borderColor: '#4285F4', color: '#4285F4', fontWeight: 700, borderRadius: '8px', px: 3, textTransform: 'none', '&:hover': { bgcolor: '#4285F410', borderColor: '#4285F4' } }}>
               See All Reviews on Google
            </Button>
            <Button variant="contained" startIcon={<CreateIcon />} href="https://g.page/r/CRH8eUc40WVUEAE/review" target="_blank" sx={{ bgcolor: gold, color: 'black', fontWeight: 700, borderRadius: '8px', px: 3, textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}>
              Leave Us a Review
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Mid CTA Bar */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 3, borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', bgcolor: '#1A1A1A', px: { xs: 4, md: 15 }, py: 4 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'white', textAlign: 'center' }}>
          Ready to experience the Nova Solutions difference?
        </Typography>
        <Button variant="contained" endIcon={<ArrowForwardIcon />} href="/About/Contact-us" sx={{ bgcolor: gold, color: 'black', fontWeight: 700, px: 4, py: 1.5, borderRadius: '16px', textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}>
          Get Free Inspection
        </Button>
      </Box>

      {/* Platforms */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, bgcolor: '#0A0A0A', px: { xs: 4, md: 15 }, py: { xs: 6, md: 9 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, color: gold }}>Find Us On</Typography>
          <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800, color: 'white' }}>Trusted Across Multiple Platforms</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, width: '100%' }}>
          {dynamicPlatforms.map(({ name, rating, reviews, color, badge, url }) => (
            <Box 
              key={name} 
              component={url ? "a" : "div"}
              href={url}
              target={url ? "_blank" : undefined}
              rel="noopener noreferrer"
              sx={{ 
                flex: 1, 
                minWidth: 260, 
                maxWidth: 320, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 2, 
                borderRadius: '20px', 
                border: '1px solid #2A2A2A', 
                bgcolor: '#1A1A1A', 
                p: 4,
                textDecoration: 'none',
                transition: 'all 0.2s',
                cursor: url ? 'pointer' : 'default',
                '&:hover': url ? { borderColor: color, transform: 'translateY(-4px)' } : {}
              }}
            >
              <Typography sx={{ fontSize: 32, fontWeight: 900, color }}>{name}</Typography>
              <Typography sx={{ fontSize: 40, fontWeight: 800, color: 'white' }}>{rating}</Typography>
              <ReviewStarRating rating={name === 'Google' ? Math.round(googleRating) : 5} size={18} color="#FFD700" />
              <Typography sx={{ fontSize: 14, color: '#888' }}>{reviews}</Typography>
              <Typography sx={{ borderRadius: 999, px: 2, py: 0.75, fontSize: 12, fontWeight: 700, color, bgcolor: `${color}30` }}>
                {badge}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom CTA */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3.5,
          px: { xs: 4, md: 15 },
          py: { xs: 8, md: 10 },
          minHeight: 400,
          textAlign: 'center',
          backgroundImage: `url('${CTA_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000000DD 0%, #000000AA 100%)' }} />
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3.5 }}>
          <Typography sx={{ maxWidth: 800, fontSize: { xs: 32, md: 44 }, fontWeight: 800, color: 'white' }}>
            Ready to Start Your Project?
          </Typography>
          <Typography sx={{ maxWidth: 700, fontSize: 18, color: '#CCCCCC' }}>
            Join hundreds of satisfied homeowners in the Capital Region.
            Get your free inspection today!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="contained" endIcon={<ArrowForwardIcon />} href="/About/Contact-us" sx={{ bgcolor: gold, color: 'black', fontWeight: 700, px: 5, py: 2, borderRadius: '16px', fontSize: 16, textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}>
              Get Free Inspection
            </Button>
            <Button variant="outlined" startIcon={<PhoneIcon />} href="tel:+15185985156" sx={{ borderColor: gold, color: gold, fontWeight: 700, px: 5, py: 2, borderRadius: '16px', fontSize: 16, textTransform: 'none', '&:hover': { bgcolor: `${gold}10`, borderColor: gold } }}>
              Call Us Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
