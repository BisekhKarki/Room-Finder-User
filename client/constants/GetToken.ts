export const GetToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("Token") || "";
  }
  return "";
};
