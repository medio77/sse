import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">غزل یافت نشد</h1>
      <p className="mt-4 text-sm leading-8 text-ink-muted">
        مدخلی با این نشانی در گنجورده ثبت نشده است.
      </p>
      <Link
        href="/poems"
        className="mt-8 inline-block text-sm text-accent transition-colors hover:opacity-75"
      >
        بازگشت به گنجورده
      </Link>
    </div>
  );
}
