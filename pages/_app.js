import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from "react-query";

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

  if(Component.getLayout) {
    return Component.getLayout(<QueryClientProvider client={queryClient}><Component {...pageProps} /></QueryClientProvider>)
  }
  
  return  <QueryClientProvider client={queryClient}><Component {...pageProps} /></QueryClientProvider>
}
