import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Result from './components/Result'
import Assessment from './components/Assessment'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/assessment" component={Assessment} />
    <ProtectedRoute exact path="/results" component={Result} />
    <Route exact path="/not-found" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)
export default App
