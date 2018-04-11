import { h, Component } from 'preact'
import styled, { keyframes } from 'preact-emotion'
import { error as reportError } from '~/util/reporter'

const getMessage = ({ type, error, ...props }) => {
  switch (type) {
    case 'fetch':
      const [entity] = props.key.split('.')

      if (error.status == 404)
        return `Fail to fetch the ${entity}, entity does not exist.`

      reportError(error)

      return `Fail to fetch the ${entity}.`

    case 'auth':
      if (error.details == 'Cookies are not enabled in current environment.')
        return `Fail to init google services. Please enable cookies.`

      return `Fail to log.`
  }
}

export const ToastContent = ({ toast }) => (
  <Container>{getMessage(toast)}</Container>
)

const Container = styled.div`
  flex: 200px 1 1;
  text-align: center;
`
