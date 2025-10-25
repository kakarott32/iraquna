import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (imagePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'iraquna-dashboard',
      resource_type: 'image'
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Image upload failed: ${error}`);
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`iraquna-dashboard/${publicId}`);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export default cloudinary;