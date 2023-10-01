import { v2 as cloudinary } from 'cloudinary';

// TODO: Investigate uploading from the BE
// import multer from 'multer';

// const storage = multer.memoryStorage();
// const multerUpload = multer({ storage });
// const singleMulterUpload = multerUpload.single('image');

const uploadFile = async (request: Request, response: Response) => {
  const { fileName, fileType, fileURI } = await request.json();

  cloudinary.config({
    cloud_name: process.env.CDN_NAME,
    api_key: process.env.CDN_KEY,
    api_secret: process.env.CDN_SECRET,
    secure: true,
  });

  const { public_id, secure_url } = await cloudinary.uploader.upload(fileURI, {
    eager: [{ width: 800 }],
    notification_url: 'http://192.168.99.111:8000/api/notify_endpoint',
    resource_type: 'image',
    overwrite: true,
    public_id: `devsite/post-images/${fileName}`,
  });

  return new Response(
    JSON.stringify({
      success: 1,
      file: {
        url: secure_url,
      },
    }),
  );
};

export { uploadFile as POST };
