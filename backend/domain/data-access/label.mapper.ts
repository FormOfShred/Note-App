import { Label as LabelPrisma } from '@prisma/client';
import { Label } from '../model/label';

const mapToLabel = ({
    id,
    name,
    color,
}: LabelPrisma
): Label =>
    new Label({id, name, color});

const mapToLabels = (labels: LabelPrisma[]): Label[] => labels.map(mapToLabel);

export {
    mapToLabel,
    mapToLabels
};