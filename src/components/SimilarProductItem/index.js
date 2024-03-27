import './index.css'
const SimilarProductItem = props => {
  const {simillarItem} = props
  const {
    imageUrl,
    id,
    title,
    brand,
    rating,
    availability,
    totalReviews,
    description,
    price,
  } = simillarItem
  return (
    <div className="simillar-container">
      <img src={imageUrl} className="simillar-img"alt="similar product"  />
      <h1 className="simillar-title">{title}</h1>
      <h1 className="simillar-brand">by {brand}</h1>
      <div className="simillar-bottom-container">
        <h1 className="simillar-price">Rs {price}/-</h1>
        <button className="simillar-button">
          <h1 className="simillar-rating">{rating}</h1>{' '}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="simillar-star"
          />
        </button>
      </div>
    </div>
  )
}
export default SimilarProductItem
