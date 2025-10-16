import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracks, TracksDocument } from '../schemas/track.schema';
import mongoose, { Model } from 'mongoose';
import { CreateTrackDto } from './create-track.dto';

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Tracks.name)
    private trackModel: Model<TracksDocument>,
  ) {}
  @Get()
  async getAll(@Query('album') albumId: mongoose.Schema.Types.ObjectId) {
    if (albumId) {
      return this.trackModel.find({ album: albumId }).populate('album').exec();
    }
    return this.trackModel.find().populate('album').exec();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackModel.find({ _id: id });
  }
  @Post()
  create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      album: trackDto.album,
      name: trackDto.name,
      duration: trackDto.duration,
      number: trackDto.number,
    });
    return track.save();
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.trackModel.deleteOne({ _id: id });
  }
}
