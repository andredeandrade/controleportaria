"use strict";
/**
 * Centraliza todas as rotas da API.
 * Cada módulo futuro (auth, moradores, visitantes, etc.)
 * terá seu router registrado aqui.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const health_route_js_1 = require("./health.route.js");
const index_js_1 = require("../modules/auth/index.js");
exports.router = (0, express_1.Router)();
exports.router.use('/health', health_route_js_1.healthRouter);
exports.router.use('/auth', index_js_1.authRouter);
// Futuros módulos serão registrados aqui:
// router.use('/auth', authRouter);
// router.use('/moradores', moradoresRouter);
// router.use('/visitantes', visitantesRouter);
