// src/otel.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter as OTLPTraceExporterHttp } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter as OTLPMetricExporterHttp } from '@opentelemetry/exporter-metrics-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const TRACE_URL = process.env.OTEL_TRACES_URL || 'http://localhost:4318/v1/traces';
const METRICS_URL = process.env.OTEL_METRICS_URL || 'http://localhost:4318/v1/metrics';

const traceExporter = new OTLPTraceExporterHttp({ url: TRACE_URL });
const metricExporter = new OTLPMetricExporterHttp({ url: METRICS_URL });

const sdk = new NodeSDK({
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 10000, // 10s
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()

process.on('SIGTERM', async () => {
  await sdk.shutdown();
  process.exit(0);
});
