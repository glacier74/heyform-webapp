import { Request } from '@/legacy_pages/components'
import { AppModel } from '@/legacy_pages/models'
import { Summary } from '@/legacy_pages/pages/Integration/views/Settings/views/Summary'
import { AppService } from '@/service'
import { useQuery } from '@/legacy_pages/utils'
import { Button, Flex, message } from '@heyui/component'
import { FC, useState } from 'react'
import styled from 'styled-components'

const OauthAuthorize: FC = () => {
  const { client_id, redirect_uri, state } = useQuery()

  const [app, setApp] = useState<AppModel | undefined>()
  const [loading, setLoading] = useState(false)

  async function fetchAppDetail() {
    const res = await AppService.detail(client_id, redirect_uri)
    setApp(res)
    return true
  }

  async function handleAuthorize() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      const res = await AppService.authorizationCode(client_id, redirect_uri)
      window.location.href = `${res}&state=${state}`
    } catch (err: any) {
      message.error('Authorize failed')
    }

    setLoading(false)
  }

  return (
    <Request fetch={fetchAppDetail}>
      <Container justify="center" column={true}>
        <Summary app={app} />

        <Permission>
          <Header>{app?.name} would like to:</Header>

          <Body>
            <PermissionItem>
              <Name>Workspace Read</Name>
              <Description>
                Retrieve data about all the workspaces in your HeyForm account
              </Description>
            </PermissionItem>

            <PermissionItem>
              <Name>Project Read</Name>
              <Description>
                Retrieve data about all the project in your HeyForm workspace
              </Description>
            </PermissionItem>

            <PermissionItem>
              <Name>Form Read</Name>
              <Description>Retrieve data about all the forms in your HeyForm project</Description>
            </PermissionItem>

            <PermissionItem>
              <Name>Submission Read</Name>
              <Description>Retrieve form submissions you collected</Description>
            </PermissionItem>

            <PermissionItem>
              <Name>Accounts Read</Name>
              <Description>Retrieve your HeyForm account information</Description>
            </PermissionItem>
          </Body>
          <Button type="primary" loading={loading} block={true} onClick={handleAuthorize}>
            Authorize
          </Button>
        </Permission>
      </Container>
    </Request>
  )
}

const Container = styled(Flex)`
  width: 540px;
  margin: auto;
  height: 100%;
`

const Permission = styled.div`
  margin-bottom: 64px;
  padding: 36px;
  background: #fafbfc;
`

const Body = styled.div`
  margin-bottom: 40px;

  ul {
    padding: 0;
    margin-left: 16px;
    margin-top: 8px;
    margin-bottom: 16px;
  }
`

const Header = styled.div`
  margin-bottom: 36px;
  font-size: 20px;
  color: #4e5d78;
  text-align: center;
`

const PermissionItem = styled.div`
  margin-bottom: 16px;
`

const Name = styled.div`
  color: #4e5d78;
`

const Description = styled.div`
  margin-top: 4px;
  color: #8a94a6;
  font-size: 13px;
`

export default OauthAuthorize
