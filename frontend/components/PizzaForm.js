import React, { useReducer } from 'react'
import { useCreatePizzaMutation } from '../state/pizzaApi'

const ON_CHANGE = "ON_CHANGE"
const RESET_FORM = 'RESET_FORM'
const TOGGLE_TOPPING = "TOGGLE_TOPPING"

const initialFormState = { // suggested
  fullName: '',
  size: '',
  toppings: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case ON_CHANGE: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case TOGGLE_TOPPING: {
      const { topping } = action.payload
      const newToppings = state.toppings.includes(topping)
        ? state.toppings.filter(t => t !== topping)
        : [...state.toppings, topping]
      return { ...state, toppings: newToppings }
    }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createPizza, { error: orderError, isLoading: creatingOrder }] = useCreatePizzaMutation()

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: ON_CHANGE, payload: { name, value } })
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const toppingChange = ({ target: { name } }) => {
    dispatch({ type: TOGGLE_TOPPING, payload: { topping: name } })
  }



  const newOrder = async evt => {
    evt.preventDefault();
    const { fullName, size, toppings } = state
    createPizza({ fullName, size, toppings })
      .unwrap()
      .then(data => {
        console.log(data)
        resetForm()
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return (
    <form onSubmit={newOrder}>
      <h2>Pizza Form</h2>
      {orderError && <div className='failure'>{orderError.data.message}</div>}
      {creatingOrder && <div className='pending'>Order in progress...</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChange} value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={toppingChange} checked={state.toppings.includes("1")} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={toppingChange} checked={state.toppings.includes("2")} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={toppingChange} checked={state.toppings.includes("3")} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={toppingChange} checked={state.toppings.includes("4")} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={toppingChange} checked={state.toppings.includes("5")} />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
