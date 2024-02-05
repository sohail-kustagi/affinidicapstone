import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, addToCart, clearCart }) => {
const navigate = useNavigate();

const getTotalPrice = () => {
return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

const goToCheckout = () => {
navigate('/checkout');
};

const handleRemoveFromCart = (productId) => {
const existingItemIndex = cartItems.findIndex(item => item.id === productId);
if (existingItemIndex !== -1) {
const updatedCartItems = [...cartItems];
const existingItem = updatedCartItems[existingItemIndex];
if (existingItem.quantity > 1) {
// If quantity is greater than 1, decrease quantity by 1
existingItem.quantity--;
} else {
// If quantity is 1, remove the item from the cart
updatedCartItems.splice(existingItemIndex, 1);
}
// Call removeFromCart with the updated item or updated cartItems array
removeFromCart(updatedCartItems);
}
};

const handleClearCart = () => {
// Call clearCart directly without any arguments
clearCart();
};
return (
<div className="Cart">
<table>
<thead>
<tr>
<th>Product</th>
<th>Name</th>
<th>Quantity</th>
<th>Price</th>
<th>Action</th> {/* New column for buttons */}
</tr>
</thead>
<tbody>
{cartItems.length === 0 ? (
<tr>
<td colSpan="5">Your cart is empty.</td>
</tr>
) : (
cartItems.map((item) => (
<tr key={item.id}>
<td><img src={item.imageUrl} alt={item.name} /></td>
<td>{item.name}</td>
<td>{item.quantity}</td>
<td>${item.price}</td>
<td>
<button onClick={() => handleRemoveFromCart(item.id)}>Remove</button> {/* Remove button */}
<button onClick={() => addToCart(item)}>Add</button> {/* Add button */}
</td>
</tr>
))
)}
</tbody>
<tfoot>
<tr>
<td colSpan="4">Total</td>
<td>${getTotalPrice()}</td>
</tr>
</tfoot>
</table>
<div>
<button onClick={handleClearCart} disabled={cartItems.length === 0}>Clear</button>
<button onClick={goToCheckout} disabled={cartItems.length === 0}>Go to Checkout</button>
</div>
</div>
);
};

export default Cart;

