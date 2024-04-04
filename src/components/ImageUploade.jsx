import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";

export const uploader = Uploader({
  apiKey: "public_kW15c192VWydQgo5Qhiye9VkNg74",
});

const options = { multi: true };
const ImageUploadInput = ({ onUpdate }) => {
  return (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={onUpdate}
      width="100%"
      height="250px"
    />
  );
};

export default ImageUploadInput;
