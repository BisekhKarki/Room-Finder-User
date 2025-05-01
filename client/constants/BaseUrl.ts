export const base_url =
  (process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string) ||
  "http://localhost:4000/api";
export const tenant_base_url =
  (process.env.NEXT_PUBLIC_BACKEND_TENANT_URL as string) ||
  "http://localhost:4000/api/tenants";
