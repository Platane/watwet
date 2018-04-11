import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { variant, white } from '~/component/_abstract/palette'
import { Gear } from '~/component/Icon/Gear'

export const Setting = ({
  isDefault,
  habitatDictionarySpreadsheetId,
  habitatDictionarySpreadsheetUrl,
  vegetalDictionarySpreadsheetId,
  vegetalDictionarySpreadsheetUrl,
  forceHabitatDictionaryRefresh,
  forceVegetalDictionaryRefresh,
  habitatDictionaryLoaded,
  vegetalDictionaryLoaded,
  setSetting,
  resetSetting,
}) => (
  <Container>
    <PageTitle>
      <GearIcon />
      Setting
    </PageTitle>

    <Section>
      <SectionTitle>Habitats</SectionTitle>
      <p>
        google spreadsheet id :
        <LargeInput
          type="text"
          value={habitatDictionarySpreadsheetId}
          onBlur={e =>
            setSetting({ habitatDictionarySpreadsheetId: e.target.value })
          }
        />
      </p>
      <a target="blank" href={habitatDictionarySpreadsheetUrl}>
        view on google doc
      </a>
      <SectionFooter>
        {habitatDictionaryLoaded && (
          <Button onClick={forceHabitatDictionaryRefresh}>Refresh</Button>
        )}
        {!habitatDictionaryLoaded && 'loading ...'}
      </SectionFooter>
    </Section>

    <Section>
      <SectionTitle>Vegetals</SectionTitle>
      <p>
        google spreadsheet id :
        <LargeInput
          type="text"
          value={vegetalDictionarySpreadsheetId}
          onBlur={e =>
            setSetting({ vegetalDictionarySpreadsheetId: e.target.value })
          }
        />
      </p>
      <a target="blank" href={vegetalDictionarySpreadsheetUrl}>
        view on google doc
      </a>
      <SectionFooter>
        {vegetalDictionaryLoaded && (
          <Button onClick={forceVegetalDictionaryRefresh}>Refresh</Button>
        )}
        {!vegetalDictionaryLoaded && 'loading ...'}
      </SectionFooter>
    </Section>

    {!isDefault && (
      <Section>
        <SectionTitle>Reset</SectionTitle>
        <p>
          Did you manage to break everything ?{' '}
          <a href="#" onClick={resetSetting}>
            reset to default
          </a>
        </p>
      </Section>
    )}
  </Container>
)

const Button = styled.button`
  display: block;
  padding: 8px;
`

const LargeInput = styled.input`
  min-width: 360px;
  padding: 6px;
  border-radius: 2px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 260ms ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.16);
  }
`

const SectionFooter = styled.footer`
  margin: 16px 0;
  height: 40px;
`
const SectionTitle = styled.h2``
const PageTitle = styled.h1`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const GearIcon = styled(Gear)`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`

const Section = styled.section`
  margin: 32px 0;
`

const Container = styled.div`
  z-index: 2;
  position: relative;
  max-width: 800px;
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px auto;
  flex: 100px 1 1;
`
