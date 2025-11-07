import Cookies from "js-cookie";

export interface Token {
  token: string;
  expired_at: number;
}

export const initialToken: Token = {
  token: "",
  expired_at: 0,
};

export const cookieOptions: Cookies.CookieAttributes = {
  expires: 1,
  secure: true,
  sameSite: "strict",
};

export enum TOKEN_TYPE {
  REFRESH_TOKEN = "refresh_token",
  ACCESS_TOKEN = "access_token",
}

export const parseJwt = (jwt: string): Token | null => {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = atob(parts[1]);
    const parsedPayload = JSON.parse(payload);

    const expired_at = parsedPayload.exp
      ? parsedPayload.exp * 1000
      : Date.now();

    return {
      token: jwt,
      expired_at: expired_at,
    };
  } catch (error) {
    console.error("Lỗi khi parse JWT:", error);
    return null;
  }
};

export const setTokenToCookies = (type: TOKEN_TYPE, token: string): void => {
  Cookies.set(type, token, cookieOptions);
};

export const getTokenFromCookies = (type: TOKEN_TYPE): string => {
  const tokenStr = Cookies.get(type);
  if (tokenStr) {
    return tokenStr;
  }
  return "";
};

export const removeTokenFromCookies = (type: TOKEN_TYPE): void => {
  Cookies.remove(type);
};
