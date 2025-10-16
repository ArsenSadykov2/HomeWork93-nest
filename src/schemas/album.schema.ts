import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  artist: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  releaseDate: number;

  @Prop({ default: null, type: String })
  image: string | null;

  @Prop({ default: null, type: Boolean })
  isPublished: false;

  @Prop()
  author: mongoose.Schema.Types.ObjectId;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
