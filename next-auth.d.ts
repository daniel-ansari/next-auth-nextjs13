import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {}
  interface Session {}
  interface User {}
  interface Account {}
  interface Profile {}
}
