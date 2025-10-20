import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../auth/role-auth.guard';
import { TokenAuthGuard } from '../auth/token-auth.guard';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}
  @Get()
  async getAll(@Query('artist') artistId?: string) {
    if (artistId) {
      return this.albumModel
        .find({ artist: artistId })
        .populate('artist')
        .exec();
    }
    return this.albumModel.find().populate('artist').exec();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.albumModel.find({ _id: id });
  }
  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/images/albums' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      artist: albumDto.artist,
      name: albumDto.name,
      releaseDate: albumDto.releaseDate,
      image: file ? '/images/albums/' + file.filename : null,
    });

    return await album.save();
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.albumModel.deleteOne({ _id: id });
  }
}
