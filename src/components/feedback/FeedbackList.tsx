import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
  console.log("FeedbackList rendering...");
  // const { isLoading, errorMessage, filteredFeedbackItems } = useFeedbackItemsContext();
  const isLoading = useFeedbackItemsStore(state => state.isLoading);
  const errorMessage = useFeedbackItemsStore(state => state.errorMessage);
  const getFilteredFeedbackItems = useFeedbackItemsStore(state => state.getFilteredFeedbackItems());

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {/* {isLoading ? <Spinner /> : null} */}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {getFilteredFeedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
