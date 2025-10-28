import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

export interface UploadedFile {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
}

@Injectable()
export class UploadService {
  private readonly uploadDir: string;
  private readonly maxFileSize: number;
  private readonly allowedMimeTypes: string[];
  private readonly allowedImageTypes: string[];

  constructor(private configService: ConfigService) {
    // Configure upload directory
    this.uploadDir = path.join(process.cwd(), 'uploads');
    
    // Max file size: 5MB
    this.maxFileSize = 5 * 1024 * 1024;
    
    // Allowed mime types
    this.allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    this.allowedImageTypes = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
    
    // Ensure upload directory exists
    this.ensureUploadDirectory();
  }

  /**
   * Ensure upload directory exists
   */
  private async ensureUploadDirectory() {
    const dirs = [
      this.uploadDir,
      path.join(this.uploadDir, 'products'),
      path.join(this.uploadDir, 'avatars'),
      path.join(this.uploadDir, 'temp'),
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        await mkdir(dir, { recursive: true });
        console.log(`📁 Created upload directory: ${dir}`);
      }
    }
  }

  /**
   * Validate file
   */
  private validateFile(file: Express.Multer.File): void {
    // Check if file exists
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File too large. Maximum size is ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    // Check mime type
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedImageTypes.join(', ')}`,
      );
    }
  }

  /**
   * Generate unique filename
   */
  private generateFilename(originalName: string): string {
    const ext = path.extname(originalName);
    const uuid = uuidv4();
    return `${uuid}${ext}`;
  }

  /**
   * Upload product image
   */
  async uploadProductImage(file: Express.Multer.File): Promise<UploadedFile> {
    this.validateFile(file);

    const filename = this.generateFilename(file.originalname);
    const filePath = path.join(this.uploadDir, 'products', filename);
    const relativePath = path.join('products', filename);

    // Write file to disk
    await writeFile(filePath, file.buffer);

    console.log(`✅ Uploaded product image: ${filename}`);

    return {
      filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: relativePath,
      url: `/uploads/${relativePath.replace(/\\/g, '/')}`,
    };
  }

  /**
   * Upload avatar image
   */
  async uploadAvatar(file: Express.Multer.File): Promise<UploadedFile> {
    this.validateFile(file);

    const filename = this.generateFilename(file.originalname);
    const filePath = path.join(this.uploadDir, 'avatars', filename);
    const relativePath = path.join('avatars', filename);

    // Write file to disk
    await writeFile(filePath, file.buffer);

    console.log(`✅ Uploaded avatar: ${filename}`);

    return {
      filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: relativePath,
      url: `/uploads/${relativePath.replace(/\\/g, '/')}`,
    };
  }

  /**
   * Upload multiple files
   */
  async uploadMultiple(
    files: Express.Multer.File[],
    type: 'products' | 'avatars' = 'products',
  ): Promise<UploadedFile[]> {
    const uploadPromises = files.map((file) => {
      if (type === 'avatars') {
        return this.uploadAvatar(file);
      }
      return this.uploadProductImage(file);
    });

    return Promise.all(uploadPromises);
  }

  /**
   * Delete file
   */
  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.uploadDir, filePath);

    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
      console.log(`🗑️  Deleted file: ${filePath}`);
    } else {
      console.warn(`⚠️  File not found: ${filePath}`);
    }
  }

  /**
   * Delete multiple files
   */
  async deleteMultiple(filePaths: string[]): Promise<void> {
    const deletePromises = filePaths.map((filePath) =>
      this.deleteFile(filePath),
    );

    await Promise.all(deletePromises);
  }

  /**
   * Get file info
   */
  async getFileInfo(filePath: string): Promise<any> {
    const fullPath = path.join(this.uploadDir, filePath);

    if (!fs.existsSync(fullPath)) {
      throw new BadRequestException('File not found');
    }

    const stats = fs.statSync(fullPath);

    return {
      path: filePath,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      url: `/uploads/${filePath.replace(/\\/g, '/')}`,
    };
  }

  /**
   * Get upload directory path
   */
  getUploadDir(): string {
    return this.uploadDir;
  }
}

