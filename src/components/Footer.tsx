import { site } from '../content';

export function Footer() {
  return (
    <div className="wrap">
      <footer>
        <span>{site.footerName}</span>
        <span>{site.footer}</span>
      </footer>
    </div>
  );
}
