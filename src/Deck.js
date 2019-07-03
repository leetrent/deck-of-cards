import React, { Component } from 'react';
import axios from 'axios';

// const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";


export default class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, drawn: [] }
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        // let payload = await axios.get(API_URL);
        let payload = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({
            deck: payload.data
        });
    }
    // async getCard() {
    //     // Make API request using deck_id
    //     // Set state using newly retrieved card info form API
    //     let id = this.state.deck.deck_id;
    //     let cardUrl = `${API_BASE_URL}/${id}/draw/`;
    //     console.log("cardUrl", cardUrl);
    //     let cardResponse = await axios.get(cardUrl);
    //     console.log("cardResponse.data", cardResponse.data);
    //     let card = cardResponse.data.cards[0];
    //     this.setState(st => ({
    //         drawn: [
    //             ...st.drawn,
    //             {
    //                 id: card.code,
    //                 image: card.image,
    //                 name: `${card.value} of ${card.suit}`
    //             }
    //         ]
    //     }));
    // }
    async getCard() {
        let id = this.state.deck.deck_id;
        try {
            let cardUrl = `${API_BASE_URL}/${id}/draw/`;
            console.log("cardUrl", cardUrl);
            let cardResponse = await axios.get(cardUrl);
            if (!cardResponse.data.success) {
                throw new Error("No cards remaining");
            }
            console.log("cardResponse.data", cardResponse.data);
            let card = cardResponse.data.cards[0];
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
    
        } catch (err) {
            alert(err);
        }
    }    
    render() {
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get Card!</button>
            </div>
        )
    }
}
