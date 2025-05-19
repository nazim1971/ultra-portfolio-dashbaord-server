import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';


const router = Router();

// Define all module-specific routes
const moduleRoutes = [
  { path: '/user', route: UserRoute },
   { path: '/auth', route: AuthRoute },
];

// Register each module's routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
