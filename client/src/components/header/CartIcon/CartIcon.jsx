import React, { useState } from 'react';
import Cart from '@material-ui/icons/ShoppingCart';
import styles from './CartIcon.module.scss';
import { useSelector } from 'react-redux';
import CartPopup from '../../cart/CartPopup/CartPopup';

function CartIcon() {
  const parts = useSelector((state) => state.cart.items);
  const amount = parts.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.iconContainer}>
      <Cart
        id="cartIcon"
        onClick={() => setIsVisible(true)}
        className={styles.icon}
        fontSize="large"
      />
      <div className={styles.cartLabel}>
        <div id="itemsAmount" className={styles.itemsAmount}>
          {amount}
        </div>
      </div>
      <CartPopup showPopup={isVisible} setShowPopup={setIsVisible} />
    </div>
  );
}

export default CartIcon;
