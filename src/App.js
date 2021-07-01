import React from "react";
import Header from "./Components/Header";
import Overlay from "./Components/Overlay";
import axios from "axios";
import Home from './Pages/Home'
import {Route} from "react-router-dom";
import Favorites from './Pages/Favorites'
import Context from './Context'

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItem, setfavoriteItem] = React.useState([]);
  const [searchValue, setsearchValue] = React.useState("");
  const [cartIsOpen, setCartIsOpen] = React.useState(false);
  // const [favorited,isFavorited] = React.useState(true)
  const [isLoading,setIsLoading] = React.useState(true)


  React.useEffect(() => {
   async function fetchDate() {
    const dataItems = await axios.get("https://60d469ee61160900173cb231.mockapi.io/items");
    const dataCartItems = await axios.get("https://60d469ee61160900173cb231.mockapi.io/cart");
    const dataFavorites = await axios.get("https://60d469ee61160900173cb231.mockapi.io/favorites");

      setIsLoading(false)

      setCartItems(dataCartItems.data);
      setfavoriteItem(dataFavorites.data);
      setItems(dataItems.data);
    }
    fetchDate();
  },[]);

  function addOnCart(obj) {
    if(cartItems.find(item => Number(item.id) === Number(obj.id))) {
    axios.delete(`https://60d469ee61160900173cb231.mockapi.io/cart/${obj.id}`);
    setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post("https://60d469ee61160900173cb231.mockapi.io/cart",obj);
      setCartItems(prev => [...prev, obj])
    }
  }
  
  function removeItemOnCart(id) {
    axios.delete(`https://60d469ee61160900173cb231.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
  }
  
  async function addFavorite(obj) {
    try {
      if(favoriteItem.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://60d469ee61160900173cb231.mockapi.io/favorites/${obj.id}`);
        setfavoriteItem(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        } else {  
         const {data} = await axios.post("https://60d469ee61160900173cb231.mockapi.io/favorites",obj);
        setfavoriteItem(prev => [...prev, data])
        }
    } catch (error) {
      alert("Не удалось добавить в фавориты")
    }
  }

  function OnChangeSearchItem(e) {
    setsearchValue(e.target.value);
  }

  function hasItemAdded(id) {
   return cartItems.some(obj => Number(obj.id) === Number(id)) 
  }

  function closeCart() {
    setCartIsOpen(false)
  }

  // function hasItemFavorited(id) {
  //  return favoriteItem.some(obj => Number(obj.id) === Number(id)) 
  // }

  return (
    <Context.Provider value={{items,cartItems,favoriteItem,addFavorite,hasItemAdded,setCartIsOpen,setCartItems}}>
    <div className="wrapper clear">
      {cartIsOpen ? (
        <Overlay removeItemOnCart={removeItemOnCart} cartItems={cartItems} />
      ) : null}
      <Header />

      <Route path="/favorite" >
            <Favorites addOnCart={addOnCart} favoriteItem={favoriteItem} />
          </Route>
          <Route exact path="/" >
          <Home isLoading={isLoading} addFavorite={addFavorite} addOnCart={addOnCart} items={items} searchValue={searchValue} favoriteItem={favoriteItem} OnChangeSearchItem={OnChangeSearchItem} setsearchValue={setsearchValue} />
      </Route>
    </div>
    </Context.Provider>
  );
}

export default App;
