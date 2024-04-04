import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../features/userDetailSlice";
import ImageUploadInput from "./ImageUploade";

export function CreateUserDialog({ triggerComponent, action, id }) {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [updateData, setUpdateData] = useState();
  const [changePhoto, setChangePhoto] = useState(false);
  console.log("🚀 ~ CreateUserDialog ~ updateData:", updateData);

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users?.data?.filter((user) => user.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  console.log("🚀 ~ CreateUserDialog ~ users:", {
    firstName,
    lastName,
    age,
    photo,
  });

  const handleSubmit = () => {
    dispatch(createUser({ firstName, lastName, age, photo }));
    setFirstName("");
    setLastName("");
    setAge(0);
    setPhoto("");
  };

  const handleUpdate = () => {
    dispatch(updateUser({ ...updateData, firstName, lastName, age, photo }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "Create" : "Update"} User
          </DialogTitle>
          <DialogDescription>
            {action === "create"
              ? "Enter your new user details."
              : "Update your user details."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-x-4 w-full items-center">
          <div className="space-y-1 w-2/5">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={
                action === "create" ? firstName : updateData?.firstName
              }
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-1 w-2/5">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={
                action === "create" ? lastName : updateData?.lastName
              }
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="space-y-1 w-1/6">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              name="age"
              defaultValue={action === "create" ? age : updateData?.age}
              onChange={(e) => setAge(e.target.value)}
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

        <DialogFooter>
          <Button
            type="button"
            onClick={action === "create" ? handleSubmit : handleUpdate}
          >
            {action === "create" ? "Create" : "Update"} User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
