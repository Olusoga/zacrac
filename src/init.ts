/* eslint-disable linebreak-style */

import { HealthcheckController } from 'src/controllers/healthcheck';

export async function init(): Promise<Record<string, any>>{

  // controllers
  const healthcheckController = new HealthcheckController();

  return {
    healthcheckController
  };

}
