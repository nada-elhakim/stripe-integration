import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Stripe} from "@ionic-native/stripe";
import {Http} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  card: any;
  constructor(public navCtrl: NavController, private stripe: Stripe, private http: Http) {

  }

  ngOnInit(): void {
    this.card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220',
    };
  }


  createCard() {
    this.stripe.createCardToken(this.card).then((card) => {
      console.log(card);
      this.chargeCard(card.id);
    }, (error) => console.log(error))
  }

  chargeCard(token) {
    this.http.post('https://wt-a2bb2074565f23a306bf71addf50c737-0.run.webtask.io/stripe_integration', {
      token,
      amount: 200,
      currency: 'CAD'
    }).subscribe(data => {
      console.log(data)
      alert('Payment processed successfully');
    });
  }
}


