import { getAuthState } from '@/utils'
import type { FC } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import config from './config'

export interface CustomRouteConfig {
  path: string
  exact?: boolean
  title?: string
  loginRequired?: boolean
  layout: any
  component: any
}

/*!
 * route-order https://github.com/sfrdmn/node-route-order
 *
 * Takes a sliced path and returns an integer representing the
 * "weight" of its free variables. More specific routes are heavier
 *
 * Intuitively: when a free variable is at the base of a path e.g.
 * '/:resource', this is more generic than '/resourceName/:id' and thus has
 * a lower weight
 *
 * Weight can only be used to compare paths of the same depth
 */
function pathWeight(sliced: string[]): number {
  return sliced.reduce(function (weight, part, i) {
    // If is bound part
    if (!/^:.+$/.test(part)) {
      // Weight is positively correlated to indexes of bound parts
      weight += Math.pow(i + 1, sliced.length)
    }
    return weight
  }, 0)
}

function sortRoute(pathA: string, pathB: string) {
  if (/^\/$/.test(pathA)) {
    return -1
  }

  if (/^\/$/.test(pathB)) {
    return 1
  }

  const slicedA = pathA.split('/')
  const slicedB = pathB.split('/')
  const depthA = slicedA.length
  const depthB = slicedB.length

  if (depthA === depthB) {
    const weightA = pathWeight(slicedA)
    const weightB = pathWeight(slicedB)
    return weightA > weightB ? 1 : -1
  } else {
    return depthA > depthB ? 1 : -1
  }
}

const CustomRoute: FC<CustomRouteConfig> = ({
  path,
  exact,
  loginRequired = true,
  layout: Layout,
  component: Component,
  title
}) => {
  const isLoggedIn = getAuthState()
  const children = (
    <Route path={path} exact={exact}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  )

  useEffect(() => {
    if (title) {
      document.title = `${title} | HeyForm`
    }
  }, [title])

  if (loginRequired) {
    const next = window.location.pathname + window.location.search

    return isLoggedIn ? children : <Redirect to={`/login?next=${encodeURIComponent(next)}`} />
  } else {
    return !isLoggedIn ? children : <Redirect to="/" />
  }
}

const sortedConfig = config.sort((i, j) => sortRoute(j.path, i.path))

export default () => (
  <BrowserRouter>
    <Switch>
      {sortedConfig.map(row => (
        <CustomRoute key={row.path} {...row} />
      ))}
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)
