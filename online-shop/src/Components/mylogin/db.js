import React, { Component } from 'react';
import './mylogin.css';
let x;
var st = "";
let j="whopper";

class db extends React.Component {
    state = {
        products: [],
        product: {
            email: "",
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
        // console.log(product.name);
        const url = 'http://localhost:4000/products/find?email=amypi@eircom.net';
        fetch(url)
            .then(res => res.json())
            .then((response) => { j = (response.data[0].password) })

            .then(this.getProducts)
            .catch(err => console.error(err))
        console.log(j);
    }
    //onClick() {
    //    fetch('http://localhost:4000/products')
    //        .then(res => res.json())
    //        .then((response) => { console.log(response); })
    //}

    onClick() {
        const { product } = this.state;
        console.log(product.email);
        const url = 'http://localhost:4000/products/find?name=' + product.email;
        fetch(url)
            .then(res => res.json())
            .then((response) => { console.log("yeet"); })
    }
    renderProduct = ({ email, password, phone_number }) => <div key={email}  >{password},{phone_number} </div>

    render() {
        const { products, product } = this.state;
        console.log("wow" + j);

        return (
            <div className="App">



                {products.map(this.renderProduct)}
                <div><input value={product.price}
                    onChange={e => this.setState({ product: { ...product, price: e.target.value } })} />
                    <input value={product.name}
                        onChange={e => this.setState({ product: { ...product, name: e.target.value } })} />


                    <button onClick={this.addProduct(product.email)}>Add product</button>
                    <div>
                        {j}
                        </div>
                </div>

            </div>
        );
    }
} export default db;