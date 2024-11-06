import { useContext } from 'react';
import logo from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleSlowCart(){
        userProgressCtx.showCart();
    }

    return(
        <div id='main-header'>
            <div id='title'>
                <img src={logo} alt="Table with cutlery"/>
                <h1>CARBONARA CON POMODORINI?????</h1>
            </div>
            <nav>
                <Button textOnly={true} onClick={handleSlowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </div>
    );
}