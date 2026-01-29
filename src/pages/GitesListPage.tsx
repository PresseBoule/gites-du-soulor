import { GitesSection } from '../components/GitesSection';
import { useAdmin } from '../contexts/AdminContext';

export function GitesListPage() {
  const { content } = useAdmin();

  return (
    <div className="pt-24">
      <GitesSection gites={content?.gites} />
    </div>
  );
}
