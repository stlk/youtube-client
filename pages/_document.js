import Document, { Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();

    return { html, head, errorHtml, chunks };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/static/css/bundle.css" />
        </Head>
        <body className="font-sans bg-grey-lighter flex flex-col min-h-screen">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
