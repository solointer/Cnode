import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

/* inject将store中的值注入到组件  observer告诉mobx appState的值改变组件就需要更新 */
@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  changeName(event) {
    const { appState } = this.props
    appState.changeName(event.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        {appState.msg}
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
