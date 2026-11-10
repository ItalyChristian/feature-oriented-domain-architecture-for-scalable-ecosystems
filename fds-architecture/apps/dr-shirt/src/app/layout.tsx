import '@radix-ui/themes/styles.css';
import AppProviders from './_providers';
import './global.css';

export const metadata = {
  title: 'Welcome to dr-shirt',
  description:
    'Web shop for Dr. Shirt, a fictional company that sells customized t-shirts with funny, rock and nerdy designs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
