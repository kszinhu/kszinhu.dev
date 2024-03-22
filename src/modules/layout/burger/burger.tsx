import { BurgerProps, Burger as MantineBurger } from '@mantine/core';
import classes from './burger.module.css';

const Burger = (props: BurgerProps) => <MantineBurger {...props} className={classes.burger} />;

export default Burger;
