declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_SCRIPT_URL: string;
    }
  }
}

export {};