import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

interface StoreShellProps {
  children: React.ReactNode;
}

export const StoreShell = ({ children }: StoreShellProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
