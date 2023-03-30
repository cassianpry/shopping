import { Rating } from '@mui/material'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss'
export default function Review({ review }) {
  const { name } = review.reviewBy
  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>{name}</h4>
        </div>
        <div className={styles.review}>
          <Rating
            name='half-rating-read'
            defaultValue={review.rating}
            readOnlystyle={{ color: '#facf19' }}
          />
          <p>{review.review}</p>
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {review.likes && review.likes?.likes}
            <AiOutlineLike />
          </div>
          <div className={styles.review__extra_date}>
            {review.updatedAt?.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  )
}
