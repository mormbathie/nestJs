import pino from 'pino';

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-opentelemetry-transport',
        options: {
          resourceAttributes: {
            'service.name': process.env.SERVICE_NAME || 'nestjs-app',
          },
        },
      },
      {
        target: 'pino-pretty', 
        level: 'info',
      },
    ],
  },
});

export default logger;
