import { create } from 'zustand'
import { TFeedbackItem } from '../lib/types'

type Store = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  selectedCompany: string
  getCompanyList: () => string[]
  getFilteredFeedbackItems: () => TFeedbackItem[]
  addItemToList: (text: string) => Promise<void>
  selectCompany: (company: string) => void
  fetchFeedbackItems: () => Promise<void>
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map(item => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index // filtracja duplikatów
      })
  },
  getFilteredFeedbackItems: () => {
    const { feedbackItems, selectedCompany } = get()

    return selectedCompany
      ? feedbackItems.filter(feedbackItem => feedbackItem.company === selectedCompany)
      : feedbackItems
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))! // funkcja jest zabezpieczona przed tym, że musi być '#', dlatego tu wiemy, że nie będzie przypadku że .find() zwróci undefined. (! - mówi coś w rodzaju, że my wiemy więcej niż TS)
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toLocaleUpperCase(),
    }

    // zamiast useState()
    set(state => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }))

    await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  },
  selectCompany: (company: string) => {
    // setSelectedCompany(company);
    set(() => ({
      selectedCompany: company,
    }))
  },
  fetchFeedbackItems: async () => {
    // setIsLoading(true);
    set(() => ({
      isLoading: true,
    }))

    try {
      const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks')

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
      // setFeedbackItems(data.feedbacks);
      set(() => ({
        feedbackItems: data.feedbacks,
      }))
    } catch (error) {
      // setErrorMessage("Something went wrong. Please try again later.");
      set(() => ({
        errorMessage: 'Something went wrong. Please try again later.',
      }))
    }

    set(() => ({
      isLoading: false,
    }))
  },
}))

export const feedbackItemsSelector = (state: Store) => state.fetchFeedbackItems
