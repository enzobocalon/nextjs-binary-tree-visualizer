import type { AppProps } from 'next/app';
import '../styles/_app.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
