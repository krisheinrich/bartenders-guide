import Link from 'next/link';

const DrinkCard = (props) => (
  <div className="card mb-4" style={{ flex: '0 0 200px' }}>
    <img className="card-img-top" src={props.thumbUrl} alt={props.name}/>
    <div className="card-body">
      <h5 className="card-title text-center">{ props.name }</h5>
    </div>
    <div className="card-footer d-flex justify-content-center">
      <Link href={`/drink?id=${props.id}`}>
        <a className="btn btn-primary">View Recipe</a>
      </Link>
    </div>
  </div>
);

export default DrinkCard;
