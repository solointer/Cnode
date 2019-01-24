import React from 'react'

import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import TestApi from '../views/test/api-test'

/* exact 匹配到/就不往下继续匹配, redirect是路由的重定向 */
export default () => [
  <Route key="first" path="/" render={() => <Redirect to="/list" />} exact />,
  <Route key="list" path="/list" component={TopicList} exact />,
  <Route key="detail" path="/detail" component={TopicDetail} />,
  <Route key="testApi" path="/testApi" component={TestApi} />,
]
