import { Schema } from '../../data/resource';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments

  try {
    const signeturl = await getSignedUrl(new S3Client({}), new PutObjectCommand({
      Bucket: 'my-bucket',
      Key: 'my-key',
    }), { expiresIn: 3600 });
    console.log('Generated signed URL:', signeturl);
  } catch (error) {
    console.log('Error generating signed URL:', error);
  }
  // return typed from `.returns()`
  return `Hello, ${name}!`
}