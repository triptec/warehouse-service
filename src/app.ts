import 'express-async-errors';

import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { ZodError } from 'zod';

import { RegisterRoutes } from './routes';

// Create Express app
const app: Application = express();

app.use(
  urlencoded({
    extended: true,
  })
);

// Parse JSON bodies
app.use(json());

// OpenAPI docs
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.use(express.static('public'));

RegisterRoutes(app);

const mapErrors = (errors: any) => {
  return errors.sort().reduce((acc, curr) => {
    if (curr.path) {
      acc[`requestBody.${curr.path.join('.')}`] = { message: curr.message };
    }
    return acc;
  }, {});
};

// Error Handler Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Handle tsoa validation errors
  if (err instanceof ValidateError) {
    return res.status(422).json({
      message: 'Validation Failed',
      details: err.fields,
    });
  }

  // Handle Zod Errors
  if (err instanceof ZodError) {
    return res.status(422).json({
      message: 'Validation Failed',
      details: mapErrors(err.errors),
    });
  }

  // Handle generic error
  console.trace(err);
  return res.status(500).json({
    message: 'Internal Server Error',
    details: null,
  });
});

export default app;
