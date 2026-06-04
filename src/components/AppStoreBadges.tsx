import Link from 'next/link';

const PLAY_STORE_BADGE =
  'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
const APP_STORE_BADGE =
  'https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg';

type AppStoreBadgesProps = {
  /** Internal route for marketing/footer clicks */
  href?: string;
  /** When set, badges open the real store listings instead of an internal route */
  playStoreUrl?: string;
  appStoreUrl?: string;
  badgeClassName?: string;
  className?: string;
};

export default function AppStoreBadges({
  href = '/download-app',
  playStoreUrl,
  appStoreUrl,
  badgeClassName = 'h-10 w-32 object-contain',
  className = 'flex gap-4',
}: AppStoreBadgesProps) {
  const useExternal = Boolean(playStoreUrl && appStoreUrl);

  if (useExternal) {
    return (
      <div className={className}>
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-90"
        >
          <img
            src={PLAY_STORE_BADGE}
            alt="Get it on Google Play"
            className={badgeClassName}
          />
        </a>
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-90"
        >
          <img
            src={APP_STORE_BADGE}
            alt="Download on the App Store"
            className={badgeClassName}
          />
        </a>
      </div>
    );
  }

  return (
    <div className={className}>
      <Link href={href} className="transition-opacity hover:opacity-90">
        <img
          src={PLAY_STORE_BADGE}
          alt="Get it on Google Play"
          className={badgeClassName}
        />
      </Link>
      <Link href={href} className="transition-opacity hover:opacity-90">
        <img
          src={APP_STORE_BADGE}
          alt="Download on the App Store"
          className={badgeClassName}
        />
      </Link>
    </div>
  );
}
