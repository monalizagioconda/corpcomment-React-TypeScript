type HashtagListProps = {
  children: React.ReactNode;
};

export default function HashtagList({ children }: HashtagListProps) {
  return <ul className="hashtags">{children}</ul>;
}
