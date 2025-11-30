// src/common/metrics.ts
import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter(process.env.SERVICE_NAME || 'nestjs-app-meter');

export const taskCreateCounter = meter.createCounter('task_create_total', {
  description: 'Total number of tasks created',
});

export const requestDurationHistogram = meter.createHistogram('request_duration_ms', {
  description: 'Request duration in ms',
});
