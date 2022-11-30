/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL_API: string;
    readonly VITE_WHATSAPP_URL_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
