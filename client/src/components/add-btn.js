function AddBtn({openCloseModal}) {
    return (
      <div onClick={() => openCloseModal()} className='add'>
        Add
      </div>  
    );
  }
export default AddBtn;
  