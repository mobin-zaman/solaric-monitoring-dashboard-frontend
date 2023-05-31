import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <QueryClientProvider client={queryClient}>
        <div className="font-poppins">
          <ToastContainer />
          <Component {...pageProps} />{" "}
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-poppins">
        <ToastContainer />
        <Component {...pageProps} />{" "}
      </div>
    </QueryClientProvider>
  );
}