import styles from '../styles/sell.module.css'

import React, { act, use, useEffect, useState } from 'react'

export default function Sell() {
  const api = window.electronAPI

  // ---------- load medicines ----------
  const [medicines, setMedicines] = useState([])

  async function loadMedicines() {
    const medicineData = await api.fetchMedicines()
    setMedicines(medicineData)
  }

  useEffect(() => {
    loadMedicines()
  }, [])

  // ---------- load session storage cart ----------
  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    if (cart) setSelectedMedicine(cart)
  }, [])

  // ---------- handle medicine selection ----------
  const [selectedMedicine, setSelectedMedicine] = useState([])

  function handleAddMedicineToCart(id) {
    const med = medicines.find((medicine) => medicine.id === id)

    if (selectedMedicine.some((med) => med.id === id)) return
    else {
      setSelectedMedicine([
        ...selectedMedicine,
        {
          id: med.id,
          name: med.name,
          unitPrice: med.price,
          actualQuantity: med.quantity,
          soldQuantity: 1,
          paymentMethod: method
        }
      ])
    }
  }

  function handleRemoveMedicineFromCart(id) {
    setSelectedMedicine(selectedMedicine.filter((med) => med.id !== id))
  }

  // ---------- handle quantity increment and decrement ----------
  function handleQuantityInput(e, id) {
    setSelectedMedicine(
      selectedMedicine.map((med) => {
        if (med.id === id) med.soldQuantity = e.target.value
        return med
      })
    )
  }

  function handleQuantityIncrement(id) {
    setSelectedMedicine(
      selectedMedicine.map((med) => {
        if (med.id === id) med.soldQuantity++
        return med
      })
    )
  }

  function handleQuantityDecrement(id) {
    setSelectedMedicine(
      selectedMedicine.map((med) => {
        if (med.id === id && med.soldQuantity > 1) med.soldQuantity--
        return med
      })
    )
  }

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(selectedMedicine))
  }, [selectedMedicine])

  // ---------- handle product search ----------
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [fileteredResults, setFileteredResults] = useState([])

  function handleProductSearch(e) {
    const searchValue = e.target.value.toLowerCase()
    setSearchTerm(searchValue)

    if (searchValue.trim() === '') {
      setIsSearching(false)
      setFileteredResults([]) // Reset to full list
      return
    }

    setIsSearching(true)

    // Debounce the search
    clearTimeout(window.searchTimeout)
    window.searchTimeout = setTimeout(() => {
      const searchResults = medicines.filter((med) => med.name.toLowerCase().includes(searchValue))
      setFileteredResults(searchResults)
    }, 300)
  }

  useEffect(() => {
    if (searchTerm.length === 0) {
      setIsSearching(false)
      setFileteredResults([])
    }
  }, [searchTerm])

  // ---------- handle payment method ----------
  const [method, setMethod] = useState('Cash')

  function handlePaymentMethod(e) {
    setMethod(e)
  }

  async function handleSell() {
    const data = selectedMedicine.map((med) => ({
      id: med.id,
      name: med.name,
      unitPrice: med.unitPrice,
      actualQuantity: med.actualQuantity,
      soldQuantity: med.soldQuantity,
      remainingQuantity: med.actualQuantity - med.soldQuantity,
      price: med.unitPrice * med.soldQuantity,
      paymentMethod: method
    }))
    await api.sellMedicine(data)
    setSelectedMedicine([])
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
          {!isSearching &&
            medicines
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((med, index) => (
                <div className={styles.product} key={index}>
                  <h1>{med.name}</h1>
                  <div className={styles.priceAdd}>
                    <p>&#8373; {med.price}</p>
                    <i
                      onClick={() => handleAddMedicineToCart(med.id)}
                      className="fas fa-plus-circle"
                    ></i>
                  </div>
                </div>
              ))}
          {isSearching &&
            fileteredResults?.map((res, index) => (
              <div className={styles.product} key={index}>
                <h1>{res.name}</h1>
                <div className={styles.priceAdd}>
                  <p>&#8373; {res.price}</p>
                  <i
                    onClick={() => handleAddMedicineToCart(res.id)}
                    className="fas fa-plus-circle"
                  ></i>
                </div>
              </div>
            ))}
          {medicines.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              No Medicines Found
            </p>
          )}
        </div>
      </div>

      <div className={styles.rightCol}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.cartContent}>
          {selectedMedicine?.map((med, index) => {
            return (
              <div className={styles.cartItem} key={index}>
                <div className={styles.deleteButton}>
                  <i
                    onClick={() => handleRemoveMedicineFromCart(med.id)}
                    className="fal fa-trash-can"
                  ></i>
                </div>
                <div>
                  <h1>{med.name}</h1>
                  <p>&#8373; {med.unitPrice}</p>
                </div>

                <div className={styles.quantityPrice}>
                  <div className={styles.quantity}>
                    <i
                      onClick={() => handleQuantityDecrement(med.id)}
                      className="fal fa-chevron-left"
                    ></i>
                    <input
                      type="text"
                      value={med.soldQuantity}
                      onChange={(e) => handleQuantityInput(e, med.id)}
                      onBlur={() => med.soldQuantity < 1 && handleRemoveMedicineFromCart(med.id)}
                    />
                    <i
                      onClick={() => handleQuantityIncrement(med.id)}
                      className="fal fa-chevron-right"
                    ></i>
                  </div>
                  <h4>&#8373; {med.unitPrice * med.soldQuantity}</h4>
                </div>
              </div>
            )
          })}
          {selectedMedicine.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              No Medicines Added to Cart
            </p>
          )}
        </div>

        <div className={styles.paymentInfo}>
          <h1>Order Summary</h1>

          <div className={styles.total}>
            <p>Total</p>
            <span>
              &#8373;{' '}
              {selectedMedicine.reduce((acc, med) => acc + med.unitPrice * med.soldQuantity, 0)}
            </span>
          </div>

          <div className={styles.paymentMethod}>
            <div className={styles.method} onClick={() => handlePaymentMethod('Cash')}>
              <input
                type="checkbox"
                checked={method === 'Cash'}
                onChange={() => {
                  return
                }}
              />
              <p>Cash</p>
            </div>
            <div className={styles.method} onClick={() => handlePaymentMethod('Momo')}>
              <input
                type="checkbox"
                checked={method === 'Momo'}
                onChange={() => {
                  return
                }}
              />
              <p>Momo</p>
            </div>
          </div>

          <button onClick={handleSell} className={styles.sellButton}>
            Sell
          </button>
        </div>
      </div>
    </section>
  )
}
