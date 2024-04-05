import ImageUploadInput from "@/components/ImageUploade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/features/userDetailSlice";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changePhoto, setChangePhoto] = useState(false);
  const { users, loading } = useSelector((state) => state.app);

  const [updateData, setUpdateData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    photo: "",
  });

  useEffect(() => {
    if (id && users && users.data) {
      const singleUser = users.data.find((ele) => ele.id === id);
      if (singleUser) {
        setUpdateData({
          firstName: singleUser.firstName,
          lastName: singleUser.lastName,
          age: parseInt(singleUser.age),
          photo: singleUser.photo,
        });
      }
    }
  }, [id, users]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateUser(updateData));
    navigate("/");
  };

  return (
    <div className="px-72 py-20 space-y-8">
      <div className="scroll-m-20 flex items-center justify-between border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Update User
        <Button onClick={handleUpdate}>
          <Send className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      <div>
        <div className="grid px-4 mb-6 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={updateData.firstName}
              placeholder="Enter First Name"
              onChange={newData}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={updateData.lastName}
              placeholder="Enter Last Name"
              onChange={newData}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              value={updateData.age}
              placeholder="Enter Age"
              onChange={newData}
            />
          </div>
        </div>
        {updateData?.photo && !changePhoto ? (
          <div className="flex justify-center flex-col gap-y-2 items-center">
            <img
              src={updateData.photo}
              alt=""
              className="w-44 h-40 rounded-lg"
            />
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setChangePhoto(true)}
            >
              Change Photo
            </Button>
          </div>
        ) : (
          <ImageUploadInput
            onUpdate={(files) =>
              setUpdateData((prevData) => ({
                ...prevData,
                photo: files.map((x) => x.fileUrl).join("\n"),
              }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default Update;
