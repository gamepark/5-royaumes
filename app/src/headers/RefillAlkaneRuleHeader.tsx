/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const RefillAlkaneRuleHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.refill')}</>
}
