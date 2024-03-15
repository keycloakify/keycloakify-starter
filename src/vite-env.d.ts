/// <reference types="vite/client" />

declare module "*.md" {
  const src: string;
  export default src;
}
