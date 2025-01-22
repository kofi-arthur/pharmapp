import AddComponent from '../components/addComponent'
import styles from '../styles/inventory.module.css'

import React, { useState } from 'react'

export default function Inventory() {
  // -------------- handle search --------------
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  function handleSearch(e) {
    e.length > 0 ? setIsSearching(true) : setIsSearching(false)
    setSearchTerm(e)
  }

  const [isAdding, setIsAdding] = useState(true)

  return (
    <>
      <section className={styles.inventorySection}>
        <div className={styles.operation}>
          <div className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm.length > 0 && setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              name="search"
              placeholder="Search..."
            />
            <i
              onClick={() => isSearching && setSearchTerm('')}
              className={isSearching ? 'far fa-times' : 'far fa-search'}
            ></i>
          </div>
          <button className={styles.addButton}>Add</button>
        </div>

        <div className={styles.tableContainer}>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paracetamol</td>
                <td>2</td>
                <td>&#8373; 100.00</td>
                <td>
                  <i className="fal fa-pen"></i>
                </td>
                <td>
                  <i className="fal fa-trash-can"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {isAdding && <AddComponent />}
    </>
  )
}
