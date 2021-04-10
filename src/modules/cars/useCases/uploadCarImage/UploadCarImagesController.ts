import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCarImageUseCase from './UploadCarImagesUseCase';

interface IFile {
  filename: string;
}

export default class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const uploadCarImageuseCase = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map(file => file.filename);

    await uploadCarImageuseCase.execute({
      car_id: id,
      images_name: fileNames,
    });

    return response.status(201);
  }
}
