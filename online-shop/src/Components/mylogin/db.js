import React, { Component } from 'react';
import './mylogin.css';
let x;
var st = "";

class App extends React.Component {

    state = {
        products: [],
        product: {
            email: '',
            password: '',
            phone_number: ''

        }
    }
    componentDidMount() {
        this.getProducts();
    }

    findStart(str) {
        let number = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === 'e'
                && str[++i] === "m"
                && str[++i] === "a"
                && str[++i] === "i"
                && str[++i] === "l"
                && str[++i] === '"'
            ) {
                number = i + 3;
            }
        }
        st = "";
        return number;
    }
    getProducts = _ => {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(response => this.setState({ products: response.data }))
            .catch(err => console.error(err))
        //    .then(({ data }) => {
        //        for (let i = this.findStart(JSON.stringify(data)); JSON.stringify(data)[i] !== '"'; i++) {

        //            st += (JSON.stringify(data)[i]);
        //        }
        //        console.log("st:" + st);
        //    })

        //    .catch(err => console.error(err))
        //return st;

    }

    addProduct = _ => {
        const { product } = this.state;
        console.log(product.price);
        const url = 'http://localhost:4000/products/add?price=' + product.price + '&name=' + product.name;
        fetch(url)
            .then(this.getProducts)
            .catch(err => console.error(err))

    }
    //onClick() {
    //    fetch('http://localhost:4000/products')
    //        .then(res => res.json())
    //        .then((response) => { console.log(response); })
    //}

    onClick() {
        // console.log(product.email);
        var m = localStorage.getItem('db_email');
        const url = 'http://localhost:4000/products/find?email=' + m;
        fetch(url)
            .then(res => res.json())
            .then((response) => {
              //  localStorage.setItem('db_password', response.data[0].password);
                //localStorage.setItem('db_number', response.data[0].phone_number);
                console.log(localStorage.getItem('db_email') + localStorage.getItem('db_password') + localStorage.getItem('db_number') );
            })
    }
    renderProduct = ({ email, password, phone_number }) => <div key={email}  >{password},{phone_number} </div>

    render() {
        const { products, product } = this.state;

        return (
            <div className="App">



                {products.map(this.renderProduct)}
                <div><input value={product.email}
                    onChange={e => this.setState({ product: { ...product, email: e.target.value } })} />
                    <input value={product.password}
                        onChange={e => this.setState({ product: { ...product, password: e.target.value } })} />


                    <button onClick={this.onClick}>Add product</button> 
                    </div>
                {localStorage.getItem('db_password')}
                {localStorage.getItem('db_number')}

            </div>
        );
    }
} export default App;
