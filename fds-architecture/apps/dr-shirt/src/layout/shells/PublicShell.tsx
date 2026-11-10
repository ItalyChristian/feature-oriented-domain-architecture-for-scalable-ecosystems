import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

interface PublicShellProps {
  children: React.ReactNode;
}

export const PublicShell = ({ children }: PublicShellProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
