import Head from 'next/head';
import NavBar from '../components/navbar';

const Main = ({ children }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>The Bartender's Guide</title>
      <link href="https://fonts.googleapis.com/css?family=Playball" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
    </Head>
    <div className="page-wrapper">
      <NavBar />
      { children }
    </div>
    <style jsx>{`
      .page-wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `}</style>
  </>
);

export default Main;
