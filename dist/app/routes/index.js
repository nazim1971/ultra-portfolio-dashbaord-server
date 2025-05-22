"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const skill_route_1 = require("../modules/skill/skill.route");
const project_route_1 = require("../modules/project/project.route");
const message_route_1 = require("../modules/message/message.route");
const router = (0, express_1.Router)();
// Define all module-specific routes
const moduleRoutes = [
    { path: '/user', route: user_route_1.UserRoute },
    { path: '/auth', route: auth_route_1.AuthRoute },
    { path: '/blog', route: blog_route_1.BlogRoute },
    { path: '/skill', route: skill_route_1.SkillRoute },
    { path: '/project', route: project_route_1.ProjectRoute },
    { path: '/message', route: message_route_1.MessageRoute },
];
// Register each module's routes
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
