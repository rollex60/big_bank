import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import styles from './card-info.module.scss'
import template from './card-info.template.html'
import { Store } from '@/core/store/store';
import { CardService } from '@/api/card.service';
import { $R } from '@/core/rquery/rquery.lib';
import { formatCardNumber } from '@/utils/format/format-card-number';
import { formatToCurrency } from '@/utils/format/format-to-currency';
import { BALANCE_UPDATED } from '@/constants/event.constants';

const CODE = '*****'

export class CardInfo extends ChildComponent {
  constructor() {
    super()

    this.store = Store.getInstance()
    this.cardService = new CardService()

    this.element = renderService.htmlToElement(template, [], styles)

    this.#addListeners()
  }

  #addListeners() {
    document.addEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
    }

  #removeListeners() {
    document.removeEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
    }

    destroy() {
      this.#removeListeners()
    }

    #onBalanceUpdated = () => {
      this.fetchData()

  }

  #copyCardNumber(e) {
    navigator.clipboard.writeText(e.target.innerText).then(() => {
      e.target.innerText = 'Card number copied!'
      setTimeout(() => {
        e.target.innerText = formatCardNumber(this.card.number)
      }, 2000)
    })
  }

  #toggleCvc(cardCvcElement) {
    const text = cardCvcElement.text()
    text === CODE
      ? cardCvcElement.text(this.card.cvc)
      : cardCvcElement.text(CODE)
  }

  fillElements() {
    $R(this.element).html(
      renderService.htmlToElement(template, [], styles).innerHTML
    )

    $R(this.element)
      .findAll(':scope > div')
      .forEach(child => {
        child.addClass('fade-in')
      })

      $R(this.element)
      .find('#card-number')
      .text(formatCardNumber(this.card.number))
      .click(this.#copyCardNumber.bind(this))

      $R(this.element).find('#card-expire-data').text(this.card.expireDate)

      const cardCvcElement = $R(this.element).find('#card-cvc')
      cardCvcElement.text(CODE).css('width', '44px')

      $R(this.element)
        .find('#toggle-cvc')
        .click(this.#toggleCvc.bind(this, cardCvcElement))

        $R(this.element) 
          .find('#card-balance')
          .text(formatToCurrency(this.card.balance))

  }

  fetchData() {
    this.cardService.byUser(data => {
      if (data?.id) {
        this.card = data
        this.fillElements()
        this.store.updateCard(data)
      } else {
        this.store.updateCard(null)
      }
    })
  }

  render() {
    if (this.store.state.user) this.fetchData()
    return this.element
  }
}