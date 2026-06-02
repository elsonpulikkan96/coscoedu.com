import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import FloatingActions from "./components/common/FloatingActions";
import SmoothScroll from "./components/common/SmoothScroll";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollProgress from "./components/common/ScrollProgress";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
