import { Controller, Get, Param, Post, Query, Response } from '@nestjs/common';
import { MinioService } from './minio.service';
import express from 'express';

@Controller('storage')
export class MinioController {
  constructor(private readonly service: MinioService) {
    this.service.addBucket();
  }

  @Get('get/:objName')
  async getObject(
    @Param('objName') objName: string,
    @Response() res: express.Response,
  ) {
    const object = await this.service.getObj(objName);
    object.pipe(res);
  }
}
