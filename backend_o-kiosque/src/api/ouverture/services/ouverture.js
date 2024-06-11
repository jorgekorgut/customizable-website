'use strict';

/**
 * ouverture service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ouverture.ouverture');
