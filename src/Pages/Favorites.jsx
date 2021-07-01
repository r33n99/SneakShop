import React from "react";
import Item from '../Components/Card'
import Context from "../Context";

const Favorites = ({getCartItems,favoriteItem}) => {

  const {addFavorite} = React.useContext(Context)


    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Избранные кроссовки</h1>
          <div className="search-block d-flex">
          </div>
        </div>
          <div className="collection d-flex flex-wrap">
          {favoriteItem.map((el, index) => {
              return (
                <Item
                  favorited
                  key={index}
                  {...el}
                  addFavorite={(obj) => addFavorite(obj)}
                />
              );
            })}

          </div>
      </div>
    )
}

export default Favorites;