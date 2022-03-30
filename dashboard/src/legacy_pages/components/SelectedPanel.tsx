import { Button, ComponentProps, Flex } from '@heyui/component'
import { isSet } from '@hpnp/utils/helper'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface SelectedPanelProps extends ComponentProps {
  selected: any[] | Set<any>
  actions: ReactNode
  onDeselect: () => void
}

export const SelectedPanel: FC<SelectedPanelProps> = ({
                                                        selected,
                                                        actions,
                                                        onDeselect,
                                                        ...restProps
                                                      }) => {
  const { t } = useTranslation()
  const size = isSet(selected) ? (selected as Set<any>).size : (selected as any[]).length

  return (
    <>
      {size > 0 && (
        <Container>
          <Wrapper align="center" justify="space-between" {...restProps}>
            <Left align="center">
              <span>
                {size} {t('submissions.selected')}
              </span>
              <Button onClick={onDeselect}>{t('submissions.Deselect')}</Button>
            </Left>
            <Right align="center">{actions}</Right>
          </Wrapper>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  position: fixed;
  left: 280px;
  right: 0;
  bottom: 64px;
  z-index: 99;
`

const Wrapper = styled(Flex)`
  width: 800px;
  margin: 0 auto;
  padding: 12px 24px;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);

  .hey-button {
    margin-left: 20px;
    padding-top: 4px;
    padding-bottom: 4px;
    border: none;
  }
`

const Left = styled(Flex)`
  .hey-button {
    background: #f3f3f3;
  }
`

const Right = styled(Flex)``
