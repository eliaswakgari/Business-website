import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-info text-primary-foreground shadow-md">
        P
      </div>
      <span className="bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
        ProCMS
      </span>
    </Link>
  );
}
