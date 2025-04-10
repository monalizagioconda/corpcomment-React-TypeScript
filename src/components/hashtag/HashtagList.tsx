import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore'
import HashtagItem from './HashtagItem'

export default function HashtagList() {
  console.log('HashtagList rendering...')

  const companyList = useFeedbackItemsStore(state => state.getCompanyList())
  const selectCompany = useFeedbackItemsStore(state => state.selectCompany)

  return (
    <ul className="hashtags">
      {companyList.map(company => (
        <HashtagItem key={company} company={company} onSelectCompany={selectCompany} />
      ))}
    </ul>
  )
}
