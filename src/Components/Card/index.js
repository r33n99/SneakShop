import React from 'react';
import styles from './item.module.scss'
import ContentLoader from "react-content-loader"
import Context from '../../Context';


const Item = ({favorited,loading,id,name,price,img,getCartItems,addFavorite,added = false}) => {


  const {hasItemAdded} = React.useContext(Context)


  let [like,setLike] = React.useState(favorited)

    const addToCart = () => {
      getCartItems({id,name,price,img});
      hasItemAdded(id);
    }

    const checkLike = () => {
      addFavorite({id,name,price,img});
      setLike(!like);
    }

    return (
       <div className={styles.card}>
        {loading ? <ContentLoader 
          speed={2}
          width={220}
          height={266}
          viewBox="0 0 220 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="169" height="100" /> 
          <rect x="0" y="159" rx="0" ry="0" width="160" height="15" /> 
          <rect x="0" y="185" rx="0" ry="0" width="90" height="15" /> 
          <rect x="0" y="250" rx="0" ry="0" width="90" height="30" /> 
          <rect x="140" y="250" rx="0" ry="0" width="32" height="32" />
        </ContentLoader> :
        <>
        <div>
        <img onClick={checkLike} className={styles.btnCheckLike} src={like ? "/img/like.svg" : "/img/unlike.svg" } alt="like" /> 
        </div>
        <img
          draggable="false"
          className={styles.itemPhoto}
          width={113}
          height={113}
          src={img}
          alt="item"
        />
        <h5>{name}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <p>Цена:</p>
            <b>{price} руб</b>
          </div>
          <div className={styles.disabled}>
          <img onClick={addToCart}  src={hasItemAdded(id) ? "/img/itsLike.svg" : "/img/plusik.svg" } alt="plusik" />
          </div>
        </div>
        </>
       }
        </div>
    )
}

export default Item;