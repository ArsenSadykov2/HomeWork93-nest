import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Artist } from './artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({
    required: true,
    ref: 'Artist',
    type: mongoose.Schema.Types.ObjectId,
  })
  artist: Artist;

  @Prop({ required: true })
  name: string;

  @Prop()
  releaseDate: number;

  @Prop({ default: null, type: String })
  image: string | null;

  @Prop({ default: null, type: Boolean })
  isPublished: false;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
