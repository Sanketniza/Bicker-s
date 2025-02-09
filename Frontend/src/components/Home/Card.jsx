
function Card({ heading }) {
  return (
    <div className="cards-card card">
      <div className="s_card">
        <div className="tools">
          <div className="circle"><span className="red box"></span></div>
          <div className="circle"><span className="yellow box"></span></div>
          <div className="circle"><span className="green box"></span></div>
        </div>
        <div className="card__content">
          <h1>{heading}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;
