
export function $<T extends HTMLElement = HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}