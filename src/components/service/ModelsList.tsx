import { SUPPORTED_MODELS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';

export default function ModelsList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {SUPPORTED_MODELS.map((model) => (
        <div
          key={model.name}
          className="bg-surface-1 border border-border rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <p className="font-semibold text-sm">{model.name}</p>
            <p className="text-xs text-muted">{model.provider}</p>
          </div>
          <Badge variant="green">{model.status}</Badge>
        </div>
      ))}
    </div>
  );
}
