type HashtagItemProps = {
  onSelectCompany: (company: string) => void;
  company: string;
};

export default function HashtagItem({ onSelectCompany, company }: HashtagItemProps) {
  return (
    <li>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
