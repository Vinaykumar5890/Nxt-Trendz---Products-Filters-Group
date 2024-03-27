import {BsPlusSquare} from 'react-icons/bs'
import {BsDashSquare} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import SimilarProductItem from '../SimilarProductItem'
class ProductItemDetails extends Component {
  state = {productsList: {}, simillar: [], count: 1, ok: ''}
  componentDidMount() {
    this.getProducts()
  }
  getformatted = data => ({
    imageUrl: data.image_url,
    id: data.id,
    title: data.title,
    brand: data.brand,
    rating: data.rating,
    availability: data.availability,
    totalReviews: data.total_reviews,
    description: data.description,
    price: data.price,
  })
  getProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const jwttoken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwttoken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updated = this.getformatted(data)
      const updatedSimillar = data.similar_products.map(iM =>
        this.getformatted(iM),
      )
      this.setState({
        productsList: updated,
        simillar: updatedSimillar,
        ok: true,
      })
    } else if (response.status === 404) {
      this.setState({ok: false})
    }
  }
  minus = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }
  plus = () => {
    const {count} = this.state
    this.setState(prevState => ({count: prevState.count + 1}))
  }
  trued = () => {
    const {productsList, simillar, count} = this.state
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
    } = productsList
    return (
      <div>
        <Header />
        <div className="bg-container">
          <div className="container">
            <div>
              {' '}
              <img src={imageUrl} className="containerImg" alt="product" />
            </div>

            <div>
              {' '}
              <h1 className="title">{title}</h1>
              <p className="price">Rs {price}/-</p>
              <div className="sjkvbek">
                <button className="top-button">
                  <p className="top-heading" value={rating}>
                    {rating}
                  </p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="starImg"
                  />
                </button>
                <p className="totalReviews" value={totalReviews}>
                  {totalReviews} Reviews
                </p>
              </div>
              <p className="description">{description}</p>
              <p className="availability">
                <span className="span">Available: </span>
                {availability}
              </p>
              <p className="availability">
                <span className="span">Brand: </span>
                {brand}
              </p>
              <hr />
              <div className="sjkvbek">
                <button testid="minus">
                  <BsDashSquare onClick={this.minus} />
                </button>
                <p className="count">{count}</p>
                <button testid="plus">
                  <BsPlusSquare onClick={this.plus} />
                </button>
              </div>
              <button className="bottom-button">ADD TO CART</button>
            </div>
          </div>

          <h1 className="title-bottom">Similar Products</h1>
          <ul className="uunorderList">
            {simillar.map(eachItem => (
              <SimilarProductItem simillarItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  falsed = () => {
    return (
      <div>
        <h1>Product Not Found</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="error view"
        />
        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>
      </div>
    )
  }

  render() {
    const {ok} = this.state
    return ok ? this.trued() : this.falsed()
  }
}
export default ProductItemDetails
