// run this in a node command prompt to output the schema definition for a particular API

/* tslint:disable:no-console */
const Joi = require("joi");

const isochronesSchema = require("./node_modules/openrouteservice-js/schemas/OrsIsochronesSchema");
console.log(JSON.stringify(Joi.describe(isochronesSchema), null, 2));
