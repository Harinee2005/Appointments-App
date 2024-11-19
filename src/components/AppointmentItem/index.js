import {Component} from 'react'
import {format} from 'date-fns'
import './index.css'

class AppointmentItem extends Component {
  onStarAppointment = () => {
    const {onStar, details} = this.props
    const {id} = details
    onStar(id)
  }

  render() {
    const {details} = this.props
    const {title, date, isStarred} = details
    const image = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    return (
      <li className="list">
        <div className="name-star-container">
          <p className="appointment-title">{title}</p>
          <button
            className="btn-star"
            type="button"
            data-testid="star"
            onClick={this.onStarAppointment}
          >
            <img src={image} alt="star" className="star" />
          </button>
        </div>

        <p className="appointment-time">
          Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </li>
    )
  }
}

export default AppointmentItem
