import { publicRoutes } from './publicRoutes';
import { adminRoutes }  from './adminRoutes';

const router = [...publicRoutes, ...adminRoutes];

export default router;
