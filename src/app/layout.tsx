import './globals.css';
import './output.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
        <head>
            <meta charSet="utf-8" />
            <title>Vat tu</title>
            <base href="/" />

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href="https://onemount.com/OneMount/img/Favicon.png" />
        </head>
        <body className={inter.className}>
            {children}
        </body>
        </html>
    );
}
