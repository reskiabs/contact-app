import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";

export const uploader = Uploader({
  apiKey: "public_W142iZWBy99nRQoUoo6kRH91ZZ46",
});

const options = { multi: true };
const ImageUploadInput = ({ onUpdate }) => {
  return (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={onUpdate}
      width="100%"
      height="375px"
    />
  );
};

export default ImageUploadInput;
