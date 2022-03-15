import { Heading } from '@/legacy_pages/components/Heading'
import { CommonLayout } from '@/legacy_pages/layouts'
import { Flex } from '@heyui/component'
import { FC } from 'react'
import styled from 'styled-components'

export const ErrorFallback: FC = () => {
  return (
    <CommonLayout>
      <Container>
        <Heading description="Server error occurred. We apologize and are fixing the problem. Please try again at a later stage.">
          Oops, something went wrong
        </Heading>
        <BackHomeContainer justify="center">
          <BackHomeLink href="/">Back Home</BackHomeLink>
        </BackHomeContainer>
        <ContactUs>
          Having trouble? <a href="https://my.heyform.net/f/E4MKK2hx">Send us a message</a>
        </ContactUs>
      </Container>
    </CommonLayout>
  )
}

const Container = styled.div`
  padding: 0 24px;

  .heading-title,
  .heading-description {
    text-align: center;
  }
`

const BackHomeContainer = styled(Flex)`
  width: 100%;
`

const BackHomeLink = styled.a`
  width: 208px;
  height: 44px;
  margin-top: 36px;
  color: rgb(255, 255, 255);
  background: rgb(16, 107, 243);
  border-radius: 4px;
  line-height: 44px;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.2px;

  @media only screen and (max-width: 800px) {
    display: block;
    width: 100%;
  }
`

const ContactUs = styled.div`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.2px;
  margin-top: 24px;
  text-align: center;

  &,
  a {
    color: rgb(0, 0, 0);
  }

  a {
    text-decoration: underline;
  }
`
