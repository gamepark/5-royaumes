/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const PlayerTitanHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('help.titan.column')}</h2>
    <p>
      {t('help.titan.column.purpose')}
    </p>
  </>
}