import { writable } from "svelte/store";
import type { Key } from "./keys";

type MouseKeys = "left" | "middle" | "right";
type MouseButtons = `mouse_${MouseKeys}`;

export type KeyDownKeys = Key | MouseButtons;

export const keysDown = writable<Partial<Record<KeyDownKeys, boolean>>>({});
