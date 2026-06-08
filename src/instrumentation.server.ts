// src/instrumentation.server.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { LangfuseSpanProcessor } from '@langfuse/otel';
import { LANGFUSE_SECRET_KEY, LANGFUSE_PUBLIC_KEY, LANGFUSE_BASE_URL } from '$env/static/private';

export const langfuseSpanProcessor = new LangfuseSpanProcessor({
  secretKey: LANGFUSE_SECRET_KEY,
  publicKey: LANGFUSE_PUBLIC_KEY,
  baseUrl: LANGFUSE_BASE_URL
});

const opentelemetrySdk = new NodeSDK({
  spanProcessors: [langfuseSpanProcessor]
});

opentelemetrySdk.start();
