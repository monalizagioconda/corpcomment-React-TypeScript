import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
  console.log("FeedbackList rendering...");
  const { isLoading, errorMessage, filteredFeedbackItems } = useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {/* {isLoading ? <Spinner /> : null} */}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
