import { Canvas } from 'canvas-api-wrapper';

export const canvas = new Canvas({
  token: process.env.CANVAS_API_TOKEN,
  baseUrl: process.env.CANVAS_API_URL
});