import './globals.css';
import Header from './Header';

export const metadata = {
  title: { default: 'Blog | Bruno Queirós', template: '%s | Bruno Queirós' },
  description: 'Um espaço com os meus pensamentos sobre qualquer coisa e design também.',
  metadataBase: new URL('https://portifolio-with-ia.vercel.app'),
  openGraph: {
    siteName: 'Bruno Queirós',
    type: 'website',
  },
};

const themeScript = `
(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){document.documentElement.setAttribute('data-theme','light');}})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
