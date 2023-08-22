
export function $<T extends HTMLElement = HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

export function $$(selector: string): NodeListOf<Element> {
    return document.querySelectorAll(selector)!;
}

export namespace Cookies {
    export function createOrRewrite(name: string, value: string, options?: CookieOptions): void {
        document.cookie = `${name}=${encodeURIComponent(value)}${serializeOptions(options)}`;
    }

    export function remove(name: string): void {
        createOrRewrite(name, "", { expires: new Date(0) });
    }

    export function get(name: string): string | null {
        const cookies: string[] = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [cookieName, cookieValue]: string[] = cookie.split("=");
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    function serializeOptions(options?: CookieOptions): string {
        if (!options) return "";
        const { expires, path, domain, secure, sameSite }: CookieOptions = options;
        const parts: string[] = [];

        if (expires) {
            if (typeof expires === "number") {
                const date: Date = new Date();
                date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
                parts.push(`expires=${date.toUTCString()}`);
            } else {
                parts.push(`expires=${expires.toUTCString()}`);
            }
        }

        if (path) parts.push(`path=${path}`);
        if (domain) parts.push(`domain=${domain}`);
        if (secure) parts.push("secure");
        if (sameSite) parts.push(`samesite=${sameSite}`);

        return `; ${parts.join("; ")}`;
    }

    export interface CookieOptions {
        expires?: Date | number;
        path?: string;
        domain?: string;
        secure?: boolean;
        sameSite?: "Strict" | "Lax" | "None";
    }
}