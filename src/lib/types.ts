// literkę T dodajemy po to, żeby uniknąć ewentualnego konfliktu nazw
export type TFeedbackItem = {
  id: number;
  upvoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};
