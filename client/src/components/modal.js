function Modal({openCloseModal, handleChange, onImageChange, hero, onAdd, onEdit, deleteImg, modalBtn}) {
    
    return (
    <div className="modal">
        <div>
            {modalBtn === 'ADD' 
            ?   <>
                    <div><input value={hero.nickname} onChange={handleChange} name="nickname" placeholder="Hero nickname"/></div>
                    <div><input value={hero.real_name} onChange={handleChange} name="real_name" placeholder="Hero real name"/></div>
                    <div><textarea value={hero.origin_description} onChange={handleChange} name="origin_description" placeholder="Hero origin description"/></div>
                    <div><textarea value={hero.superpowers} onChange={handleChange} name="superpowers" placeholder="Hero superpowers"/></div>
                    <div><textarea value={hero.catch_phrase} onChange={handleChange} name="catch_phrase" placeholder="Hero catch phrase"/></div>
                    <div><input name="photo" type="file" onChange={onImageChange}/></div>
                    <div>
                        <button className="add-btn" onClick={() => onAdd()}>{modalBtn}</button>
                        <button className="cancle-btn" onClick={() => openCloseModal()}>CANCEL</button>
                    </div>
                </>
            :   <>
                    <div>{hero.nickname}</div>
                    <div><input value={hero.real_name} onChange={handleChange} name="real_name" placeholder="Hero real name"/></div>
                    <div><textarea value={hero.origin_description} onChange={handleChange} name="origin_description" placeholder="Hero origin description"/></div>
                    <div><textarea value={hero.superpowers} onChange={handleChange} name="superpowers" placeholder="Hero superpowers"/></div>
                    <div><textarea value={hero.catch_phrase} onChange={handleChange} name="catch_phrase" placeholder="Hero catch phrase"/></div>
                    <div className="flex" key={hero.name}>
                        {hero.img.map(item => 
                            <div style={{"marginRight":"10px"}}key={item}>
                                <img style={{"width":100, "height":100}}src={`/images/${item}`} alt={item}/>
                                <div><i onClick={() => deleteImg(item)} className="fa fa-trash-o"></i></div>
                            </div>
                        )}
                    </div>
                    <div><input name="photo" type="file" onChange={onImageChange}/></div>
                    <div>
                        <button className="add-btn" onClick={() => onEdit()}>{modalBtn}</button>
                        <button className="cancle-btn" onClick={() => openCloseModal()}>CANCEL</button>
                    </div>
                </>
            }
        </div>
    </div>
    );
  }
export default Modal;
  