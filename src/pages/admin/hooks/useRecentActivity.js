import { useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import { formatDistanceToNow } from 'date-fns';

export const useRecentActivity = () => {
  const { getFechData } = useFetchDataPromise();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    const response = await getFechData({
      endPoint: 'admin/activities',
      method: 'GET',
    });

    if (response?.code === API_CODES.OK) {
      const formattedActivities = (response.data ?? []).map(item => {
        let type = 'published'; // Default type
        if (item.entityType === 'contact') type = 'accepted';
        else if (item.entityType === 'project') type = 'published';
        else if (item.entityType === 'review') type = 'approved';
        
        // You could also add more logic here to parse item.action 
        // to assign different icon types like 'rejected' or 'approved'
        if (item.action?.toLowerCase().includes('rechazó')) type = 'rejected';
        if (item.action?.toLowerCase().includes('aprobó')) type = 'approved';

        let timeStr = '';
        try {
          if (item.createdAt) {
            timeStr = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
            // Let's replace 'about ' with '' so it's more like '2 hours ago'
            timeStr = timeStr.replace('about ', '');
          }
        } catch (e) {
          timeStr = '';
        }

        return {
          id: item.id,
          type,
          text: item.action,
          time: timeStr,
        };
      });
      setActivities(formattedActivities);
    }
    setLoading(false);
  }, [getFechData]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading };
};
