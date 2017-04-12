import { Component, OnInit } from '@angular/core';

import { Quote } from "../../data/quote.interface";
import quotes from '../../data/quotes';
import { QuotesPage } from "../quotes/quotes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  quoteCollection: {category: string, quotes: Quote[], icon: string}[];
  quotesPage = QuotesPage;
profilePicture: any="assets/icon/logo.gif";
  ngOnInit() {
    this.quoteCollection = quotes;
  }
}
