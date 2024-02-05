import Cookie from "js-cookie";
export function setClientGHPATCookie(
  name: "gh_token" | "return_to" | "theme" | (string & {}),
  value: string,
) {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.cookie = `${name}=${value}; max-age=31536000; path=/;`;
    // Cookie.set(name, value, {
    //   path: "/",
    //   secure: import.meta.env.PROD,
    //   httpOnly: false,
    //   maxAge: 60 * 10,
    //   sameSite: "lax",
    // });
  }
}
export function deleteClientGHPATCookie(
  name: "gh_token" | "return_to" | "theme" | (string & {}),
) {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    Cookie.remove(name, {
      path: "/",
    });
  }
}
