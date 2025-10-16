import { CreateArtist } from '../artists/create-artist.dto';

export class CreateAlbumDto {
  artist: CreateArtist;
  name: string;
  releaseDate: string;
  image: string | null;
  isPublished?: boolean;
}
