function HeroInModal({heroInModal, setHeroInModal}) {
    return (
       <>
            {heroInModal.nickname === undefined ? <></> 
            : <>
                    <div className='hero-modal' key={heroInModal.nickname}>      
                    <div><div className="hero-width"><span>Nickname:</span></div> <div>{heroInModal.nickname}</div></div>
                    <div><div className="hero-width"><span>Real name:</span></div> <div>{heroInModal.real_name}</div></div>
                    <div><div className="hero-width"><span>Origin description:</span></div> <div>{heroInModal.origin_description}</div></div>
                    <div><div className="hero-width"><span>Superpowers:</span></div> <div>{heroInModal.superpowers}</div></div>
                    <div><div className="hero-width"><span>Catch phrase:</span></div> <div>{heroInModal.catch_phrase}</div></div>
                    <div className="hero-modal-img">
                       <div>
                        {heroInModal.img.map(item => 
                            <img key={item} src={`/images/${item}`} alt={item}/>
                        )}
                       </div>
                    </div>
                    <div onClick={() => setHeroInModal({})} className='close'>CLOSE</div>
                </div>
            </>
            } 
       </>
    );
  }
export default HeroInModal;
  