import styles from '../styles/sell.module.css'

import React, { useState } from 'react'

export default function Sell() {
  // ---------- handle product search ----------
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  function handleProductSearch(e) {
    setIsSearching(true)
    setSearchTerm(e.target.value)
  }

  // ---------- handle quantity ----------

  const [quantity, setQuantity] = useState(1)

  function handleQuantity(e) {
    setQuantity(e.target.value)
  }

  function handleIncrement() {
    setQuantity(quantity + 1)
  }

  function handleDecrement() {
    quantity > 1 && setQuantity(quantity - 1)
  }

  // ---------- handle payment method ----------

  const [method, setMethod] = useState('Cash')

  function handlePaymentMethod(e) {
    setMethod(e)
  }

  return (
    <section className={styles.sellLayout}>
      <div className={styles.leftCol}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleProductSearch(e)}
          />
          <i
            onClick={() => isSearching && setSearchTerm('')}
            className={isSearching && searchTerm.length > 0 ? 'fal fa-times' : 'fal fa-search'}
          ></i>
        </div>

        <div className={styles.products}>
          <div className={styles.product}>
            <h1>Paracetamol</h1>
            <p>&#8373; 0.00</p>
          </div>
          <div className={styles.product}>
            <h1>Asprain</h1>
            <p>&#8373; 0.00</p>
          </div>
          <div className={styles.product}>
            <h1>Andrews Liver Salt</h1>
            <p>&#8373; 0.00</p>
          </div>
        </div>
      </div>

      <div className={styles.rightCol}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.cartContent}>
          <div className={styles.cartItem}>
            <div className={styles.deleteButton}>
              <i className="fal fa-trash-can"></i>
            </div>
            <div>
              <h1>Paracetamol</h1>
              <p>&#8373; 0.00</p>
            </div>
            <div className={styles.quantity}>
              <i onClick={() => handleDecrement()} className="fal fa-chevron-left"></i>
              <input type="text" value={quantity} onChange={(e) => handleQuantity(e)} />
              <i onClick={() => handleIncrement()} className="fal fa-chevron-right"></i>
            </div>
          </div>
          <div className={styles.cartItem}>
            <div className={styles.deleteButton}>
              <i className="fal fa-trash-can"></i>
            </div>
            <div>
              <h1>Asprain</h1>
              <p>&#8373; 0.00</p>
            </div>
            <div className={styles.quantity}>
              <i onClick={() => handleDecrement()} className="fal fa-chevron-left"></i>
              <input type="text" value={quantity} onChange={(e) => handleQuantity(e)} />
              <i onClick={() => handleIncrement()} className="fal fa-chevron-right"></i>
            </div>
          </div>
          <div className={styles.cartItem}>
            <div className={styles.deleteButton}>
              <i className="fal fa-trash-can"></i>
            </div>
            <div>
              <h1>Andrews Liver Salt</h1>
              <p>&#8373; 0.00</p>
            </div>
            <div className={styles.quantity}>
              <i onClick={() => handleDecrement()} className="fal fa-chevron-left"></i>
              <input type="text" value={quantity} onChange={(e) => handleQuantity(e)} />
              <i onClick={() => handleIncrement()} className="fal fa-chevron-right"></i>
            </div>
          </div>
        </div>

        <div className={styles.paymentInfo}>
          <h1>Order Summary</h1>

          <div className={styles.total}>
            <p>Total</p>
            <span>&#8373; 0.00</span>
          </div>

          <div className={styles.paymentMethod}>
            <div className={styles.method} onClick={() => handlePaymentMethod('Cash')}>
              <input type="checkbox" checked={method === 'Cash'} />
              <p>Cash</p>
            </div>
            <div className={styles.method} onClick={() => handlePaymentMethod('Momo')}>
              <input type="checkbox" checked={method === 'Momo'} />
              <p>Momo</p>
            </div>
          </div>

          <button className={styles.sellButton}>Sell</button>
        </div>
      </div>
    </section>
  )
}
