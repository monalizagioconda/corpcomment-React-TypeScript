import { useState } from 'react'
import { TriangleUpIcon } from '@radix-ui/react-icons'
import { TFeedbackItem } from '../../lib/types'

// poniższy typ używamy lokalnie, nie ma sensu go trzymać w lib/types, ponieważ opisuje on propsy poniższego komponentu; nie potrzebujemy tego typu w innych plikach
type FeedbackItemProps = {
  feedbackItem: TFeedbackItem
}

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount)
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount(prev => prev + 1) // nie zmieniamy starego stanu
    // e.currentTarget.disabled = true;
    setButtonDisabled(true) // lepiej mieć jasno zadeklarowane w useState, które dane wpływają na widok
    e.stopPropagation()
  }

  return (
    // w clasie będą albo dwie klasy, z czego --expand dokłada parametry do piewszej, albo jedna (ze spacją)
    <li onClick={() => setOpen(prev => !prev)} className={`feedback ${open ? 'feedback--expand' : ''}`}>
      <button disabled={isButtonDisabled} onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      {/* <p>{feedbackItem.daysAgo}d</p> */}
      <p>{feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
    </li>
  )
}
