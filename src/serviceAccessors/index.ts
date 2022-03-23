const AWS = require('aws-sdk');
const fs = require('fs');

const uploadFile: any = async (
    fileName: any,
    filePath: string,
    mimeType?: string
) => {
    const s3 = new AWS.S3({ region: process.env.AWS_REGION });
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileContent,
        //ContentType: mimeType//geralmente se acha sozinho
    };

    const data = await s3.upload(params).promise();
    return data.Location;
};

export { uploadFile };
