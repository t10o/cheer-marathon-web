export const getStorageUsername = () => {
  if (typeof window === "undefined") return "";

  return localStorage.getItem("cor/username");
};

export const setStorageUsername = (value: string) => {
  if (typeof window === "undefined") return "";

  localStorage.setItem("cor/username", value);
};
