import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.estudai.app',
  appName: 'EstudAI',
  webDir: 'out',
  server: {
    // This allows the app to load from the development server or a hosted Next.js production server.
    // For local Wi-Fi testing, this points to your computer's local network IP.
    url: 'https://quero-elaborar-um-aplicativo-de-est.vercel.app',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
