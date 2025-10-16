import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null, type: String })
  image: string | null;

  @Prop({ default: null, type: String })
  description: string | null;

  @Prop({ default: null, type: Boolean })
  isPublished: false;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
