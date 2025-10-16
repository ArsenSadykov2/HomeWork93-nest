import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { CreateArtist } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}
  @Get()
  getAll() {
    return this.artistModel.find();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/images/artists' }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtist,
  ) {
    const artist = new this.artistModel({
      name: artistDto.name,
      image: file ? 'images/artists/' + file.filename : null,
      description: artistDto.description,
    });
    return artist.save();
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.artistModel.deleteOne({ _id: id });
  }
}
