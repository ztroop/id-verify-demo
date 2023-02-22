A demonstration/challenge to build a ID verification system.

## Considerations

- Currently, the upload functionality needs an implementation. I think `tus` makes the most sense, as it provides a resumable file upload operation. That can be supported by an S3/Minio backend.

`tus` and `tusd` do not handle authentication details. Therefore middleware or a proxy service would be needed to authenticate and contextualize requests. The `tus` system is specifically designed for resumable file uploads.

## Demonstration

![App Demo](/assets/demo.gif "App Demonstration")