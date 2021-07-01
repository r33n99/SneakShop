import React from 'react';
import {Link} from 'react-router-dom'
import Context from '../Context';
const Header = ({openCart}) => {


  const {setCartIsOpen} = React.useContext(Context)

  // const [isOpen,setIsOpen] = React.useState(false)


  // function CartStyle() {
  //   openCart()
  //   setIsOpen({
  //     overflow: "hidden",
  //     height: "100%"
  //   })
  // }
  
    return (
        <header className="d-flex justify-between align-center p-40 clear">
          <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        </Link>
        <ul className="d-flex align-center">
          <li style={{cursor:"pointer"}} className="d-flex mr-10" onClick={() => setCartIsOpen(true)}>
            <img width={18} height={18} src="/img/Group.svg" alt="cart" />
            <span>1205 руб.</span>
          </li>
          <li>
            <Link to="/favorite">
            <img style={{cursor: "pointer"}} src="/img/Vector.svg" alt="like" />
            </Link>
          </li>
          <li className="mr-30">
            <Link to="/profile">
            <img width={18} height={18} src="/img/Union.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;