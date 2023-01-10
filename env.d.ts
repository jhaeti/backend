declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            MONGO_URI: string;
            MONGO_TEST_URI: string;
            JWT_SECRET_KEY: string;
            DEFAULT_ADMIN_NAME: string;
            DEFAULT_ADMIN_PASSWORD: string;
            DEFAULT_ADMIN_EMAIL: string;
            AUTH_COOKIE_NAME: string;
        }
    }
}
export {};
