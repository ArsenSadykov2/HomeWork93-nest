import { CreateAlbumDto } from '../albums/create-album.dto';

export class CreateTrackDto {
  album: CreateAlbumDto;
  name: string;
  duration: string | null;
  number: number;
  isPublished?: boolean;
}
