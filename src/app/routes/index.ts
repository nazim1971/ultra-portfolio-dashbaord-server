import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';


const router = Router();

// Define all module-specific routes
const moduleRoutes = [
  { path: '/user', route: UserRoute },

];

// Register each module's routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
