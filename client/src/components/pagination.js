const Pagination = ({ perPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts/ perPage); i++ ) {
    pageNumbers.push(i.toString())
  }
  return (
    <>
      <div className="pagination">
      {pageNumbers.map(number =>
        <div className={`pagination-btn ${currentPage == number ? ' active' : ''}`} onClick={() => paginate(number)} key={number}>
          <div> {number} </div>
        </div>)}
      </div>
    </>
  )
}

export default Pagination