import MainLayout from '../layouts/main';
import SearchBar from '../components/searchbar';


const Home = () => (
  <MainLayout>
    <div className="hero">
      <div className="hero-title">
        <h1>The Bartender's Guide</h1>
      </div>
      <div className="container">
        <SearchBar className="col-lg-8 offset-lg-2 mt-5" placeholder="Discover new cocktails by name or ingredient"/>
      </div>
    </div>
    <style jsx>{`
      .hero {
        height: 100%;
        background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                    url('/cocktail-with-mint.jpg') no-repeat center center scroll;
        background-size: cover;
      }
      .hero-title {
        margin-top: 10vh;
        margin-bottom: 100px;
      }
      h1 {
        font-family: 'Playball', cursive;
        font-size: 92px;
        text-align: center;
        color: #eee;
        text-shadow: 2px 2px 4px #000;
      }
    `}</style>
  </MainLayout>
);

export default Home;
