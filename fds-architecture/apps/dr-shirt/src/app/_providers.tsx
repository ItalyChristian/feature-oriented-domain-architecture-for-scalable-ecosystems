import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
