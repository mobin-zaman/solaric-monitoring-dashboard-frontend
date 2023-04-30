import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <QueryClientProvider client={queryClient}>
        <div className={`${inter.className}`}>
          <Component {...pageProps} />{" "}
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${inter.className}`}>
        <Component {...pageProps} />{" "}
      </div>
    </QueryClientProvider>
  );
}
