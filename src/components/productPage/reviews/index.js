import { Rating } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import AddReview from './AddReview'
import styles from './styles.module.scss'
import Table from './Table'

export default function Reviews({ product }) {
  const { data: session } = useSession()
  const [rating, setRating] = useState('')
  const [reviews, setReviews] = useState(product.reviews)
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h1>Avaliações:</h1>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Classificação Média:</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name='half-rating'
                defaultValue={3.5}
                precision={0.5}
                readOnly
              />
              {product.rating == 0 ? 'Sem avaliações.' : product.rating}
            </div>
            <span style={{ fontSize: '12px' }}>
              {product.reviews.length} avaliações para esse produto.
            </span>
          </div>
          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div className={styles.reviews__stats_reviews_review}>
                <Rating
                  name='half-rating-read'
                  defaultValue={5 - i}
                  precision={0.5}
                  readOnly
                  style={{ color: '#FACF19' }}
                />
                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating.percentage}%` }}
                  ></div>
                </div>
                <span>{rating.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {session ? (
        <AddReview product={product} setReviews={setReviews} />
      ) : (
        <button className={styles.btn__primary} onClick={() => signIn()}>
          Avaliar produto
        </button>
      )}
      <Table reviews={reviews} />
    </div>
  )
}
