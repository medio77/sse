/** Join class names, dropping falsy values. Mirrors the shadcn/ui helper. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
