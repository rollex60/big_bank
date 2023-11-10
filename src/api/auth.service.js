import { redQuery } from "@/core/red-query/red-query.lib"
import { NotificationService } from "@/core/services/notification.service"
import { Store } from "@/core/store/store"

export class AuthService {
  #BASE_URL = '/auth'

  constructor(){
    // store
    this.store = Store.getInstance()
    this.notificationService = new NotificationService()
  }

  main(type, body) {
    return redQuery({
      path: `${this.#BASE_URL}/${type}`,
      body,
      onSuccess: data => {
        //login store
        this.store.login(data.user, data.accessToken)
        this.notificationService.show(
          'success',
          'You have successfully logged in!'
        )
      },
      method: 'POST',
    })
  }
}