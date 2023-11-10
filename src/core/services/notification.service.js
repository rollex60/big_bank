import { $R } from '@/core/rquery/rquery.lib';
import styles from '@/components/layout/notification/notification.module.scss'

/**
* NotificationService is a utility to handle displaying
* notifications.
* It can used to display message with different types (success,
* error) and manage the notification timeout.
*/
export class NotificationService {
  #timeout

  constructor(){
    this.#timeout = null
  }

  #setTimeout(callback, duration){
    if (this.#timeout) {
      clearTimeout(this.#timeout)
    }
    this.#timeout = setTimeout(callback, duration)
  }

  /**
   * Show a notification with a specified message and type.
   * The notification will automatically hide after a specified
   * duration.
   * @param {string} message - The message to be displayed in the
   * notification.
   * @param {('success'|'error')} type - The type of the notification,
   * only 'success' or 'error' are accepted.
   */
  show(type, message){
    if (!['success', 'error'].includes(type)) {
      throw new Error(
        'Invalid notification type. Allow types are "success" and "error".'
      )
    }

    const classNames = {
      success: styles.success,
      error: styles.error
    }

    const notificationElement = $R('#notification')
    const className = classNames[type]

    notificationElement.text(message).addClass(className)

    this.#setTimeout(() => {
      notificationElement.removeClass(className)
    }, 3000)
  }
}