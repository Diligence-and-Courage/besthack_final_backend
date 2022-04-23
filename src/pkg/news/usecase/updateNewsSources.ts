import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { AppResponse, availableDomains, UpdateDomainsEnabledRequest } from '../../../models';
import { updateDomainsEnabled } from '../repository';

export const updateNewsSourcesValidator = () => [
  body('domain')
    .exists()
    .withMessage('Not exists')
    .isString()
    .withMessage('Not string')
    .custom((value) => {
      if (!availableDomains.includes(value)) {
        throw new Error(`Valid domains are ${availableDomains.join(', ')}`);
      }

      return true;
    }),
  body('enabled').exists().withMessage('Not exists').isBoolean().withMessage('not boolean'),
];

export const updateNewsSources = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  await updateDomainsEnabled(req.body as UpdateDomainsEnabledRequest);

  return resp.sendStatus(200);
};
