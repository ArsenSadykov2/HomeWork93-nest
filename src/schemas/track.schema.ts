import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Album } from './album.schema';

export type TracksDocument = Tracks & Document;

@Schema()
export class Tracks {
  @Prop({
    required: true,
    ref: 'Album',
    type: mongoose.Schema.Types.ObjectId,
  })
  album: Album;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, unique: true, type: Number })
  number: number;

  @Prop({ default: null, type: Boolean })
  isPublished: false;
}

export const TracksSchema = SchemaFactory.createForClass(Tracks);
