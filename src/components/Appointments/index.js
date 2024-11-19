import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], showStarred: false}

  titleUpdate = event => {
    this.setState({title: event.target.value})
  }

  dateUpdate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitting = event => {
    event.preventDefault()
    const {title, date, appointmentsList} = this.state
    const newData = {
      id: uuid(),
      title,
      date,
      isStarred: false,
    }
    this.setState({
      appointmentsList: [...appointmentsList, newData],
      title: '',
      date: '',
    })
  }

  toggleStar = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  onClickingStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment =>
        eachAppointment.id === id
          ? {...eachAppointment, isStarred: !eachAppointment.isStarred}
          : eachAppointment,
      ),
    }))
  }

  render() {
    const {appointmentsList, title, date, showStarred} = this.state

    const filteredArray = showStarred
      ? appointmentsList.filter(eachAppointment => eachAppointment.isStarred)
      : appointmentsList

    const starStyle = showStarred ? 'bg-color-btn' : 'no-bg-btn'

    return (
      <div className="background">
        <div className="container">
          <div className="display-container">
            <form onSubmit={this.onSubmitting}>
              <h1 className="title">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                onChange={this.titleUpdate}
                className="input-tag"
                type="text"
                placeholder="Title"
                id="title"
                value={title}
              />
              <br />
              <br />
              <label className="label" htmlFor="date">
                DATE
              </label>
              <br />
              <input
                onChange={this.dateUpdate}
                className="input-tag"
                type="date"
                placeholder="dd/mm/yy"
                id="date"
                value={date}
              />
              <br />
              <br />
              <button className="btn" type="submit">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <br />
          <hr />
          <div>
            <div className="name-star-container">
              <h1 className="title">Appointments</h1>
              <button
                onClick={this.toggleStar}
                className={starStyle}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredArray.map(eachAppointment => (
                <AppointmentItem
                  onStar={this.onClickingStar}
                  details={eachAppointment}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
