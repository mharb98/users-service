import { InternalProfileEntity } from '../entities/internal-profile.entity';
import { UpdateInternalProfileInput } from '../interfaces/update-internal-profile-input.interface';

export interface InternalProfileRepository {
  findUnique(internalProfileId: number): Promise<InternalProfileEntity>;
  findOneAndUpdate(
    internalProfileId: number,
    updateInternalProfileInput: UpdateInternalProfileInput,
  ): Promise<InternalProfileEntity>;
}
