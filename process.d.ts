declare namespace NodeJS {
  export interface ProcessEnv {
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;
    APPLE_ID: string;
    APPLE_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_DEBUG: string;
  }
}
