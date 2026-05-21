import Link from 'next/link';

type BrandLogoProps = {
  href?: string;
  className?: string;
};

export default function BrandLogo({
  href = '/',
  className = 'h-8 w-auto',
}: BrandLogoProps) {
  return (
    <Link href={href} className="flex shrink-0 items-center gap-2">
      <img src="/images/logo.svg" alt="DiagnoxixAI" className={className} />
    </Link>
  );
}
