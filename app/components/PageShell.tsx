import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout for secondary pages (About, Contact, Privacy).
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
