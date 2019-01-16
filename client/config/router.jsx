import React from 'react'

import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

/* exact 匹配到/就不往下继续匹配, redirect是路由的重定向 */
export default () => [
  <Route key={1} path="/" render={() => <Redirect to="/list" />} exact />,
  <Route key={2} path="/list" component={TopicList} exact />,
  <Route key={3} path="/detail" component={TopicDetail} />,
]
