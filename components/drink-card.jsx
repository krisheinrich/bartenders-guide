import Link from 'next/link';

const DrinkCard = (props) => (
  <div className="card" style={{ flex: '0 0 200px' }}>
    <img src={props.thumbUrl} className="card-img-top" alt={props.name}/>
    <div className="card-body">
      <h5 className="card-title">{ props.name }</h5>
      <p className="card-text">{ props.preview }</p>
      <Link href={`/drink?id=${props.id}`} className="btn btn-primary">Recipe</Link>
    </div>
  </div>
);

export default DrinkCard;
