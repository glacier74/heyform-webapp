import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

whyDidYouRender(React, {
  trackAllPureComponents: true, //does not seem to work
  logOnDifferentValues: true,
  include: [/.*/]
})
