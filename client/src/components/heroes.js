function Heroes({heroes, choosedHero, deleteHero, editHero}) {
    return (
      <div className="hero-wrapper">
        {heroes.map(item => 
            <div key={item.nickname}>
              <div onClick={() => choosedHero(item.nickname)}  className='hero'>
                <div className="imgBlock">
                  <img src={`/images/${item.img[0]}`} alt={item.nickname}/>
                </div>
                <div className="nickname">
                    {item.nickname}
                </div>
              </div>
              <div> 
                <i onClick={() => editHero(item.nickname)} className="fa fa-pencil"></i>
                <i onClick={() => deleteHero(item.nickname)} className="fa fa-trash-o"></i>
              </div>
            </div>
        )}
      </div> 
    );
  }
export default Heroes;
  