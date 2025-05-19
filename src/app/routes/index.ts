import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BlogRoute } from '../modules/blog/blog.route';
import { SkillRoute } from '../modules/skill/skill.route';
import { ProjectRoute } from '../modules/project/project.route';


const router = Router();

// Define all module-specific routes
const moduleRoutes = [
  { path: '/user', route: UserRoute },
   { path: '/auth', route: AuthRoute },
   { path: '/blog', route: BlogRoute },
   { path: '/skill', route: SkillRoute },
   { path: '/project', route: ProjectRoute },

];

// Register each module's routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
