import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useDispatch, useSelector } from 'react-redux'
import { changeSize } from '../state/pizzaSlice'

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery()
  const toggleSize = useSelector(st => st.filters.size)
  const dispatch = useDispatch()
  const filteredOrders = toggleSize === "All"
  ? orders 
  : orders.filter(order => order.size === toggleSize)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders?.map(order => {
            let toppingsCount = 0
            if (order.toppings && order.toppings.length) {
              toppingsCount = order.toppings.length
            }
            return (
              <li key={order.id}>
                <div>
                  {order.customer} ordered a size {order.size} with {toppingsCount > 0 ? toppingsCount : "no"} toppings
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === toggleSize ? ' active' : ''}`
            return <button
              onClick={() => dispatch(changeSize(size))}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
