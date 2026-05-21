import Link from 'next/link';

interface ManagerSectionPlaceholderProps {
  title: string;
  description: string;
}

export default function ManagerSectionPlaceholder({
  title,
  description,
}: ManagerSectionPlaceholderProps) {
  return (
    <div className="rounded-2xl border border-[#e4e7ec] bg-white p-10 text-center">
      <h1 className="text-2xl font-bold text-[#1d2939]">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-[#667085]">{description}</p>
      <Link
        href="/centre-dashboard"
        className="mt-6 inline-flex rounded-2xl bg-[#1f6ae1] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1859c4]"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
