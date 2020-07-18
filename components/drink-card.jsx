import Link from 'next/link';
import LazyImage from './lazy-image';

const DrinkCard = (props) => (
  <div className="card mb-4">
    <LazyImage src={props.thumbUrl} alt={props.name} />
    <div className="card-body">
      <h5 className="card-title text-center">{ props.name }</h5>
    </div>
    <div className="card-footer d-flex justify-content-center">
      <Link href={`/drink?id=${props.id}`}>
        <a className="btn btn-primary">View Recipe</a>
      </Link>
    </div>
    <style jsx>{`
      .card {
        flex: 0 0 auto;
      }
      @media screen and (min-width: 576px) {
        .card {
          flex: 0 0 200px;
        }
      }
    `}</style>
  </div>
);

export default DrinkCard;
