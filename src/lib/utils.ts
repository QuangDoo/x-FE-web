import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function http<TData = any>({
  baseUrl,
  path,
  init,
}: {
  baseUrl: string;
  path: string;
  init: RequestInit;
}) {
  try {
    const result = await fetch(`${baseUrl}/${path}`, { ...init });

    return result;
  } catch (error) {
    console.log("error :>> ", error);
  }
}
